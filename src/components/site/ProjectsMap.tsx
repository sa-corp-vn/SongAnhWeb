'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

export type MapItem = { t: string; u: string; lat: number; lng: number; img?: string; p?: string; s?: string }

const esc = (s = '') => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

/** Bản đồ địa điểm dự án (Leaflet + OpenStreetMap, như website cũ) */
export function ProjectsMap({ items }: { items: MapItem[] }) {
  const el = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let map: import('leaflet').Map | undefined
    let cancelled = false
    import('leaflet').then((L) => {
      if (cancelled || !el.current) return
      map = L.map(el.current, { scrollWheelZoom: false }).setView([15.9, 106.2], 5)
      const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
      }).addTo(map)
      tiles.on('tileerror', (ev: { tile: HTMLImageElement & { __retry?: number } }) => {
        const tile = ev.tile
        tile.__retry = (tile.__retry || 0) + 1
        if (tile.__retry > 3) return
        const base = tile.src.split('?')[0]
        setTimeout(() => { if (tile.parentNode) tile.src = `${base}?r=${tile.__retry}` }, 600 * tile.__retry)
      })
      const icon = L.divIcon({ className: 'sa-pin', iconSize: undefined })
      const pts: [number, number][] = []
      items.forEach((it) => {
        L.marker([it.lat, it.lng], { icon, title: it.t })
          .addTo(map!)
          .bindPopup(
            `<div class="sa-pop">${it.img ? `<img src="${esc(it.img)}" alt="">` : ''}<div class="sa-pop__body"><span class="l1-t">${esc(it.p)}${it.s ? ` · ${esc(it.s)}` : ''}</span>` +
              `<strong class="l1">${esc(it.t)}</strong><a class="l1" href="${esc(it.u)}">Xem dự án →</a></div></div>`,
          )
        pts.push([it.lat, it.lng])
      })
      if (pts.length) map.fitBounds(pts, { padding: [40, 40] })
      const enable = () => map?.scrollWheelZoom.enable()
      const disable = () => map?.scrollWheelZoom.disable()
      el.current.addEventListener('mouseenter', enable)
      el.current.addEventListener('mouseleave', disable)
    })
    return () => { cancelled = true; map?.remove() }
  }, [items])
  return (
    <div className="pj-map" data-lenis-prevent="">
      <div ref={el} style={{ width: '100%', height: '100%' }} />
      <div className="pj-map__count l1">
        <strong>{items.length}</strong>
        <span>dự án trên bản đồ</span>
      </div>
    </div>
  )
}
