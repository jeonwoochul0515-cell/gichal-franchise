// 가맹 절차 — 문의부터 오픈까지 약 45일 타임라인
import { steps } from '../data/content'

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="container center">
        <span className="eyebrow">PROCESS</span>
        <h2 className="section-title display">문의부터 오픈까지 약 45일</h2>
        <p className="section-sub">상담 한 통이면 본사가 입지부터 오픈까지 함께합니다.</p>
      </div>
      <div className="container timeline">
        {steps.map((s, i) => (
          <div className="tl-item" key={s.title}>
            <div className="tl-item__dot">{i + 1}</div>
            <div className="tl-item__body">
              <span className="tl-item__day">{s.day}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
