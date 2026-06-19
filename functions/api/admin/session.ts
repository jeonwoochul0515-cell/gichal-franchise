// 관리자 세션 확인/로그아웃 — 로그인 상태 체크(GET), 로그아웃(DELETE)
import { requireAuth, json, type Env } from '../../_lib/auth'

export const onRequestGet = async (context: { request: Request; env: Env }): Promise<Response> => {
  return json({ authed: await requireAuth(context.request, context.env) })
}

export const onRequestDelete = async (): Promise<Response> => {
  return json({ ok: true }, 200, {
    'Set-Cookie': 'admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
  })
}
