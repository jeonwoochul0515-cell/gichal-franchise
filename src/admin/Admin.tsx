// 관리자 페이지 — 로그인 + 콘텐츠 폼(메뉴·매장·인스타·FAQ) + 이미지 업로드 + AI 챗
import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import type { SiteContent, MenuItem, StoreItem, FaqItem } from '../content/ContentProvider'
import './admin.css'
import MapPicker from './MapPicker'
import ChatPanel from './ChatPanel'

const api = (path: string, init?: RequestInit) =>
  fetch(path, { credentials: 'same-origin', ...init })

const uid = (p: string) => p + Math.random().toString(36).slice(2, 7)

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [pw, setPw] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [content, setContent] = useState<SiteContent | null>(null)
  const [saving, setSaving] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [tab, setTab] = useState<'menus' | 'stores' | 'instagram' | 'faqs'>('menus')
  const [pickerFor, setPickerFor] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    api('/api/admin/session')
      .then((r) => r.json())
      .then((d) => {
        setAuthed(!!d.authed)
        if (d.authed) loadContent()
      })
      .catch(() => setAuthed(false))
  }, [])

  const loadContent = () =>
    api('/api/admin/content')
      .then((r) => r.json())
      .then((d) => setContent(d))

  const login = async (e: FormEvent) => {
    e.preventDefault()
    setLoginErr('')
    const r = await api('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (r.ok) {
      setAuthed(true)
      loadContent()
    } else {
      setLoginErr('비밀번호가 올바르지 않습니다.')
    }
  }

  const logout = async () => {
    await api('/api/admin/session', { method: 'DELETE' })
    setAuthed(false)
    setContent(null)
  }

  const save = async () => {
    if (!content) return
    setSaving('saving')
    const r = await api('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    })
    setSaving(r.ok ? 'saved' : 'error')
    setTimeout(() => setSaving('idle'), 2500)
  }

  const patch = (p: Partial<SiteContent>) => setContent((c) => (c ? { ...c, ...p } : c))

  const upload = async (file: File): Promise<string | null> => {
    const fd = new FormData()
    fd.append('file', file)
    const r = await api('/api/admin/upload', { method: 'POST', body: fd })
    if (!r.ok) return null
    return (await r.json()).url
  }

  if (authed === null) return <div className="adm-loading">불러오는 중…</div>

  if (!authed) {
    return (
      <div className="adm-login">
        <form onSubmit={login}>
          <h1 className="display">기찰반점 관리자</h1>
          <p>홈페이지 콘텐츠를 직접 수정하고 AI 비서로 관리하세요.</p>
          <input
            type="password"
            placeholder="관리자 비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
          />
          {loginErr && <span className="adm-err">{loginErr}</span>}
          <button type="submit" className="btn btn-primary">로그인</button>
        </form>
      </div>
    )
  }

  if (!content) return <div className="adm-loading">콘텐츠 불러오는 중…</div>

  return (
    <div className="adm">
      <header className="adm-top">
        <strong className="display">기찰반점 관리자</strong>
        <div className="adm-top__actions">
          <button className="adm-ai-btn" onClick={() => setChatOpen(true)}>🤖 AI 비서</button>
          <button
            className={`btn btn-primary adm-save ${saving}`}
            onClick={save}
            disabled={saving === 'saving'}
          >
            {saving === 'saving' ? '저장 중…' : saving === 'saved' ? '✓ 저장됨' : saving === 'error' ? '저장 실패' : '저장하기'}
          </button>
          <a href="/" target="_blank" className="adm-link">사이트 보기 ↗</a>
          <button className="adm-link" onClick={logout}>로그아웃</button>
        </div>
      </header>

      <nav className="adm-tabs">
        {([
          ['menus', '메뉴'],
          ['stores', '매장'],
          ['instagram', '인스타'],
          ['faqs', 'FAQ'],
        ] as const).map(([k, label]) => (
          <button key={k} className={tab === k ? 'is-active' : ''} onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </nav>

      <main className="adm-body">
        {tab === 'menus' && (
          <Section
            title="시그니처 메뉴"
            onAdd={() =>
              patch({ menus: [...content.menus, { id: uid('m'), name: '새 메뉴', desc: '', img: '/media/menu-spread.jpg' }] })
            }
          >
            {content.menus.map((m, i) => (
              <MenuRow
                key={m.id}
                item={m}
                onChange={(v) => patch({ menus: content.menus.map((x) => (x.id === m.id ? v : x)) })}
                onDelete={() => patch({ menus: content.menus.filter((x) => x.id !== m.id) })}
                onUpload={upload}
                first={i === 0}
              />
            ))}
          </Section>
        )}

        {tab === 'stores' && (
          <Section
            title="매장"
            onAdd={() =>
              patch({ stores: [...content.stores, { id: uid('s'), name: '새 매장', address: '', phone: '', lat: 35.7, lng: 129.0 }] })
            }
          >
            {content.stores.map((s) => (
              <StoreRow
                key={s.id}
                item={s}
                onChange={(v) => patch({ stores: content.stores.map((x) => (x.id === s.id ? v : x)) })}
                onDelete={() => patch({ stores: content.stores.filter((x) => x.id !== s.id) })}
                onPick={() => setPickerFor(s.id)}
              />
            ))}
          </Section>
        )}

        {tab === 'instagram' && (
          <Section title="인스타그램 게시물 (URL)">
            <p className="adm-hint">릴스/게시물 주소를 넣으세요. 예: https://www.instagram.com/reel/XXXX/</p>
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                className="adm-input"
                placeholder={`${i + 1}번째 게시물 URL`}
                value={content.instagram[i] || ''}
                onChange={(e) => {
                  const arr = [...content.instagram]
                  arr[i] = e.target.value
                  patch({ instagram: arr.filter((x, idx) => x || idx < 3) })
                }}
              />
            ))}
          </Section>
        )}

        {tab === 'faqs' && (
          <Section
            title="자주 묻는 질문"
            onAdd={() => patch({ faqs: [...content.faqs, { id: uid('f'), q: '', a: '' }] })}
          >
            {content.faqs.map((f) => (
              <FaqRow
                key={f.id}
                item={f}
                onChange={(v) => patch({ faqs: content.faqs.map((x) => (x.id === f.id ? v : x)) })}
                onDelete={() => patch({ faqs: content.faqs.filter((x) => x.id !== f.id) })}
              />
            ))}
          </Section>
        )}
      </main>

      {pickerFor && (
        <MapPicker
          store={content.stores.find((s) => s.id === pickerFor)!}
          onApply={(lat, lng) => {
            patch({ stores: content.stores.map((x) => (x.id === pickerFor ? { ...x, lat, lng } : x)) })
            setPickerFor(null)
          }}
          onClose={() => setPickerFor(null)}
        />
      )}

      {chatOpen && (
        <ChatPanel
          onClose={() => setChatOpen(false)}
          onApplied={(c) => setContent(c)}
        />
      )}
    </div>
  )
}

