// 대표 인사말 섹션 — 바른미식연구소 대표 인사말 및 26년 외식 노하우 신뢰 메시지
import logo from '../assets/logo.jpg'

export default function CeoMessage() {
  return (
    <section className="section ceo" id="ceo">
      <div className="container ceo-wrap">
        <div className="ceo-head">
          <span className="eyebrow eyebrow--light">CEO MESSAGE</span>
          <h2 className="ceo-quote display">
            혁신과 신뢰로<br />
            미래를 함께 열어갑니다
          </h2>
        </div>

        <div className="ceo-body">
          <p>
            안녕하세요, 바른미식연구소를 방문해 주신 여러분께 감사드립니다. 저희 바른미식연구소는
            항상 고객의 기대를 뛰어넘는 가치를 제공하기 위해 최선을 다하고 있습니다. 우리는 고객과의
            신뢰를 바탕으로 혁신적이고 합리적인 솔루션을 통해 빠르게 성장해왔습니다.
          </p>
          <p>
            외식시장 환경은 끊임없이 변화하고 있으며, 그에 따라 저희는 다양한 분야에서 차별화된
            서비스를 제공하기 위해 노력하고 있습니다. 제품의 차별화, 판매 컨셉 설정, 서비스 교육,
            마케팅 등 다양한 영역에서 고객의 필요를 충족시킬 수 있는 아이템과 콘텐츠를 지속적으로
            발전시켜 왔습니다.
          </p>
          <p>
            요동치는 외식시장의 환경을 단 1분 1초도 놓치지 않고 그 변화의 선두주자가 되도록 풍부한
            <strong> 26년의 경험</strong>을 바탕으로 리드해 가겠습니다. 감사합니다.
          </p>

          <div className="ceo-sign">
            <img src={logo} alt="바른미식연구소" />
            <div>
              <span>바른미식연구소 대표</span>
              <strong className="display">신영호</strong>
            </div>
          </div>
        </div>

        <div className="ceo-stats">
          <div>
            <strong className="display">26년</strong>
            <span>외식업 운영 노하우</span>
          </div>
          <div>
            <strong className="display">다(多)브랜드</strong>
            <span>호야짬뽕·홍춘마라·기찰반점 운영</span>
          </div>
          <div>
            <strong className="display">자체 제조</strong>
            <span>소스·탕수육 직접 R&amp;D·생산</span>
          </div>
        </div>
      </div>
    </section>
  )
}
