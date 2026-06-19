// 관리자 콘텐츠 읽기/저장 (보호) — 전체 콘텐츠 JSON GET/PUT
import { requireAuth, json, type Env } from '../../_lib/auth'
import { loadContent, saveContent, type SiteContent } from '../../_lib/defaultContent'

export const onRequestGet = async (context: { request: Request; env: Env }): Promise<Response> => {
  if (!(await requireAuth(context.request, context.env))) return json({ error: 'unauthorized' }, 401)
  return json(await loadContent(context.env.CONTENT), 200, { 'Cache-Control': 'no-store' })
}

export const onRequestPut = async (context: { request: Request; env: Env }): Promise<Response> => {
  if (!(await requireAuth(context.request, context.env))) return json({ error: 'unauthorized' }, 401)
  let body: SiteContent
  try {
    body = await context.request.json()
  } catch {
    return json({ error: 'bad_request' }, 400)
  }
  if (!body || !Array.isArray(body.menus) || !Array.isArray(body.stores)) {
    return json({ error: 'invalid_content' }, 400)
  }
  await saveContent(context.env.CONTENT, body)
  return json({ ok: true })
}
