// 듀얼 운영 모델 — 런치 식사뷔페 / 디너 주점뷔페 수익구조 설명
import spread from '../assets/food/spread-signature.jpg'
import kkansho from '../assets/food/kkansho-shrimp.jpg'

export default function DualModel() {
  return (
    <section className="section dual" id="dual">
      <div className="container center">
        <span className="eyebrow">2 IN 1 REVENUE</span>
        <h2 className="section-title display">낮과 밤, 두 번의 매출</h2>
        <p className="section-sub">
          같은 공간, 같은 주방으로 점심과 저녁의 손님층을 모두 잡는 듀얼 뷔페 모델입니다.
        </p>
      </div>
      <div className="container dual-grid">
        <article className="dual-card">
          <img src={spread} alt="런치 식사뷔페" />
          <div className="dual-card__body">
            <span className="dual-tag">LUNCH</span>
            <h3>런치 · 한·중·일 식사뷔페</h3>
            <p>38종 메뉴 중 매일 14가지 엄선 제공. 가족 외식·직장인 점심 수요를 흡수합니다.</p>
            <ul>
              <li>로제짬뽕·유니짜장 등 면 즉석 조리</li>
              <li>탕수육·볶음밥·중화요리 무한리필</li>
            </ul>
          </div>
        </article>
        <article className="dual-card">
          <img src={kkansho} alt="디너 주점뷔페" />
          <div className="dual-card__body">
            <span className="dual-tag dual-tag--night">DINNER</span>
            <h3>디너 · 중식 주점뷔페</h3>
            <p>안주 위주 핵심 메뉴 + 주류 판매로 객단가 상승. 저녁 매출을 한 번 더 만듭니다.</p>
            <ul>
              <li>깐쇼새우·탕수육 등 안주형 구성</li>
              <li>소주·맥주·고량주 주류 매출 추가</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}
