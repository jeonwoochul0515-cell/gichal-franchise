// SNS 섹션 — 공식 인스타그램 임베드(oEmbed). URL 미입력 시 프로필 안내로 폴백
import { useEffect } from 'react'
import { brand } from '../data/content'
import { instagramPosts } from '../data/instagram'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

export default function Instagram() {
  const hasPosts = instagramPosts.length > 0

  useEffect(() => {
    if (!hasPosts) return
    const id = 'instagram-embed-js'
    const run = () => window.instgrm?.Embeds.process()
    if (document.getElementById(id)) {
      run()
      return
    }
    const s = document.createElement('script')
    s.id = id
    s.async = true
    s.src = 'https://www.instagram.com/embed.js'
    s.onload = run
    document.body.appendChild(s)
  }, [hasPosts])

  return (
    <section className="section insta" id="sns">
      <div className="container center">
        <span className="eyebrow">INSTAGRAM</span>
        <h2 className="section-title display">@gi_chal 소식</h2>
        <p className="section-sub">매일 바뀌는 메뉴와 매장 소식을 인스타그램에서 만나보세요.</p>
      </div>

      {hasPosts ? (
        <div className="container insta-grid">
          {instagramPosts.map((url) => (
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
          <p>게시물 임베드 준비 중입니다. 공식 인스타그램에서 최신 소식을 확인하세요.</p>
          <a className="btn btn-primary" href={brand.instagram} target="_blank" rel="noreferrer">
            인스타그램 바로가기
          </a>
        </div>
      )}
    </section>
  )
}
