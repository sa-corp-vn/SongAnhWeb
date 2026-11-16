'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

type SA = { hasNavigated?: boolean; homeShown?: boolean; onRouteChange?: () => void }
const sa = (): SA => {
  const w = window as Window & { SA?: SA }
  return (w.SA = w.SA || {})
}

/** Runtime cả phiên (đặt trong layout): cuộn mượt, chuyển trang, tìm kiếm… */
export function SiteRuntime() {
  const router = useRouter()
  const pathname = usePathname()
  const first = useRef(true)
  useEffect(() => {
    let cleanup: (() => void) | undefined
    let cancelled = false
    import('@/fx/runtime').then((m) => {
      if (cancelled) return
      cleanup = m.initRuntime({ navigate: (h: string) => router.push(h, { scroll: false }), prefetch: (h: string) => router.prefetch(h) })
    })
    return () => { cancelled = true; cleanup?.() }
  }, [router])
  useEffect(() => {
    if (first.current) { first.current = false; return }
    sa().onRouteChange?.()
  }, [pathname])
  return null
}

/** Hiệu ứng trang chủ */
export function HomeEffects() {
  useEffect(() => {
    let cleanup: (() => void) | undefined
    let cancelled = false
    import('@/fx/home').then((m) => {
      if (cancelled) return
      const s = sa()
      const firstLoad = !s.hasNavigated && !s.homeShown
      s.homeShown = true
      cleanup = m.initHome({ firstLoad })
    })
    return () => { cancelled = true; cleanup?.() }
  }, [])
  return null
}

/** Hiệu ứng trang con */
export function InnerEffects() {
  useEffect(() => {
    let cleanup: (() => void) | undefined
    let cancelled = false
    import('@/fx/inner').then((m) => {
      if (cancelled) return
      cleanup = m.initInner()
    })
    return () => { cancelled = true; cleanup?.() }
  }, [])
  return null
}
