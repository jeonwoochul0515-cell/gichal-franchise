// 가맹문의 접수 → Resend로 cs92@naver.com에 메일 발송 (Cloudflare Pages Function)
interface Env {
  RESEND_API_KEY: string
}

const TO_EMAIL = 'cs92@naver.com'
// Resend 무료 테스트 발신 주소. 도메인 인증 시 본인 도메인 주소로 교체 권장.
const FROM_EMAIL = '기찰반점 가맹문의 <onboarding@resend.dev>'

const esc = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string))

export const onRequestPost = async (context: {
  request: Request
  env: Env
}): Promise<Response> => {
  const { request, env } = context

  if (!env.RESEND_API_KEY) {
    return Response.json({ ok: false, error: 'server_not_configured' }, { status: 500 })
  }

  let data: { name?: string; phone?: string; region?: string; message?: string }
  try {
    data = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  const name = (data.name || '').trim()
  const phone = (data.phone || '').trim()
  const region = (data.region || '').trim()
  const message = (data.message || '').trim()

  if (!name || !phone) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }

  const html = `
    <h2>기찰반점 가맹문의가 접수되었습니다</h2>
    <table style="border-collapse:collapse;font-size:15px">
      <tr><td style="padding:6px 12px;color:#888">성함</td><td style="padding:6px 12px"><b>${esc(name)}</b></td></tr>
      <tr><td style="padding:6px 12px;color:#888">연락처</td><td style="padding:6px 12px"><b>${esc(phone)}</b></td></tr>
      <tr><td style="padding:6px 12px;color:#888">희망지역</td><td style="padding:6px 12px">${esc(region) || '-'}</td></tr>
      <tr><td style="padding:6px 12px;color:#888;vertical-align:top">문의내용</td><td style="padding:6px 12px;white-space:pre-wrap">${esc(message) || '-'}</td></tr>
    </table>
    <p style="color:#aaa;font-size:12px">기찰반점 가맹본부 홈페이지에서 자동 발송된 메일입니다.</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `[가맹문의] ${name} / ${region || '지역미기재'}`,
      html,
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    return Response.json({ ok: false, error: 'send_failed', detail }, { status: 502 })
  }

  return Response.json({ ok: true })
}
