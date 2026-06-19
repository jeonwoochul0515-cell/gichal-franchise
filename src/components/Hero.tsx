// 히어로 — 배경 영상 + 브랜드 슬로건 + 가맹문의 CTA
import { brand } from '../data/content'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <video
        className="hero__video"
        src="/media/hero.mp4"
        poster="/media/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero__overlay" />
      <div className="hero__content container">
        <span className="hero__badge">중식 무한리필 뷔페 · 가맹점 모집</span>
        <h1 className="hero__title display">
          한 매장에서 두 번 버는<br />
          <em>중식 무한리필</em> 프랜차이즈
        </h1>
        <p className="hero__sub">
          낮엔 식사뷔페, 밤엔 주점뷔페. 자체 제조공장 기반 원가경쟁력으로
          <br className="pc" /> 검증된 집객력의 브랜드 <b>기찰반점</b>과 함께하세요.
        </p>
        <div className="hero__cta">
          <a href="#inquiry" className="btn btn-gold">가맹문의 하기</a>
          <a href="#cost" className="btn btn-ghost">창업 비용 보기</a>
        </div>
        <div className="hero__facts">
          <div><strong>약 8,560만원</strong><span>창업비용(20평·임대료 별도)</span></div>
          <div><strong>약 45일</strong><span>상담→오픈 소요</span></div>
          <div><strong>1,700+</strong><span>본점 네이버 리뷰</span></div>
        </div>
      </div>
      <a href={`tel:${brand.phone}`} className="hero__phone">가맹상담 {brand.phone}</a>
    </section>
  )
}
