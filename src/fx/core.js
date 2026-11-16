/* =========================================================
   Lõi hiệu ứng dùng chung (chạy phía trình duyệt)
   Mỗi trang khởi tạo bằng createScope(); khi rời trang gọi scope.dispose()
   để huỷ animation, ScrollTrigger, sự kiện và bộ đếm giờ.
   ========================================================= */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
export const HIDE = 175 // > 150% để dấu tiếng Việt xếp chồng không lộ khỏi mặt nạ
export const $ = (s, c = document) => c.querySelector(s)
export const $$ = (s, c = document) => Array.from(c.querySelectorAll(s))
export const rem = (n) => n * parseFloat(getComputedStyle(document.documentElement).fontSize)
export const isMobile = () => window.matchMedia('(max-width:1023px)').matches
export const pad = (n, l = 2) => String(n).padStart(l, '0')
export const SA = () => (window.SA = window.SA || {})

/* ---------- smooth scroll (một Lenis dùng chung cho cả phiên) ---------- */
export function getLenis() {
  const sa = SA()
  if (sa.lenis !== undefined) return sa.lenis
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return (sa.lenis = null)
  const lenis = new Lenis({
    lerp: 0.085, // nội suy theo khung hình: bám tay tự nhiên với cả chuột lẫn trackpad, không "trôi" sau mỗi nấc cuộn
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false, // điện thoại giữ cuộn gốc của thiết bị — mượt và quen tay nhất
    stopInertiaOnNavigate: true, // bấm link khi đang trôi quán tính thì dừng ngay, không giật khi chuyển trang
  })
  lenis.on('scroll', ScrollTrigger.update)
  // thanh địa chỉ trên điện thoại co/giãn không làm ScrollTrigger tính lại (tránh giật khi cuộn trên mobile)
  ScrollTrigger.config({ ignoreMobileResize: true })
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  sa.lenis = lenis
  return lenis
}
export function scrollToEl(el, { offset = 0, duration = 1.6, immediate = false } = {}) {
  if (!el) return
  const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset)
  const lenis = getLenis()
  // cuộn tới mục: tăng tốc rồi hãm êm (quint in-out) thay vì lao đi rồi trôi
  if (lenis) lenis.scrollTo(y, { duration, immediate, force: true, easing: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2) })
  else window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' })
}

/* ---------- phạm vi dọn dẹp ---------- */
export function createScope() {
  const ctx = gsap.context(() => {})
  const offs = []
  const timers = []
  return {
    ctx,
    add: (fn) => ctx.add(fn),
    on(target, type, fn, opts) {
      if (!target) return
      target.addEventListener(type, fn, opts)
      offs.push(() => target.removeEventListener(type, fn, opts))
    },
    interval(fn, ms) { timers.push(['i', setInterval(fn, ms)]) },
    timeout(fn, ms) { timers.push(['t', setTimeout(fn, ms)]) },
    onDispose(fn) { offs.push(fn) },
    dispose() {
      offs.splice(0).forEach((f) => { try { f() } catch { /* bỏ qua */ } })
      timers.splice(0).forEach(([k, id]) => (k === 'i' ? clearInterval(id) : clearTimeout(id)))
      ctx.revert()
    },
  }
}

