// AI 비서 챗 패널 — 자연어로 콘텐츠 수정 요청, 적용 시 상위로 갱신 콘텐츠 전달
import { useRef, useState } from 'react'
import type { SiteContent } from '../content/ContentProvider'

interface Msg {
  role: 'user' | 'assistant'
  content: string
  applied?: boolean
}

const EXAMPLES = [
  '포항북구점 전화번호를 0507-1234-5678로 바꿔줘',
  'FAQ에 "주차 가능한가요?" 질문 추가하고 답변도 적절히 써줘',
  '신메뉴 "마라탕수육" 추가해줘',
  '울산점 추가해줘. 울산 남구 삼산동쯤이야',
]

export default function ChatPanel({ onClose, onApplied }: {
  onClose: () => void
  onApplied: (c: SiteContent) => void
}) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', content: '안녕하세요! 무엇을 수정할까요? 메뉴·매장·인스타·FAQ를 자연어로 바꿔드립니다.' },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const send = async (text: string) => {
    if (!text.trim() || busy) return
    const history = msgs
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content }))
    setMsgs((m) => [...m, { role: 'user', content: text }])
    setInput('')
    setBusy(true)
    try {
      const r = await fetch('/api/admin/chat', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })
      const d = await r.json()
      setMsgs((m) => [...m, { role: 'assistant', content: d.reply || '처리했습니다.', applied: d.applied }])
      if (d.applied && d.content) onApplied(d.content)
    } catch {
      setMsgs((m) => [...m, { role: 'assistant', content: '오류가 발생했습니다. 다시 시도해주세요.' }])
    } finally {
      setBusy(false)
      setTimeout(() => scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight), 50)
    }
  }

  return (
    <div className="adm-chat">
      <div className="adm-chat__head">
        <strong>🤖 AI 비서</strong>
        <button className="adm-link" onClick={onClose}>닫기 ✕</button>
      </div>

      <div className="adm-chat__body" ref={scrollRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`adm-msg adm-msg--${m.role}`}>
            <div className="adm-msg__bubble">
              {m.content}
              {m.applied && <span className="adm-msg__applied">✓ 변경 적용됨 (저장하기를 눌러 반영)</span>}
            </div>
          </div>
        ))}
        {busy && <div className="adm-msg adm-msg--assistant"><div className="adm-msg__bubble">생각 중…</div></div>}
      </div>

      {msgs.length <= 1 && (
        <div className="adm-chat__examples">
          {EXAMPLES.map((ex) => (
            <button key={ex} onClick={() => send(ex)}>{ex}</button>
          ))}
        </div>
      )}

      <form
        className="adm-chat__input"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="예: 메뉴에 깐풍기 추가해줘"
          disabled={busy}
        />
        <button type="submit" className="btn btn-primary" disabled={busy}>보내기</button>
      </form>
    </div>
  )
}
