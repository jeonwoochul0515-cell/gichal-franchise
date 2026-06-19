// 기찰반점 매장 목록 — 지도/매장안내 섹션 데이터 (좌표는 주소 기반 근사값, 검수 필요)
export interface Store {
  name: string
  address: string
  phone?: string
  lat: number
  lng: number
  tag?: string
}

export const stores: Store[] = [
  {
    name: '구서본점',
    address: '부산 금정구 수림로50번길 104 1층',
    phone: '051-517-1650',
    lat: 35.2493,
    lng: 129.0915,
    tag: '본점',
  },
  {
    name: '신라대점',
    address: '부산 사상구 백양대로 703 A동',
    lat: 35.1562,
    lng: 128.9931,
  },
  {
    name: '김해점',
    address: '경상남도 김해시 외동',
    lat: 35.228,
    lng: 128.873,
    tag: '신규',
  },
  {
    name: '신평점',
    address: '부산 사하구 신평동 일원',
    lat: 35.0985,
    lng: 128.9618,
    tag: '신규',
  },
]
