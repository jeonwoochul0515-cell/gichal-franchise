// 기찰반점 매장 목록 — 지도/매장안내 섹션 데이터 (네이버 플레이스 실제 주소 기준, 좌표는 근사값)
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
    name: '정관점',
    address: '부산 기장군 정관읍 정관5로 12 동원로얄듀크 227동 상가 107호',
    phone: '051-728-1650',
    lat: 35.3168,
    lng: 129.1844,
  },
  {
    name: '김해외동점',
    address: '경남 김해시 분성로 126 (외동)',
    phone: '055-311-1650',
    lat: 35.224,
    lng: 128.876,
  },
  {
    name: '포항북구점',
    address: '경북 포항시 북구 새천년대로1020번길 3 2층 202호 (두호동)',
    phone: '0507-1314-1650',
    lat: 36.059,
    lng: 129.376,
  },
  {
    name: '신라대점',
    address: '부산 사상구 백양대로 703 A동 (덕포동)',
    phone: '0507-1401-8710',
    lat: 35.1562,
    lng: 128.9931,
  },
]