/* ---------- tách dòng chữ để làm hiệu ứng mặt nạ ---------- */
export function splitLines(el) {
  if (el.dataset.html === undefined) el.dataset.html = el.innerHTML
  el.innerHTML = el.dataset.html
  const tokens = []
  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeType === 1 && node.tagName === 'BR') { tokens.push({ br: true }); return }
    node.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return
      if (/^\s+$/.test(part)) { tokens.push({ space: true }); return }
      const w = node.nodeType === 1 ? node.cloneNode(false) : document.createElement('span')
      w.textContent = part
      w.classList.add('w')
      tokens.push({ el: w })
    })
  })
  el.textContent = ''
  tokens.forEach((t) => el.appendChild(t.el || (t.br ? document.createElement('br') : document.createTextNode(' '))))
  const lines = []
  let top = null
  let force = false
  Array.from(el.childNodes).forEach((n) => {
    if (n.nodeType !== 1) return
    if (n.tagName === 'BR') { force = true; return }
    if (force || top === null || Math.abs(n.offsetTop - top) > 3) { lines.push([]); top = n.offsetTop; force = false }
    lines[lines.length - 1].push(n)
  })
  el.textContent = ''
  lines.forEach((ws) => {
    const line = document.createElement('span'); line.className = 'line'
    const inner = document.createElement('span'); inner.className = 'line-text'
    ws.forEach((w, i) => { if (i) inner.appendChild(document.createTextNode(' ')); inner.appendChild(w) })
    line.appendChild(inner); el.appendChild(line)
  })
  return $$('.line-text', el)
}
export const linesOf = (el) => $$('.line-text', el)
export function splitAll(root) {
  $$('[data-split]', root).forEach((el) => {
    const lines = splitLines(el)
    const st = typeof el._splitState === 'function' ? el._splitState() : el.classList.contains('revealed') ? 0 : HIDE
    gsap.set(lines, { yPercent: st })
  })
}
/** Khôi phục chữ gốc khi rời trang (tránh lệch DOM với React) */
export function unsplitAll(root) {
  $$('[data-split]', root).forEach((el) => { if (el.dataset.html !== undefined) el.innerHTML = el.dataset.html })
}

/* ---------- logo 3D (xếp lớp ảnh) ---------- */
export function build3D(el, ratio) {
  if (!el || el.dataset.built) return
  el.dataset.built = '1'
  const n = +el.dataset.layers || 10
  const src = el.querySelector('img')
  if (!src) return
  const depth = Math.max(4, el.offsetWidth * ratio)
  src.style.setProperty('--b', 1)
  for (let i = 1; i <= n; i++) {
    const c = src.cloneNode()
    c.alt = ''
    c.style.transform = `translateZ(${((-i * depth) / n).toFixed(2)}px)`
    c.style.setProperty('--b', (0.62 - (i / n) * 0.28).toFixed(3))
    el.appendChild(c)
  }
}

/* ---------- màu thanh điều hướng cố định theo vùng ---------- */
export function createUiZones(root, getHeroColor) {
  const ui = $('#fixedUi')
  const zones = []
  const apply = (l, r) => {
    if (!ui) return
    ui.classList.toggle('left-black', l === 'black')
    ui.classList.toggle('right-black', r === 'black')
  }
  const recompute = () => {
    const z = zones.filter((x) => x.st.isActive).sort((a, b) => b.st.start - a.st.start)[0]
    if (!z || z.hero) { const c = getHeroColor ? getHeroColor() : 'white'; apply(c, c) } else apply(z.l, z.r)
  }
  if (getHeroColor) {
    const hero = $('.hero', root)
    if (hero) zones.push({ hero: true, st: ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: recompute }) })
  }
  $$('[data-ui]', root).forEach((el) => {
    const l = el.dataset.ui
    const r = el.dataset.uiRight || l
    zones.push({ l, r, st: ScrollTrigger.create({ trigger: el, start: el.dataset.uiStart || 'top 50%', end: 'bottom 50%', onToggle: recompute }) })
  })
  recompute()
  return { recompute, reset: () => apply('white', 'white') }
}

/* ---------- chữ / khối hiện dần khi cuộn tới ---------- */
export function setupReveals(root) {
  $$('[data-reveal]', root).forEach((el) => {
    const type = el.dataset.reveal || 'lines'
    if (type === 'fade') {
      gsap.set(el, { autoAlpha: 0, y: 28 })
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 1.15, ease: 'expo.out' }) })
    } else {
      el._splitState = () => (el.classList.contains('revealed') ? 0 : HIDE)
      ScrollTrigger.create({
        trigger: el, start: 'top 87%', once: true,
        onEnter: () => { el.classList.add('revealed'); gsap.to(linesOf(el), { yPercent: 0, duration: 1.25, stagger: 0.08, ease: 'expo.out' }) },
      })
    }
  })
}

