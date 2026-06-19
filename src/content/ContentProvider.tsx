// 사이트 콘텐츠 컨텍스트 — /api/content를 fetch해 동적 반영, 실패 시 기본값 폴백
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface MenuItem {
  id: string
  name: string
  desc: string
  img: string
  span2?: boolean
}
export interface StoreItem {
  id: string
  name: string
  address: string
  phone?: string
  lat: number
  lng: number
  tag?: string
}
export interface FaqItem {
  id: string
  q: string
  a: string
}
export interface SiteContent {
  menus: MenuItem[]
  stores: StoreItem[]
  instagram: string[]
  faqs: FaqItem[]
}

export const defaultContent: SiteContent = {
  menus: [
    { id: 'm1', name: '시그니처 한 상', desc: '로제짬뽕·차돌짬뽕·유니짜장·볶음밥·레몬간장탕수육까지 한 번에. 무한리필 뷔페의 핵심 라인업.', img: '/media/menu-spread.jpg', span2: true },
    { id: 'm2', name: '레몬크림탕수육', desc: '남녀노소 사로잡는 부드러운 크림 소스. 추가 인기 1위 메뉴.', img: '/media/menu-lemoncream.jpg' },
    { id: 'm3', name: '찹쌀탕수육', desc: '바삭쫀득 자체 제조 탕수육. "탕수육 맛집"이라 불리는 이유.', img: '/media/menu-chapssal.png' },
    { id: 'm4', name: '깐쇼새우', desc: '불향 가득 매콤달콤. 디너 주점뷔페 인기 안주.', img: '/media/menu-kkansho.jpg' },
    { id: 'm5', name: '레몬간장탕수육', desc: '상큼한 레몬간장과 채 썬 야채의 조화. 느끼함 없는 별미.', img: '/media/menu-lemonganjang.jpg' },
  ],
  stores: [
    { id: 's1', name: '구서본점', address: '부산 금정구 수림로50번길 104 1층', phone: '051-517-1650', lat: 35.2493, lng: 129.0915, tag: '본점' },
    { id: 's2', name: '정관점', address: '부산 기장군 정관읍 정관5로 12 동원로얄듀크 227동 상가 107호', phone: '051-728-1650', lat: 35.3168, lng: 129.1844 },
    { id: 's3', name: '김해외동점', address: '경남 김해시 분성로 126 (외동)', phone: '055-311-1650', lat: 35.224, lng: 128.876 },
    { id: 's4', name: '포항북구점', address: '경북 포항시 북구 새천년대로1020번길 3 2층 202호 (두호동)', phone: '0507-1314-1650', lat: 36.059, lng: 129.376 },
    { id: 's5', name: '신라대점', address: '부산 사상구 백양대로 703 A동 (덕포동)', phone: '0507-1401-8710', lat: 35.1562, lng: 128.9931 },
  ],
  instagram: [
    'https://www.instagram.com/reel/DZb7KRyzu31/',
    'https://www.instagram.com/reel/DZd3rFizYxZ/',
    'https://www.instagram.com/reel/DZcKsnMz_OK/',
  ],
  faqs: [
    { id: 'f1', q: '기찰반점 창업 비용은 얼마인가요?', a: '66㎡(20평) 기준 약 8,560만원입니다(점포 임대료 별도). 가입비 550만원, 교육비 330만원, 계약이행보증금 200만원에 인테리어·간판·주방기기·초도물품 등 시설비가 포함됩니다. 실제 금액은 매장 실측 후 확정됩니다.' },
    { id: 'f2', q: '가맹 계약부터 매장 오픈까지 얼마나 걸리나요?', a: '상담일로부터 매장 오픈까지 약 45일이 소요됩니다. 상담·계약 → 점포 실측·설계 → 인테리어 공사(약 20일) → 개점 교육(약 10일) → 오픈 순으로 진행됩니다.' },
    { id: 'f3', q: '중식 조리 경험이 없어도 창업할 수 있나요?', a: '네, 가능합니다. 가맹본부가 핵심 소스를 자체 제조해 공급하고 표준 레시피와 개점 전 조리·서비스·운영 교육을 제공하므로, 외식업 경험이 없어도 매장을 운영할 수 있습니다.' },
    { id: 'f4', q: '기찰반점은 어떤 브랜드인가요?', a: '기찰반점은 1인 9,900원대부터 즐기는 중식 무한리필 뷔페 프랜차이즈입니다. 낮에는 한·중·일 식사뷔페, 저녁에는 중식 주점뷔페로 운영되는 듀얼 수익구조가 특징이며, 가맹본부는 바른미식입니다.' },
    { id: 'f5', q: '기찰반점 매장은 어디에 있나요?', a: '부산 구서본점·신라대점, 부산 기장 정관점, 경남 김해외동점, 경북 포항북구점 등 부산·경남·경북 지역에서 운영 중이며 지속 확장하고 있습니다.' },
    { id: 'f6', q: '가맹 문의는 어떻게 하나요?', a: '가맹본부 대표번호 1600-5392로 전화하시거나, 홈페이지 가맹문의 폼을 통해 신청하시면 담당자가 빠르게 연락드립니다.' },
  ],
}

const ContentContext = createContext<SiteContent>(defaultContent)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.menus)) setContent(data)
      })
      .catch(() => {})
  }, [])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export function useContent(): SiteContent {
  return useContext(ContentContext)
}
