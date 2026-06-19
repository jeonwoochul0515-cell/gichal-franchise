// 브랜드 강점 — 가맹 세일즈 4대 포인트
import { strengths } from '../data/content'

export default function Strengths() {
  return (
    <section className="section" id="strengths">
      <div className="container center">
        <span className="eyebrow">WHY 기찰반점</span>
        <h2 className="section-title display">왜 기찰반점인가</h2>
        <p className="section-sub">
          가맹점이 돈을 벌어야 본사도 함께 갑니다. 기찰반점은 ‘맛집’이 아니라
          ‘운영되는 수익모델’로 설계된 브랜드입니다.
        </p>
      </div>
      <div className="container strength-grid">
        {strengths.map((s) => (
          <article key={s.title} className="strength-card">
            <div className="strength-card__icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
