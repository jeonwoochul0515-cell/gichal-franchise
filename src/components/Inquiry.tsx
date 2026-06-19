// 가맹문의 — Cloudflare Pages Function(/api/inquiry) 통해 Resend로 cs92@naver.com에 발송
import { useState, type FormEvent } from 'react'
import { brand } from '../data/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Inquiry() {
  const [form, setForm] = useState({ name: '', phone: '', region: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('sent')
      setForm({ name: '', phone: '', region: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section inquiry" id="inquiry">
      <div className="container inquiry-wrap">
        <div className="inquiry-info">
          <span className="eyebrow eyebrow--light">FRANCHISE</span>
          <h2 className="section-title display">가맹문의</h2>
          <p>
            예비 창업자님의 성공적인 시작을 본사가 함께합니다. 편하게 문의 남겨주시면
            담당자가 빠르게 연락드립니다.
          </p>
          <a href={`tel:${brand.phone}`} className="inquiry-tel">
            <span>대표 가맹상담</span>
            <strong className="display">{brand.phone}</strong>
          </a>
        </div>

        {status === 'sent' ? (
          <div className="inquiry-form inquiry-done">
            <div className="inquiry-done__icon">✓</div>
            <h3>문의가 접수되었습니다</h3>
            <p>담당자가 빠르게 연락드리겠습니다. 감사합니다.</p>
            <button className="btn btn-primary" onClick={() => setStatus('idle')}>
              추가 문의하기
            </button>
          </div>
        ) : (
          <form className="inquiry-form" onSubmit={submit}>
            <label>
              성함
              <input required value={form.name} onChange={update('name')} placeholder="홍길동" />
            </label>
            <label>
              연락처
              <input
                required
                value={form.phone}
                onChange={update('phone')}
                placeholder="010-0000-0000"
              />
            </label>
            <label>
              희망 창업지역
              <input value={form.region} onChange={update('region')} placeholder="부산 / 경남 등" />
            </label>
            <label>
              문의 내용
              <textarea
                rows={4}
                value={form.message}
                onChange={update('message')}
                placeholder="궁금한 점을 남겨주세요."
              />
            </label>
            <button type="submit" className="btn btn-gold" disabled={status === 'sending'}>
              {status === 'sending' ? '전송 중…' : '문의 보내기'}
            </button>
            {status === 'error' && (
              <small className="inquiry-form__note inquiry-form__note--err">
                전송에 실패했습니다. 잠시 후 다시 시도하시거나 {brand.phone}로 전화 주세요.
              </small>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
