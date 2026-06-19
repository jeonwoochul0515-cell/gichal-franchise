// SNS 섹션 — Behold 위젯(자동 최신글) → 수동 oEmbed → 프로필 폴백 순으로 노출
import { useEffect } from 'react'
import { brand } from '../data/content'
import { beholdFeedId, instagramCount, instagramPosts } from '../data/instagram'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
  // Behold 웹 컴포넌트 JSX 허용
  namespace JSX {
    interface IntrinsicElements {
      'behold-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'feed-id': string },
        HTMLElement
      >
    }
  }
}

// 외부 스크립트를 1회만 로드
function loadScript(id: string, src: string, onLoad?: () => void) {
  const existing = document.getElementById(id) as HTMLScriptElement | null
  if (existing) {
    onLoad?.()
    return
  }
  const s = document.createElement('script')
  s.id = id
  s.async = true
  s.type = 'module'
  s.src = src
  if (onLoad) s.onload = onLoad
  document.body.appendChild(s)
}

export default function Instagram() {
  const useBehold = beholdFeedId.length > 0
  const useManual = !useBehold && instagramPosts.length > 0

  useEffect(() => {
    if (useBehold) {
      loadScript('behold-widget-js', 'https://w.behold.so/widget.js')
    } else if (useManual) {
      loadScript('instagram-embed-js', 'https://www.instagram.com/embed.js', () =>
        window.instgrm?.Embeds.process(),
      )
    }
  }, [useBehold, useManual])

  return (
    <section className="section insta" id="sns">
      <div className="container center">
        <span className="eyebrow">INSTAGRAM</span>
        <h2 className="section-title display">@gi_chal 소식</h2>
        <p className="section-sub">매일 바뀌는 메뉴와 매장 소식을 인스타그램에서 만나보세요.</p>
      </div>

      {useBehold ? (
        <div className="container insta-behold">
          <behold-widget feed-id={beholdFeedId} />
        </div>
      ) : useManual ? (
        <div className="container insta-grid">
          {instagramPosts.slice(0, instagramCount).map((url) => (
            <blockquote
              key={url}
              className="instagram-media"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
            />
          ))}
        </div>
      ) : (
        <div className="container center insta-fallback">
          <p>게시물 연동 준비 중입니다. 공식 인스타그램에서 최신 소식을 확인하세요.</p>
          <a className="btn btn-primary" href={brand.instagram} target="_blank" rel="noreferrer">
            인스타그램 바로가기
          </a>
        </div>
      )}
    </section>
  )
}
