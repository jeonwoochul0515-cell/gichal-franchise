// 관리자 인증 공용 모듈 — HMAC 서명 토큰 발급/검증 (Cloudflare Pages Functions)
export interface Env {
  CONTENT: KVNamespace
  ADMIN_PASSWORD: string
  AUTH_SECRET: string
  ANTHROPIC_API_KEY?: string
}

const enc = new TextEncoder()

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data))
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// 토큰 = "<만료타임스탬프>.<서명>"
export async function createToken(env: Env, ttlMs = 1000 * 60 * 60 * 12): Promise<string> {
  const exp = Date.now() + ttlMs
  const sig = await hmac(env.AUTH_SECRET, String(exp))
  return `${exp}.${sig}`
}

export async function verifyToken(env: Env, token?: string | null): Promise<boolean> {
  if (!token || !token.includes('.')) return false
  const [expStr, sig] = token.split('.')
  const exp = Number(expStr)
  if (!exp || exp < Date.now()) return false
  const expected = await hmac(env.AUTH_SECRET, expStr)
  return expected === sig
}

export function getCookie(request: Request, name: string): string | null {
  const cookie = request.headers.get('Cookie') || ''
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))
  return m ? decodeURIComponent(m[1]) : null
}

export async function requireAuth(request: Request, env: Env): Promise<boolean> {
  return verifyToken(env, getCookie(request, 'admin_session'))
}

export function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  })
}
