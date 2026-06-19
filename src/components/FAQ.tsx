// 자주 묻는 질문 섹션 — 가맹 관련 Q&A (사용자 + GEO/FAQPage 노출용)
import { useState } from 'react'
import { useContent } from '../content/ContentProvider'

export default function FAQ() {
  const { faqs } = useContent()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section faq" id="faq">
      <div className="container center">
        <span className="eyebrow">FAQ</span>
        <h2 className="section-title display">자주 묻는 질문</h2>
        <p className="section-sub">가맹 창업 전 많이 궁금해하시는 내용을 정리했습니다.</p>
      </div>
      <div className="container faq-list">
        {faqs.map((f, i) => (
          <div className={`faq-item ${open === i ? 'is-open' : ''}`} key={f.id}>
            <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
              <span>{f.q}</span>
              <i aria-hidden>+</i>
            </button>
            <div className="faq-a">
              <p>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
