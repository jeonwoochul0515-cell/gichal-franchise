// 가맹본부 지원 — 교육·입지·슈퍼바이징·광고 분담 등
import { supports } from '../data/content'

export default function Support() {
  return (
    <section className="section support" id="support">
      <div className="container center">
        <span className="eyebrow">HQ SUPPORT</span>
        <h2 className="section-title display">본사가 끝까지 함께합니다</h2>
        <p className="section-sub">
          외식 경험이 없어도 괜찮습니다. 레시피부터 운영·마케팅까지 본사가 지원합니다.
        </p>
      </div>
      <div className="container support-grid">
        {supports.map((s, i) => (
          <article key={s.title} className="support-card">
            <span className="support-card__no">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
