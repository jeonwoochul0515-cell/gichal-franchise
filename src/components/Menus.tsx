// 시그니처 메뉴 갤러리 — 차별화 메뉴를 매출 경쟁력 근거로 제시
import { signatureMenus } from '../data/content'

export default function Menus() {
  return (
    <section className="section menus" id="menus">
      <div className="container center">
        <span className="eyebrow">SIGNATURE</span>
        <h2 className="section-title display">재방문을 만드는 시그니처</h2>
        <p className="section-sub">
          일반 중국집엔 없는 메뉴가 무한리필로. 객단가와 재방문율을 동시에 끌어올립니다.
        </p>
      </div>
      <div className="container menu-grid">
        {signatureMenus.map((m) => (
          <figure key={m.name} className={`menu-card ${m.span2 ? 'menu-card--wide' : ''}`}>
            <img src={m.img} alt={m.name} loading="lazy" />
            <figcaption>
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
