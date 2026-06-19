// 매장 좌표 선택 모달 — 지도를 클릭해 위도·경도 지정 (Leaflet)
import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import type { StoreItem } from '../content/ContentProvider'

export default function MapPicker({ store, onApply, onClose }: {
  store: StoreItem
  onApply: (lat: number, lng: number) => void
  onClose: () => void
}) {
  const el = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<[number, number]>([store.lat, store.lng])

  useEffect(() => {
    if (!el.current) return
    const map = L.map(el.current).setView([store.lat, store.lng], 15)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map)
    let marker = L.marker([store.lat, store.lng]).addTo(map)
    map.on('click', (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng)
      setPos([e.latlng.lat, e.latlng.lng])
    })
    return () => {
      map.remove()
    }
  }, [])

  return (
    <div className="adm-modal" onClick={onClose}>
      <div className="adm-modal__box" onClick={(e) => e.stopPropagation()}>
        <div className="adm-modal__head">
          <strong>📍 {store.name} 위치 지정</strong>
          <span>지도를 클릭해 핀을 옮기세요</span>
        </div>
        <div className="adm-picker-map" ref={el} />
        <div className="adm-modal__foot">
          <span>위도 {pos[0].toFixed(5)} · 경도 {pos[1].toFixed(5)}</span>
          <div>
            <button className="adm-link" onClick={onClose}>취소</button>
            <button className="btn btn-primary" onClick={() => onApply(pos[0], pos[1])}>이 위치로 지정</button>
          </div>
        </div>
      </div>
    </div>
  )
}
