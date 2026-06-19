// 매장 안내 — Leaflet(OpenStreetMap) 지도 + 매장 리스트. API 키 불필요
import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { stores } from '../data/stores'

export default function StoreMap() {
  const mapEl = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return

    const map = L.map(mapEl.current, { scrollWheelZoom: false }).setView([35.18, 129.0], 11)
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map)

    const icon = (label: string) =>
      L.divIcon({
        className: 'store-pin',
        html: `<span>${label}</span>`,
        iconSize: [34, 44],
        iconAnchor: [17, 44],
        popupAnchor: [0, -42],
      })

    markersRef.current = stores.map((s, i) => {
      const m = L.marker([s.lat, s.lng], { icon: icon(s.tag || '점') })
        .addTo(map)
        .bindPopup(`<b>${s.name}</b><br>${s.address}`)
      m.on('click', () => setActive(i))
      return m
    })

    const bounds = L.latLngBounds(stores.map((s) => [s.lat, s.lng] as [number, number]))
    map.fitBounds(bounds, { padding: [50, 50] })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  const focus = (i: number) => {
    setActive(i)
    const s = stores[i]
    mapRef.current?.setView([s.lat, s.lng], 15, { animate: true })
    markersRef.current[i]?.openPopup()
  }

  return (
    <section className="section stores" id="stores">
      <div className="container center">
        <span className="eyebrow">STORES</span>
        <h2 className="section-title display">매장 안내</h2>
        <p className="section-sub">현재 운영·오픈 중인 기찰반점 매장입니다. (지점 확대 중)</p>
      </div>
      <div className="container store-layout">
        <ul className="store-list">
          {stores.map((s, i) => (
            <li key={s.name}>
              <button
                className={`store-item ${active === i ? 'is-active' : ''}`}
                onClick={() => focus(i)}
              >
                <div className="store-item__top">
                  <h3>{s.name}</h3>
                  {s.tag && <span className="store-item__tag">{s.tag}</span>}
                </div>
                <p>{s.address}</p>
                {s.phone && <span className="store-item__tel">☎ {s.phone}</span>}
              </button>
            </li>
          ))}
        </ul>
        <div className="store-map" ref={mapEl} aria-label="매장 지도" />
      </div>
    </section>
  )
}
