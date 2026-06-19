// 관리자 로그인 — 비밀번호 확인 후 서명 쿠키 발급
import { createToken, json, type Env } from '../../_lib/auth'

export const onRequestPost = async (context: {
  request: Request
  env: Env
}): Promise<Response> => {
  const { request, env } = context
  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return json({ ok: false }, 400)
  }
  if (!body.password || body.password !== (env.ADMIN_PASSWORD || '').trim()) {
    return json({ ok: false, error: 'invalid_password' }, 401)
  }
  const token = await createToken(env)
  return json(
    { ok: true },
    200,
    {
      'Set-Cookie': `admin_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=43200`,
    },
  )
}
