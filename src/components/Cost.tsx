// 창업 비용 — 가맹금·보증금·시설비 항목 및 총 투자비 (정보공개서 근거)
import { costItems, costTotal } from '../data/content'

const won = (manwon: number) => manwon.toLocaleString('ko-KR')

export default function Cost() {
  return (
    <section className="section cost" id="cost">
      <div className="container center">
        <span className="eyebrow">START-UP COST</span>
        <h2 className="section-title display">창업 비용 안내</h2>
        <p className="section-sub">
          66㎡(20평) 기준 · VAT 포함 · 점포 임대료 별도. 실제 금액은 매장 실측 후 확정됩니다.
        </p>
      </div>

      <div className="container cost-wrap">
        <ul className="cost-list">
          {costItems.map((c) => (
            <li key={c.label}>
              <div className="cost-list__head">
                <span className="cost-list__label">{c.label}</span>
                <span className="cost-list__amt">{won(c.amount)}만원</span>
              </div>
              <p className="cost-list__note">{c.note}</p>
            </li>
          ))}
        </ul>

        <aside className="cost-total">
          <span className="cost-total__cap">총 창업비용 (임대료 별도)</span>
          <strong className="cost-total__num display">약 {won(costTotal)}<small>만원</small></strong>
          <p>
            가맹금·보증금 1,080만원 + 시설·초도물품 등으로 구성됩니다. 보증금은 계약 종료 시
            반환되며, 보증보험으로 대체할 수 있습니다.
          </p>
          <a href="#inquiry" className="btn btn-primary">투자 상담 받기</a>
        </aside>
      </div>
    </section>
  )
}
