// 가맹문의 — 전환 CTA. 정적 배포 기준 mailto로 본사 접수 (추후 Formspree/Pages Functions 연동 가능)
import { useState, type FormEvent } from 'react'
import { brand } from '../data/content'

const HQ_EMAIL = 'cs92@naver.com'

export default function Inquiry() {
  const [form, setForm] = useState({ name: '', phone: '', region: '', message: '' })

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const body = [
      `성함: ${form.name}`,
      `연락처: ${form.phone}`,
      `희망지역: ${form.region}`,
      '',
      form.message,
    ].join('\n')
    const subject = `[기찰반점 가맹문의] ${form.name || ''} ${form.region || ''}`.trim()
    window.location.href = `mailto:${HQ_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
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
          <button type="submit" className="btn btn-gold">문의 보내기</button>
          <small className="inquiry-form__note">
            * 전송 버튼을 누르면 메일 작성 창으로 연결됩니다.
          </small>
        </form>
      </div>
    </section>
  )
}
