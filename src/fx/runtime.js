/* =========================================================
   Runtime dùng chung cả phiên: chuyển trang (màn che + router Next.js),
   tải trước trang, tìm kiếm toàn site, video YouTube, sao chép liên kết.
   ========================================================= */
import { gsap, ScrollTrigger, getLenis, SA, build3D } from './core'

const esc = (s) => String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()

export function initRuntime({ navigate, prefetch }) {
  const sa = SA()
  const offs = []
  const on = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); offs.push(() => t.removeEventListener(ev, fn, o)) }
  getLenis()
  build3D(document.querySelector('.ui-logo .logo-3d'), 0.14)

  /* ---------- chuyển trang ---------- */
  const curtain = document.querySelector('.page-curtain')
  const curtainLogo = curtain?.querySelector('.pc-logo')
  // CSS đặt translateY(100%) — chuẩn hoá về y:0 + yPercent để GSAP không cộng dồn độ lệch pixel
  if (curtain) gsap.set(curtain, { y: 0, yPercent: 100 })
  let busy = false
  let pending = false
  let safety = null
  const isInternal = (a) => {
    if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download') || a.hasAttribute('data-no-transition')) return null
    let url
    try { url = new URL(a.href, location.href) } catch { return null }
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return null
    if (/^\/(admin|api)(\/|$)/.test(url.pathname) || /\.[a-z0-9]{2,5}$/i.test(url.pathname)) return null
    return url
  }
  function reveal() {
    clearTimeout(safety)
    if (!pending) return
    pending = false
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      gsap.to(curtain, { yPercent: -100, duration: 0.9, ease: 'expo.inOut', onComplete: () => { busy = false } })
      // logo trong màn trượt ngược chiều → cảm giác chiều sâu khi màn kéo lên
      if (curtainLogo) gsap.to(curtainLogo, { yPercent: 70, duration: 0.9, ease: 'expo.inOut' })
    }))
  }
  function go(href) {
    if (busy) return
    busy = true
    sa.hasNavigated = true
    if (!sa.footerNavOpen) sa.setNav?.(false)
    gsap.killTweensOf(curtain)
    if (curtainLogo) gsap.fromTo(curtainLogo, { yPercent: -70 }, { yPercent: 0, duration: 0.6, ease: 'expo.in' })
    gsap.fromTo(curtain, { yPercent: 100 }, {
      yPercent: 0, duration: 0.6, ease: 'expo.in',
      onComplete: () => {
        const l = getLenis()
        if (l) l.scrollTo(0, { immediate: true, force: true }); else window.scrollTo(0, 0)
        pending = true
        navigate(href)
        safety = setTimeout(() => { reveal(); busy = false }, 6000)
      },
    })
  }
  sa.navigate = go
  sa.onRouteChange = reveal
  on(document, 'click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = e.target.closest && e.target.closest('a[href]')
    const url = isInternal(a)
    if (!url) return
    if (url.pathname === location.pathname && url.search === location.search) {
      if (url.hash) return // trang tự xử lý anchor
      e.preventDefault()
      const l = getLenis()
      if (l) l.scrollTo(0, { duration: 1.4 }); else window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    e.preventDefault()
    go(url.pathname + url.search + url.hash)
  })
  const prefetched = new Set()
  on(document, 'pointerover', (e) => {
    const url = isInternal(e.target.closest && e.target.closest('a[href]'))
    if (!url || prefetched.has(url.pathname)) return
    prefetched.add(url.pathname)
    try { prefetch(url.pathname) } catch { /* bỏ qua */ }
  }, { passive: true })

  /* ---------- tìm kiếm toàn site ---------- */
  let ov = null, input, list, status, index = null, lastFocus = null
  function buildOverlay() {
    ov = document.createElement('div')
    ov.className = 'search-ov'
    ov.setAttribute('role', 'dialog')
    ov.setAttribute('aria-modal', 'true')
    ov.setAttribute('aria-label', 'Tìm kiếm')
    ov.setAttribute('data-lenis-prevent', '')
    ov.innerHTML = '<div class="search-ov__top l1"><span>Tìm kiếm — dự án, dịch vụ, tin tức</span>' +
      '<button type="button" class="js-search-close"><span class="wrap" data-text="Đóng ✕"><span>Đóng ✕</span></span></button></div>' +
      '<div class="search-ov__field"><input type="search" placeholder="Nhập từ khóa..." autocomplete="off" aria-label="Từ khóa tìm kiếm"></div>' +
      '<p class="search-ov__status l1" aria-live="polite"></p><div class="search-ov__res"></div>'
    document.body.appendChild(ov)
    input = ov.querySelector('input')
    list = ov.querySelector('.search-ov__res')
    status = ov.querySelector('.search-ov__status')
    ov.querySelector('.js-search-close').addEventListener('click', closeSearch)
    let t = null
    input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => run(input.value), 120) })
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') list.querySelector('a')?.click() })
    list.addEventListener('click', (e) => { if (e.target.closest('a')) closeSearch(true) })
  }
  async function loadIndex() {
    if (index) return
    status.textContent = 'Đang tải dữ liệu…'
    try {
      const res = await fetch('/search-index.json')
      const items = await res.json()
      index = items.map((it) => ({ ...it, n: norm(`${it.t} ${it.k} ${it.d}`), nt: norm(it.t) }))
      status.textContent = `${index.length} trang · nhập ít nhất 2 ký tự`
    } catch {
      status.textContent = 'Không tải được dữ liệu tìm kiếm.'
    }
  }
  function run(q) {
    if (!index) return
    const nq = norm(q).trim()
    if (nq.length < 2) { list.innerHTML = ''; status.textContent = `${index.length} trang · nhập ít nhất 2 ký tự`; return }
    const terms = nq.split(/\s+/)
    const hits = index.filter((it) => terms.every((t) => it.n.includes(t)))
    hits.sort((a, b) => (b.nt.includes(nq) - a.nt.includes(nq)) || (terms.filter((t) => b.nt.includes(t)).length - terms.filter((t) => a.nt.includes(t)).length) || String(b.p).localeCompare(String(a.p)))
    status.textContent = hits.length ? `${hits.length} kết quả` : 'Không có kết quả phù hợp'
    list.innerHTML = hits.slice(0, 80).map((it) =>
      `<a href="${esc(it.u)}">${it.i ? `<img src="${esc(it.i)}" alt="" loading="lazy">` : '<span></span>'}` +
      `<span class="l1-t">${esc(it.k)}</span><span class="h1-t">${esc(it.t)}</span></a>`).join('')
  }
  function openSearch() {
    if (!ov) buildOverlay()
    lastFocus = document.activeElement
    ov.classList.add('open')
    getLenis()?.stop()
    setTimeout(() => input.focus(), 60)
    loadIndex().then(() => run(input.value))
  }
  function closeSearch(navigating) {
    if (!ov || !ov.classList.contains('open')) return
    ov.classList.remove('open')
    getLenis()?.start()
    if (!navigating) lastFocus?.focus?.({ preventScroll: true })
  }
  sa.openSearch = openSearch
  on(document, 'click', (e) => { if (e.target.closest && e.target.closest('[data-search-open]')) { e.preventDefault(); openSearch() } })
  on(document, 'keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '') || document.activeElement?.isContentEditable
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) { e.preventDefault(); openSearch() }
    if (e.key === 'Escape') closeSearch()
  })

  /* ---------- video YouTube: bấm mới tải, phát ngay trong trang ---------- */
  const playYt = (el) => {
    if (el.querySelector('iframe')) return
    const f = document.createElement('iframe')
    f.src = `https://www.youtube-nocookie.com/embed/${el.dataset.yt}?autoplay=1&rel=0&playsinline=1`
    f.title = el.getAttribute('aria-label') || 'Video'
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    f.allowFullscreen = true
    el.appendChild(f)
  }
  on(document, 'click', (e) => { const y = e.target.closest && e.target.closest('[data-yt]'); if (y) playYt(y) })
  on(document, 'keydown', (e) => { const y = e.target.closest && e.target.closest('[data-yt]'); if (y && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); playYt(y) } })

  /* ---------- sao chép liên kết ---------- */
  on(document, 'click', (e) => {
    const b = e.target.closest && e.target.closest('[data-copy-link]')
    if (!b) return
    const s = b.querySelector('.wrap > span')
    const done = () => { if (s) { const old = s.textContent; s.textContent = 'Đã sao chép ✓'; setTimeout(() => { s.textContent = old }, 1800) } }
    if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, done); else done()
  })

  return () => { offs.splice(0).forEach((f) => f()); ov?.remove() }
}
