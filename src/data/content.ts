// 사이트 전반 콘텐츠 데이터 (가맹본부 정보·강점·메뉴·비용·절차·지원) — 정보공개서 26.01.16 등록본 근거
import spread from '../assets/food/spread-signature.jpg'
import chapssal from '../assets/food/tangsuyuk-chapssal.png'
import lemoncream from '../assets/food/tangsuyuk-lemoncream.jpg'
import kkansho from '../assets/food/kkansho-shrimp.jpg'
import lemonganjang from '../assets/food/tangsuyuk-lemonganjang.jpg'

export const brand = {
  name: '기찰반점',
  hq: '바른미식',
  ceo: '신영호',
  hqAddress: '부산광역시 금정구 동천로7번길 34-9, 2층(회동동)',
  phone: '1600-5392',
  fax: '050-4374-6481',
  bizNo: '697-47-00721',
  disclosureNo: '20230479',
  disclosureDate: '2026.01.16',
  instagram: 'https://www.instagram.com/gi_chal/',
}

// 핵심 강점 (가맹 세일즈 포인트)
export const strengths = [
  {
    icon: '🏭',
    title: '자체 제조공장 운영',
    desc: '핵심 소스·탕수육을 직접 R&D·OEM 생산. 겉은 익히고 속은 생고기로 급냉하는 자체 제법으로 맛과 원가를 동시에 잡습니다.',
  },
  {
    icon: '🌗',
    title: '런치·디너 듀얼 수익구조',
    desc: '낮은 한·중·일 식사뷔페, 밤은 중식 주점뷔페. 저녁 주류 매출까지 더해 한 매장에서 두 번 매출이 일어납니다.',
  },
  {
    icon: '🍜',
    title: '차별화 시그니처',
    desc: '로제짬뽕·레몬크림탕수육·차돌짬뽕 등 일반 중국집엔 없는 메뉴로 재방문율을 만드는 무한리필 뷔페.',
  },
  {
    icon: '⭐',
    title: '검증된 집객력',
    desc: '직영 본점 네이버 리뷰 1,700건+. "음식이 맛있어요·가성비·재료 신선" 키워드로 오픈 초기부터 줄서는 브랜드.',
  },
]

export const signatureMenus = [
  {
    img: spread,
    name: '시그니처 한 상',
    desc: '로제짬뽕·차돌짬뽕·유니짜장·볶음밥·레몬간장탕수육까지 한 번에. 무한리필 뷔페의 핵심 라인업.',
    span2: true,
  },
  {
    img: lemoncream,
    name: '레몬크림탕수육',
    desc: '남녀노소 사로잡는 부드러운 크림 소스. 추가 인기 1위 메뉴.',
  },
  {
    img: chapssal,
    name: '찹쌀탕수육',
    desc: '바삭쫀득 자체 제조 탕수육. "탕수육 맛집"이라 불리는 이유.',
  },
  {
    img: kkansho,
    name: '깐쇼새우',
    desc: '불향 가득 매콤달콤. 디너 주점뷔페 인기 안주.',
  },
  {
    img: lemonganjang,
    name: '레몬간장탕수육',
    desc: '상큼한 레몬간장과 채 썬 야채의 조화. 느끼함 없는 별미.',
  },
]

// 창업 비용 (단위: 만원, VAT 포함 / 66㎡·20평 기준) — 정보공개서 Ⅳ
export const costItems = [
  { label: '가입비', amount: 550, note: '브랜드·운영권 사용, 점포실사, 오픈지원' },
  { label: '교육비', amount: 330, note: '개점 전 조리·서비스·운영 교육 (2명)' },
  { label: '계약이행보증금', amount: 200, note: '계약 종료 시 반환 · 보증보험 대체 가능' },
  { label: '인테리어', amount: 4400, note: '벽·천장·바닥·설비·전기 (20평 기준)' },
  { label: '간판', amount: 440, note: '전면간판·실내외 실사물' },
  { label: '주방기기·홀집기', amount: 1980, note: '중화렌지·냉장고·식기세척기 등' },
  { label: '의탁자', amount: 440, note: '제작 테이블·의자 8세트' },
  { label: '초도물품', amount: 220, note: '원·부자재 입고' },
]
export const costTotal = 8560 // 만원

// 가맹 절차 (약 45일) — 정보공개서 Ⅵ
export const steps = [
  { day: 'D-45', title: '가맹 문의', desc: '전화·온라인 문의 접수, 희망지역 확인 및 담당자 배정' },
  { day: 'D-45~43', title: '사업설명·상담', desc: '정보공개서·가맹계약서, 인근 가맹점 현황 제공 후 상담' },
  { day: 'D-30', title: '가맹계약 체결', desc: '정보공개서 제공 14일 후 계약 체결' },
  { day: 'D-27~25', title: '점포 실측·설계', desc: '현장 실측 후 투자비 산출 및 도면 확정' },
  { day: 'D-24~5', title: '인테리어 공사', desc: '본사 사양에 따른 통일 인테리어 시공 (약 20일)' },
  { day: 'D-13~4', title: '개점 교육', desc: '메뉴 조리 기술·점포 운영 교육 (약 10일)' },
  { day: 'D-day', title: '오픈', desc: '설비·집기·초도물품 입고 후 영업 시작' },
]

// 가맹본부 지원
export const supports = [
  { title: '레시피·제조 노하우 전수', desc: '본사 자체 제조 소스 공급과 표준 레시피로 매장 간 맛의 편차를 없앱니다.' },
  { title: '개점 전 집중 교육', desc: '조리·서비스·운영 전 과정 교육으로 외식 경험이 없어도 운영 가능.' },
  { title: '입지 분석 지원', desc: '상권·입지에 대한 조언과 현장 조사 지원으로 안정적인 출점 결정.' },
  { title: '슈퍼바이징 관리', desc: '매장 청결·친절·품질을 정기 점검하며 운영을 함께 관리합니다.' },
  { title: '광고·판촉 분담', desc: '브랜드 차원의 광고·판촉을 본사와 분담하여 개별 부담을 낮춥니다.' },
  { title: '점포환경개선 비용 분담', desc: '노후 리뉴얼 시 법정 기준에 따라 인테리어·간판 비용을 분담합니다.' },
]
