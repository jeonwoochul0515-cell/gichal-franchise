// 관리자 AI 챗 (보호) — 자연어 요청을 Claude로 해석해 사이트 콘텐츠를 수정
import { requireAuth, json, type Env } from '../../_lib/auth'
import { loadContent, saveContent, type SiteContent } from '../../_lib/defaultContent'

const MODEL = 'claude-sonnet-4-6'

const CONTENT_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string', description: '사용자에게 보여줄 변경 요약(한국어, 1~3문장)' },
    content: {
      type: 'object',
      properties: {
        menus: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              desc: { type: 'string' },
              img: { type: 'string' },
              span2: { type: 'boolean' },
            },
            required: ['id', 'name', 'desc', 'img'],
          },
        },
        stores: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              address: { type: 'string' },
              phone: { type: 'string' },
              lat: { type: 'number' },
              lng: { type: 'number' },
              tag: { type: 'string' },
            },
            required: ['id', 'name', 'address', 'lat', 'lng'],
          },
        },
        instagram: { type: 'array', items: { type: 'string' } },
        faqs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              q: { type: 'string' },
              a: { type: 'string' },
            },
            required: ['id', 'q', 'a'],
          },
        },
      },
      required: ['menus', 'stores', 'instagram', 'faqs'],
    },
  },
  required: ['summary', 'content'],
}

export const onRequestPost = async (context: {
  request: Request
  env: Env
}): Promise<Response> => {
  const { request, env } = context
  if (!(await requireAuth(request, env))) return json({ error: 'unauthorized' }, 401)
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'no_api_key', reply: 'AI 키가 아직 설정되지 않았습니다. 관리자에게 Anthropic API 키 등록을 요청하세요.' }, 200)

  let body: { message?: string; history?: { role: string; content: string }[] }
  try {
    body = await request.json()
  } catch {
    return json({ error: 'bad_request' }, 400)
  }
  const message = (body.message || '').trim()
  if (!message) return json({ error: 'empty' }, 400)

  const current = await loadContent(env.CONTENT)

  const system = `당신은 '기찰반점 가맹본부' 홈페이지의 유지보수 AI 비서입니다.
사용자(가게 운영자)의 한국어 요청에 따라 사이트 콘텐츠(메뉴, 매장, 인스타 게시물, FAQ)를 수정합니다.

규칙:
- 콘텐츠를 변경해야 하면 반드시 apply_content_changes 도구를 호출하고, content에는 변경분만이 아니라 **전체 콘텐츠**(바뀌지 않은 항목 포함)를 넣으세요.
- 항목 id는 기존 것을 유지하고, 새 항목은 고유한 새 id(예: s6, f7, m6)를 부여하세요.
- 매장을 새로 추가할 때 위도(lat)·경도(lng)가 주어지지 않으면 한국 주소를 바탕으로 합리적으로 추정해서 채우세요.
- 인스타 게시물은 'https://www.instagram.com/reel/...' 또는 '/p/...' 형식 URL 3개 내외로 유지하세요.
- 이미지(img)는 사용자가 별도로 업로드하므로, 새 메뉴의 img는 기존 값이 없으면 '/media/menu-spread.jpg'로 두고 사용자에게 이미지 업로드를 안내하세요.
- 단순 질문이거나 변경이 불필요하면 도구를 호출하지 말고 한국어로 답하세요.
- 항상 한국어로 간결하게 답하세요.

현재 콘텐츠(JSON):
${JSON.stringify(current)}`

  const messages = [
    ...(body.history || []).map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: message },
  ]

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': env.ANTHROPIC_API_KEY.trim(),
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      system,
      messages,
      tools: [
        {
          name: 'apply_content_changes',
          description: '사이트 콘텐츠 전체를 갱신합니다.',
          input_schema: CONTENT_SCHEMA,
        },
      ],
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    return json({ error: 'anthropic_error', reply: 'AI 호출에 실패했습니다. 잠시 후 다시 시도해주세요.', detail }, 200)
  }

  const data = (await res.json()) as {
    content: { type: string; text?: string; name?: string; input?: { summary: string; content: SiteContent } }[]
  }

  const toolUse = data.content.find((c) => c.type === 'tool_use' && c.name === 'apply_content_changes')
  const textParts = data.content.filter((c) => c.type === 'text').map((c) => c.text).join('\n')

  if (toolUse?.input) {
    const newContent = toolUse.input.content
    if (newContent && Array.isArray(newContent.menus) && Array.isArray(newContent.stores)) {
      await saveContent(env.CONTENT, newContent)
      return json({ reply: toolUse.input.summary || '변경을 적용했습니다.', content: newContent, applied: true })
    }
  }

  return json({ reply: textParts || '무엇을 도와드릴까요?', applied: false })
}
