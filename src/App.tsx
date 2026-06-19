// 가맹본부 홈페이지 전체 레이아웃 — 섹션 조립 (가맹모집 동선)
import Header from './components/Header'
import Hero from './components/Hero'
import Strengths from './components/Strengths'
import Menus from './components/Menus'
import DualModel from './components/DualModel'
import Cost from './components/Cost'
import Process from './components/Process'
import Support from './components/Support'
import StoreMap from './components/StoreMap'
import Instagram from './components/Instagram'
import Inquiry from './components/Inquiry'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Strengths />
        <Menus />
        <DualModel />
        <Cost />
        <Process />
        <Support />
        <StoreMap />
        <Instagram />
        <Inquiry />
      </main>
      <Footer />
    </>
  )
}