function Section({ title, onAdd, children }: { title: string; onAdd?: () => void; children: ReactNode }) {
  return (
    <section className="adm-section">
      <div className="adm-section__head">
        <h2>{title}</h2>
        {onAdd && <button className="adm-add" onClick={onAdd}>+ 추가</button>}
      </div>
      <div className="adm-rows">{children}</div>
    </section>
  )
}

function MenuRow({ item, onChange, onDelete, onUpload, first }: {
  item: MenuItem
  onChange: (v: MenuItem) => void
  onDelete: () => void
  onUpload: (f: File) => Promise<string | null>
  first?: boolean
}) {
  const [busy, setBusy] = useState(false)
  return (
    <div className="adm-card">
      <div className="adm-card__img">
        <img src={item.img} alt={item.name} />
        <label className="adm-upload">
          {busy ? '업로드 중…' : '이미지 교체'}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={async (e) => {
              const f = e.target.files?.[0]
              if (!f) return
              setBusy(true)
              const url = await onUpload(f)
              setBusy(false)
              if (url) onChange({ ...item, img: url })
            }}
          />
        </label>
      </div>
      <div className="adm-card__body">
        <input className="adm-input" value={item.name} onChange={(e) => onChange({ ...item, name: e.target.value })} placeholder="메뉴명" />
        <textarea className="adm-input" rows={2} value={item.desc} onChange={(e) => onChange({ ...item, desc: e.target.value })} placeholder="설명" />
        <label className="adm-check">
          <input type="checkbox" checked={!!item.span2} onChange={(e) => onChange({ ...item, span2: e.target.checked })} />
          크게 표시(2칸){first ? ' · 대표' : ''}
        </label>
      </div>
      <button className="adm-del" onClick={onDelete}>삭제</button>
    </div>
  )
}

function StoreRow({ item, onChange, onDelete, onPick }: {
  item: StoreItem
  onChange: (v: StoreItem) => void
  onDelete: () => void
  onPick: () => void
}) {
  return (
    <div className="adm-card adm-card--store">
      <div className="adm-card__body">
        <div className="adm-grid2">
          <input className="adm-input" value={item.name} onChange={(e) => onChange({ ...item, name: e.target.value })} placeholder="매장명" />
          <input className="adm-input" value={item.tag || ''} onChange={(e) => onChange({ ...item, tag: e.target.value })} placeholder="태그(본점/신규 등, 선택)" />
        </div>
        <input className="adm-input" value={item.address} onChange={(e) => onChange({ ...item, address: e.target.value })} placeholder="주소" />
        <div className="adm-grid2">
          <input className="adm-input" value={item.phone || ''} onChange={(e) => onChange({ ...item, phone: e.target.value })} placeholder="전화번호" />
          <button className="adm-pick" onClick={onPick}>📍 지도에서 위치 찍기 ({item.lat.toFixed(3)}, {item.lng.toFixed(3)})</button>
        </div>
      </div>
      <button className="adm-del" onClick={onDelete}>삭제</button>
    </div>
  )
}

function FaqRow({ item, onChange, onDelete }: {
  item: FaqItem
  onChange: (v: FaqItem) => void
  onDelete: () => void
}) {
  return (
    <div className="adm-card adm-card--faq">
      <div className="adm-card__body">
        <input className="adm-input" value={item.q} onChange={(e) => onChange({ ...item, q: e.target.value })} placeholder="질문" />
        <textarea className="adm-input" rows={3} value={item.a} onChange={(e) => onChange({ ...item, a: e.target.value })} placeholder="답변" />
      </div>
      <button className="adm-del" onClick={onDelete}>삭제</button>
    </div>
  )
}
