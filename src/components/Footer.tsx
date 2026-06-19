// 푸터 — 가맹본부(바른미식) 법적 정보 및 정보공개서 등록번호
import { brand } from '../data/content'
import logo from '../assets/logo.jpg'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="기찰반점" />
          <div>
            <strong className="display">기찰반점</strong>
            <span>중식 무한리필 뷔페 가맹본부</span>
          </div>
        </div>

        <div className="footer__info">
          <p>가맹본부 : {brand.hq} (대표 {brand.ceo})</p>
          <p>주소 : {brand.hqAddress}</p>
          <p>
            대표전화 : {brand.phone} &nbsp;|&nbsp; 팩스 : {brand.fax}
          </p>
          <p>
            사업자등록번호 : {brand.bizNo} &nbsp;|&nbsp; 정보공개서 등록번호 :{' '}
            {brand.disclosureNo} ({brand.disclosureDate})
          </p>
          <p className="footer__disclaimer">
            본 사이트의 창업 비용·매출 등 정보는 정보공개서 등록본을 근거로 하며, 실제 조건은
            매장 입지·규모에 따라 달라질 수 있습니다. 가맹계약 전 정보공개서를 반드시 확인하세요.
          </p>
        </div>

        <div className="footer__cta">
          <a href="#inquiry" className="btn btn-primary">가맹문의</a>
          <a href={brand.instagram} target="_blank" rel="noreferrer" className="footer__sns">
            Instagram @gi_chal
          </a>
        </div>
      </div>
      <div className="footer__copy">© {new Date().getFullYear()} {brand.hq}. All rights reserved.</div>
    </footer>
  )
}
