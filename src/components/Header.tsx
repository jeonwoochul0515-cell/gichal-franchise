// 상단 고정 내비게이션 — 섹션 앵커 이동 및 가맹문의 CTA
import { useEffect, useState } from 'react'
import { brand } from '../data/content'
import logo from '../assets/logo.jpg'

const links = [
  { href: '#strengths', label: '브랜드 강점' },
  { href: '#menus', label: '시그니처' },
  { href: '#cost', label: '창업 비용' },
  { href: '#process', label: '가맹 절차' },
  { href: '#stores', label: '매장 안내' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`hdr ${scrolled ? 'hdr--solid' : ''}`}>
      <div className="hdr__inner container">
        <a href="#top" className="hdr__logo">
          <img src={logo} alt="기찰반점" className="hdr__logo-img" />
          <span className="hdr__logo-txt display">기찰반점<small>가맹본부</small></span>
        </a>

        <nav className={`hdr__nav ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#inquiry" className="btn btn-primary hdr__cta" onClick={() => setOpen(false)}>
            가맹문의
          </a>
        </nav>

        <a href={`tel:${brand.phone}`} className="hdr__tel">
          ☎ {brand.phone}
        </a>
        <button className="hdr__burger" aria-label="메뉴" onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
