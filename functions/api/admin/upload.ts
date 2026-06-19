// 관리자 이미지 업로드 (보호) — 이미지 바이트를 KV에 저장하고 /api/img/<id> URL 반환
import { requireAuth, json, type Env } from '../../_lib/auth'

export const onRequestPost = async (context: {
  request: Request
  env: Env
}): Promise<Response> => {
  const { request, env } = context
  if (!(await requireAuth(request, env))) return json({ error: 'unauthorized' }, 401)

  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return json({ error: 'no_file' }, 400)
  if (file.size > 5 * 1024 * 1024) return json({ error: 'too_large', limit: '5MB' }, 413)

  const ext = (file.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg')
  const id = `${Date.now().toString(36)}${Math.floor(performance.now()).toString(36)}.${ext}`
  const bytes = await file.arrayBuffer()
  await env.CONTENT.put(`img:${id}`, bytes, {
    metadata: { contentType: file.type || 'image/jpeg' },
  })
  return json({ ok: true, url: `/api/img/${id}` })
}