/* ---------- slider tiêu đề + ảnh ---------- */
export function makeTitleSwap(titles, getCur, revealed) {
  titles.forEach((t, k) => {
    t._splitState = () => (k === getCur() && revealed() ? 0 : HIDE)
    gsap.set(linesOf(t), { yPercent: t._splitState() })
  })
  return (prev, next, dir) => {
    gsap.to(linesOf(titles[prev]), { yPercent: -HIDE * dir, duration: 0.55, ease: 'expo.in', stagger: 0.04 })
    gsap.fromTo(linesOf(titles[next]), { yPercent: HIDE * dir }, { yPercent: 0, duration: 1.05, ease: 'expo.out', stagger: 0.06, delay: 0.45 })
  }
}
export function clipSwap(incoming, outgoing, dir, onDone) {
  incoming.classList.add('incoming')
  const img = incoming.tagName === 'IMG' ? incoming : incoming.querySelector('img')
  const oimg = outgoing.tagName === 'IMG' ? outgoing : outgoing.querySelector('img')
  gsap.timeline({
    onComplete: () => {
      outgoing.classList.remove('active')
      incoming.classList.remove('incoming')
      incoming.classList.add('active')
      gsap.set(incoming, { clearProps: 'clipPath' })
      gsap.set(oimg, { clearProps: 'transform' })
      onDone()
    },
  })
    .fromTo(incoming, { clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.inOut' })
    .fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.5, ease: 'expo.out' }, 0.2)
    .to(oimg, { scale: 1.1, xPercent: -8 * dir, duration: 1.1, ease: 'expo.inOut' }, 0)
}
export function addSwipe(scope, el, onPrev, onNext) {
  if (!el) return
  let sx = null
  let sy = null
  scope.on(el, 'pointerdown', (e) => { sx = e.clientX; sy = e.clientY })
  scope.on(el, 'pointerup', (e) => {
    if (sx === null) return
    const dx = e.clientX - sx
    const dy = e.clientY - sy
    sx = null
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? onNext : onPrev)()
  })
}

/* ---------- footer: đồng hồ, menu tự mở, logo 3D nghiêng theo chuột ---------- */
export function setupFooter(scope, root) {
  const clock = $('.js-clock', root)
  if (clock) {
    const fmt = new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    const tick = () => { clock.textContent = `(${fmt.format(new Date())})` }
    tick()
    scope.interval(tick, 1000)
  }
  const footer = $('.footer', root)
  if (!footer) return
  ScrollTrigger.create({
    trigger: footer, start: 'top 25%', end: 'bottom top',
    onToggle: (self) => { if (isMobile()) return; SA().footerNavOpen = self.isActive; SA().setNav?.(self.isActive) },
  })
  const ui = $('#fixedUi')
  ScrollTrigger.create({ trigger: footer, start: 'top 55%', end: 'bottom top', toggleClass: { targets: ui, className: 'at-footer' } })
  scope.onDispose(() => {
    ui?.classList.remove('at-footer')
    if (SA().footerNavOpen) { SA().footerNavOpen = false; SA().setNav?.(false) }
  })
  const logo = $('#footerLogo .logo-3d', root)
  if (!logo) return
  build3D(logo, 0.11)
  gsap.set(logo, { rotationY: -22, rotationX: 10 })
  gsap.fromTo('#footerLogo', { y: () => -rem(6), autoAlpha: 0.3 }, {
    y: 0, autoAlpha: 1, ease: 'none',
    scrollTrigger: { trigger: footer, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true },
  })
  const rx = gsap.quickTo(logo, 'rotationX', { duration: 1.4, ease: 'power3' })
  const ry = gsap.quickTo(logo, 'rotationY', { duration: 1.4, ease: 'power3' })
  scope.on(footer, 'pointermove', (e) => {
    const r = footer.getBoundingClientRect()
    ry(((e.clientX - r.left) / r.width - 0.5) * 60 - 10)
    rx(-((e.clientY - r.top) / r.height - 0.5) * 34 + 6)
  })
  scope.on(footer, 'pointerleave', () => { ry(-22); rx(10) })
}

/** Gọi fn sau khi phông chữ sẵn sàng (tối đa 1.5 giây) để đo dòng chữ chính xác */
export function whenFontsReady(fn) {
  const ready = document.fonts && document.fonts.ready ? document.fonts.ready.catch(() => {}) : Promise.resolve()
  let done = false
  const run = () => { if (!done) { done = true; fn() } }
  Promise.race([ready, new Promise((r) => setTimeout(r, 1500))]).then(run)
  return () => { done = true }
}
