// 앱 진입점 — 전역 스타일 로드, /admin 경로 분기, 콘텐츠 프로바이더 연결
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/app.css'
import 'leaflet/dist/leaflet.css'
import App from './App.tsx'
import Admin from './admin/Admin.tsx'
import { ContentProvider } from './content/ContentProvider.tsx'

const isAdmin = window.location.pathname.replace(/\/$/, '') === '/admin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? (
      <Admin />
    ) : (
      <ContentProvider>
        <App />
      </ContentProvider>
    )}
  </StrictMode>,
)
