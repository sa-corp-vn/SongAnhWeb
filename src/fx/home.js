/* =========================================================
   Hiệu ứng trang chủ (theo template): màn tải, hero, about, số liệu,
   dự án tiêu biểu, dịch vụ, thẻ 3D, đội ngũ, địa điểm, footer.
   initHome() trả về hàm dọn dẹp, gọi khi rời trang chủ.
   ========================================================= */
import {
  gsap, ScrollTrigger, $, $$, rem, isMobile, pad, HIDE, SA, getLenis, scrollToEl, createScope, splitAll, unsplitAll,
  linesOf, createUiZones, setupReveals, makeTitleSwap, clipSwap, addSwipe, setupFooter, whenFontsReady,
} from './core'

export function initHome({ firstLoad }) {
  const scope = createScope()
  const root = $('.page-home')
  if (!root) return () => {}
  const html = document.documentElement
  const lenis = getLenis()
  let heroColor = 'white'
  let zones = null
  let introPlayed = false

  // video nền: React không gắn thuộc tính muted khi render trên máy chủ → bật lại để tự phát
  const video = $('.hero-bg video', root)
  if (video) { video.muted = true; video.play().catch(() => {}) }

  scope.add(() => {
    gsap.set('.ui-anim, .ui-logo', { autoAlpha: 0 })
    gsap.set('.hero-symbol, .hero-dot', { autoAlpha: 0 })
  })

  /* ---------- anchor trong trang (#contact…) ---------- */
  scope.on(document, 'click', (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]')
    if (!a || a.getAttribute('href').length < 2) return
    const t = document.querySelector(a.getAttribute('href'))
    if (!t) return
    e.preventDefault()
    if (a.closest('.nav-list') && !SA().footerNavOpen) SA().setNav?.(false)
    scrollToEl(t, { duration: 2 })
  })

  /* ---------- 1. hero ---------- */
  function setupHero() {
    const hero = $('.hero', root)
    const title = $('.hero-title', root)
    title._splitState = () => (introPlayed ? 0 : HIDE)
    gsap.set(linesOf(title), { yPercent: introPlayed ? 0 : HIDE })
    const C = 'polygon(50% 50%,50% 50%,50% 50%,50% 50%)'
    const FULL = 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)'
    const PRE = 9.1
    const dist = hero.offsetHeight - window.innerHeight
    const SPLIT = (PRE * window.innerHeight) / Math.max(1, dist - window.innerHeight)
    const tl = gsap.timeline({ defaults: { ease: 'none' } })
    tl.to(title, { autoAlpha: 0, y: () => -rem(3), duration: 1 }, 0)
      .to('.hero-card', { autoAlpha: 0, y: () => rem(2), duration: 0.6 }, 0)
      .to('.hero-symbol, .hero-dot', { autoAlpha: 0, duration: 0.5 }, 0)
      .fromTo('.red-screen', { scaleX: 0.0055, scaleY: 0 }, { scaleY: 1, duration: 1, ease: 'power2.inOut' }, 0.3)
      .to('.red-screen', { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, 1.3)
      .set('.hero-bg', { autoAlpha: 0 }, 2.5)
      .fromTo('.clip-slide.n1', { clipPath: C }, { clipPath: 'polygon(25% 26%,75% 26%,75% 74%,25% 74%)', duration: 1.2, ease: 'power2.inOut' }, 2.5)
      .fromTo('.clip-slide.n1 img', { scale: 0.35 }, { scale: 0.56, duration: 1.2 }, 2.5)
      .fromTo('.clip-slide.n2', { clipPath: C }, { clipPath: FULL, duration: 1.4, ease: 'power2.inOut' }, 3.8)
      .fromTo('.clip-slide.n2 img', { scale: 0.45 }, { scale: 1, duration: 1.4 }, 3.8)
      .fromTo('.clip-slide.n3', { clipPath: C }, { clipPath: FULL, duration: 1.4, ease: 'power2.inOut' }, 5.3)
      .fromTo('.clip-slide.n3 img', { scale: 0.45 }, { scale: 1.05, duration: 1.4 }, 5.3)
      .fromTo('.scale-slide', { scale: 0 }, { scale: 1, duration: 1.6, ease: 'power2.inOut' }, 6.8)
      .set('.red-screen, .clip-slide', { autoAlpha: 0 }, 8.4)
      .to('.scale-half.left', { xPercent: -100, duration: SPLIT, ease: 'power1.inOut' }, PRE)
      .to('.scale-half.right', { xPercent: 100, duration: SPLIT, ease: 'power1.inOut' }, PRE)
    const uiLogo = $('.ui-logo')
    const setLogo = (t) => gsap.set(uiLogo, { y: isMobile() ? 0 : -rem(8.25) * Math.max(0, 1 - t / 0.8) })
    setLogo(0)
    tl.eventCallback('onUpdate', () => {
      const t = tl.time()
      setLogo(t)
      const c = t < 1.5 ? 'white' : t < 3.9 ? 'black' : t < 7.6 ? 'white' : 'black'
      if (c !== heroColor) { heroColor = c; zones?.recompute() }
    })
    ScrollTrigger.create({ animation: tl, trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true })
  }
  function heroEntrance() {
    introPlayed = true
    gsap.fromTo(linesOf($('.hero-title', root)), { yPercent: HIDE }, { yPercent: 0, duration: 1.3, stagger: 0.09, ease: 'expo.out' })
    gsap.fromTo('.ui-anim', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.15 })
    gsap.fromTo('.hero-card', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut', delay: 0.25 })
    gsap.fromTo('.ui-logo', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, delay: 0.45 })
    gsap.fromTo('.hero-symbol, .hero-dot', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, delay: 0.6 })
  }

  /* ---------- 2. about: dải ảnh cuộn ngang ----------
     Desktop: khung ảnh được ghim giữa màn hình, cuộn dọc → dải ảnh chạy ngang (1px dọc = 1px ngang) kèm thanh tiến độ.
     Ảnh giữ nguyên tỉ lệ gốc nên luôn hiện đủ. Mobile: vuốt ngang tự nhiên (CSS scroll-snap), không ghim. */
  function setupAboutSlider() {
    const pin = $('#aboutSlider', root)
    if (!pin) return
    const win = $('.slider-wrap', pin)
    const track = $('.slider-track', pin)
    gsap.fromTo($$('.a-slide', track), { y: () => rem(4), autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: 1.4, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: win, start: 'top 85%', once: true },
    })
    if (isMobile()) return
    const dist = () => Math.max(0, track.scrollWidth - win.clientWidth)
    const tl = gsap.timeline({ defaults: { ease: 'none' } })
      .to(track, { x: () => -dist() }, 0)
      .fromTo($('.a-progress span', pin), { scaleX: 0 }, { scaleX: 1 }, 0)
    ScrollTrigger.create({
      trigger: pin, start: 'center center', end: () => `+=${dist()}`,
      pin: true, anticipatePin: 1, scrub: 0.4, animation: tl, invalidateOnRefresh: true,
    })
  }

  /* ---------- 3. số liệu + dự án tiêu biểu + modal ---------- */
  const modal = $('#caseModal')
  const caseItems = $$('.case', root)
  let caseIdx = 0, modalOpen = false, lastFocus = null
  function fillCase(i) {
    const d = caseItems[i].dataset
    const img = $('#cmImg', modal)
    img.src = d.img; img.alt = d.title
    $('#cmTitle', modal).textContent = d.title
    $('#cmClient', modal).textContent = d.client
    $('#cmLoc', modal).textContent = d.location
    $('#cmScale', modal).textContent = d.scale || ''
    $('#cmLink', modal).setAttribute('href', d.url)
    $('#cmCounter', modal).textContent = pad(i + 1, 3)
    $('#cmBig', modal).textContent = caseItems[i].dataset.short || ''
  }
  function openCase(i) {
    caseIdx = i; fillCase(i)
    modalOpen = true; lastFocus = document.activeElement
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false')
    lenis?.stop()
    gsap.timeline()
      .fromTo('.cm-bg', { clipPath: 'inset(50% 0% 50% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' })
      .fromTo('#cmImg', { scale: 1.3 }, { scale: 1, duration: 1.5, ease: 'expo.out' }, 0.15)
      .to('.cm-overlay', { opacity: 1, duration: 0.6 }, 0.4)
      .fromTo('.cm-big', { autoAlpha: 0, y: 40 }, { autoAlpha: 0.6, y: 0, duration: 1, ease: 'expo.out' }, 0.5)
      .fromTo('.cm-content, .cm-close', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05 }, 0.6)
    scope.timeout(() => $('#cmClose', modal)?.focus({ preventScroll: true }), 50)
  }
  function closeCase() {
    if (!modalOpen) return
    modalOpen = false
    gsap.timeline({ onComplete: () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); lenis?.start() } })
      .to('.cm-content, .cm-close, .cm-big', { autoAlpha: 0, duration: 0.3 })
      .to('.cm-overlay', { opacity: 0, duration: 0.3 }, 0)
      .to('.cm-bg', { clipPath: 'inset(50% 0% 50% 0%)', duration: 0.8, ease: 'expo.inOut' }, 0.1)
    lastFocus?.focus?.({ preventScroll: true })
  }
  function stepCase(d) {
    caseIdx = (caseIdx + d + caseItems.length) % caseItems.length
    gsap.timeline()
      .to('.cm-content, .cm-big', { autoAlpha: 0, duration: 0.25 })
      .add(() => fillCase(caseIdx))
      .fromTo('#cmImg', { scale: 1.15, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.1, ease: 'expo.out' })
      .to('.cm-content', { autoAlpha: 1, duration: 0.5 }, '<.2')
      .to('.cm-big', { autoAlpha: 0.6, duration: 0.5 }, '<')
  }
  function setupCaseModal() {
    if (!modal) return
    scope.on($('#cmClose', modal), 'click', closeCase)
    scope.on($('#cmPrev', modal), 'click', () => stepCase(-1))
    scope.on($('#cmNext', modal), 'click', () => stepCase(1))
    scope.on($('#cmLink', modal), 'click', () => { if (modalOpen) { modalOpen = false; lenis?.start() } })
    scope.on(document, 'keydown', (e) => {
      if (!modalOpen) return
      if (e.key === 'Escape') closeCase()
      if (e.key === 'ArrowRight') stepCase(1)
      if (e.key === 'ArrowLeft') stepCase(-1)
      if (e.key === 'Tab') {
        const f = $$('button, a[href]', modal)
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    })
    scope.onDispose(() => { if (modalOpen) lenis?.start() })
  }
  function setupStats() {
    const stats = $('#stats', root)
    if (!stats) return
    const scrollers = $$('.stat-value-scroller', root)
    const details = $$('.stats-details', root)
    const descs = $$('.center-description', root)
    const bgs = $$('#statsBg img:not([data-case-bg])', root)
    const caseBgs = $$('#statsBg img[data-case-bg]', root)
    let cur = -1
    gsap.set($$('.stats-details span:last-child', root), { autoAlpha: 0, y: 12 })
    const setStep = (i) => {
      if (i === cur) return
      cur = i
      const set = i > 0 ? 1 : 0
      gsap.to(scrollers, { yPercent: -50 * set, duration: 1.1, ease: 'expo.out', stagger: 0.06 })
      details.forEach((d) => {
        const [a, b] = d.children
        gsap.to(a, { autoAlpha: set ? 0 : 1, y: set ? -12 : 0, duration: 0.5, ease: 'power2.out' })
        gsap.to(b, { autoAlpha: set ? 1 : 0, y: set ? 0 : 12, duration: 0.5, delay: 0.1, ease: 'power2.out' })
      })
      descs.forEach((d, k) => d.classList.toggle('active', k === i))
      if (!stats.classList.contains('is-hovering')) bgs.forEach((b, k) => b.classList.toggle('active', k === i))
    }
    setStep(0)
    $$('.stats-step', root).forEach((st, i) => ScrollTrigger.create({ trigger: st, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => { if (self.isActive) setStep(i) } }))
    const cases = $('#cases', root)
    const titleSpan = $('.cases-title span', root)
    gsap.set(titleSpan, { yPercent: HIDE })
    const showTitle = (on) => gsap.to(titleSpan, on ? { yPercent: 0, duration: 1.1, ease: 'expo.out' } : { yPercent: HIDE, duration: 0.6, ease: 'expo.in' })
    if (!isMobile()) {
      // Desktop: khung dự án được ghim (CSS sticky). Nền tối dần, số liệu lùi ra, rồi thẻ bay lên theo đường chéo
      // (cột trái trước), xếp đúng lưới quanh tiêu đề, giữ một nhịp (.cases-step-hold) rồi cuộn đi cùng nền.
      const inStep = $('.cases-step-in', root)
      const vh = () => window.innerHeight
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: inStep, start: 'top 80%', end: 'bottom 80%', scrub: 0.8, invalidateOnRefresh: true } })
      tl.to('.cases-overlay', { autoAlpha: 1, duration: 0.3 }, 0)
        .to('.stats-top, .center-description-wrap', { autoAlpha: 0, y: () => -rem(3), duration: 0.25 }, 0)
      caseItems.forEach((c, i) => {
        const col = i % 4, row = i < 4 ? 0 : 1
        const at = 0.1 + col * 0.09 + row * 0.1
        // hàng dưới bắt đầu ngay dưới mép màn hình — tính cả dòng tên dự án nằm phía trên ảnh
        tl.fromTo(c, { y: () => (row ? c.offsetHeight + rem(3) : vh()) }, { y: 0, duration: 0.5, ease: 'power2.out' }, at)
          .fromTo($('.case-img-in', c), { scale: 1.25 }, { scale: 1, duration: 0.5, ease: 'power2.out' }, at)
      })
      ScrollTrigger.create({ trigger: inStep, start: 'top 72%', onEnter: () => showTitle(true), onLeaveBack: () => showTitle(false) })
    } else {
      gsap.timeline({ scrollTrigger: { trigger: cases, start: 'top bottom', end: 'top 15%', scrub: true, invalidateOnRefresh: true } })
        .to('.cases-overlay', { autoAlpha: 1, ease: 'none' }, 0)
        .to('.stats-top, .center-description-wrap', { autoAlpha: 0, y: () => -rem(3), ease: 'none' }, 0)
      ScrollTrigger.create({ trigger: cases, start: 'top 65%', onEnter: () => showTitle(true), onLeaveBack: () => showTitle(false) })
    }
    caseItems.forEach((c, i) => {
      scope.on(c, 'mouseenter', () => {
        if (isMobile()) return
        stats.classList.add('is-hovering')
        bgs.forEach((b) => b.classList.remove('active'))
        caseBgs.forEach((b) => b.classList.toggle('active', b.dataset.caseBg === c.dataset.caseId))
      })
      scope.on(c, 'mouseleave', () => {
        stats.classList.remove('is-hovering')
        caseBgs.forEach((b) => b.classList.remove('active'))
        bgs.forEach((b, k) => b.classList.toggle('active', k === cur))
      })
      scope.on(c, 'click', () => openCase(i))
      scope.on(c, 'keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCase(i) } })
    })
  }

  /* ---------- 4. dịch vụ ---------- */
  function setupServices() {
    const sec = $('#services', root)
    if (!sec) return
    const titles = $$('.title-slide', sec)
    const texts = $$('.text-slide', sec)
    const slides = $$('.sv-slide', sec)
    const n = slides.length
    let cur = 0, busy = false, revealed = false
    $('.js-sv-total', sec).textContent = pad(n)
    slides[0].classList.add('active')
    texts[0].classList.add('active')
    const swap = makeTitleSwap(titles, () => cur, () => revealed)
    ScrollTrigger.create({ trigger: sec, start: 'top 55%', once: true, onEnter: () => { revealed = true; gsap.to(linesOf(titles[cur]), { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08 }) } })
    const go = (next, dir) => {
      if (busy || next === cur) return
      busy = true
      const prev = cur
      cur = next
      revealed = true
      swap(prev, next, dir)
      texts[prev].classList.remove('active')
      texts[next].classList.add('active')
      $('.js-sv-cur', sec).textContent = pad(next + 1)
      $('#svMore', sec).setAttribute('href', slides[next].dataset.url)
      clipSwap(slides[next], slides[prev], dir, () => { busy = false })
    }
    const next = () => go((cur + 1) % n, 1)
    const prev = () => go((cur - 1 + n) % n, -1)
    scope.on($('#svNext', sec), 'click', next)
    scope.on($('#svPrev', sec), 'click', prev)
    addSwipe(scope, $('#svImages', sec), prev, next)
    gsap.fromTo($$('.parallax-wrapper', sec), { y: () => -rem(3) }, { y: () => rem(3), ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } })
  }

  /* ---------- 5–7. why + thẻ 3D bay ---------- */
  function setupWhy() {
    gsap.fromTo('.why-choose .bg img', { y: () => -rem(6) }, { y: () => rem(6), ease: 'none', scrollTrigger: { trigger: '.why-choose', start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } })
    if (isMobile()) return
    gsap.timeline({ scrollTrigger: { trigger: '.anim-image-place', start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true } })
      .fromTo('.perspective-image', { autoAlpha: 0, y: () => rem(8) }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.02)
      .fromTo('.card-wrap', { rotateY: -55, rotateX: 12, rotateZ: -6 }, { rotateY: 180, rotateX: -8, rotateZ: 4, duration: 0.48, ease: 'none' }, 0)
      .to('.card-wrap', { rotateY: 360, rotateX: 6, rotateZ: -3, duration: 0.48, ease: 'none' }, 0.48)
      .to('.perspective-image', { autoAlpha: 0, duration: 0.05 }, 0.95)
  }

  /* ---------- 8. đội ngũ ---------- */
  function setupTeam() {
    const sec = $('#team', root)
    if (!sec) return
    const names = $$('.person-name', sec)
    const bgs = $$('.team-bg img', sec)
    const imgs = $$('.person-slider img', sec)
    const details = $$('.wrap-detail', sec)
    const n = names.length
    let cur = 0, busy = false, revealed = false
    const swap = makeTitleSwap(names, () => cur, () => revealed)
    ScrollTrigger.create({
      trigger: sec, start: 'top 50%', once: true,
      onEnter: () => {
        revealed = true
        gsap.to(linesOf(names[cur]), { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08 })
        gsap.fromTo('.person-slider', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' })
      },
    })
    const go = (next, dir) => {
      if (busy || next === cur) return
      busy = true
      const prev = cur
      cur = next
      revealed = true
      swap(prev, next, dir)
      bgs.forEach((b, k) => b.classList.toggle('active', k === next))
      details.forEach((d, k) => d.classList.toggle('active', k === next))
      clipSwap(imgs[next], imgs[prev], dir, () => { busy = false })
    }
    const next = () => go((cur + 1) % n, 1)
    const prev = () => go((cur - 1 + n) % n, -1)
    scope.on($('#teamNext', sec), 'click', next)
    scope.on($('#teamPrev', sec), 'click', prev)
    addSwipe(scope, $('.person-slider', sec), prev, next)
    if (!isMobile()) {
      gsap.fromTo('.right-decor-plash', { clipPath: 'polygon(50% 0%,50% 0%,50% 100%,50% 100%)' }, {
        clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)', ease: 'power1.inOut',
        scrollTrigger: { trigger: '.contact-reveal-pause', start: 'top 40%', end: 'bottom bottom', scrub: true },
      })
    }
  }

  /* ---------- 10. địa điểm ---------- */
  function setupLocations() {
    const sec = $('#locations', root)
    if (!sec) return
    const tabs = $$('.tab', sec)
    const titles = $$('.slide-title', sec)
    const descs = $$('.description-slide', sec)
    const bgs = $$('#locBg img', sec)
    const btn = $('#locBtn', sec)
    const labels = $$('.js-loc-label', sec)
    const meta = [
      { href: btn.getAttribute('href'), label: 'Xem bản đồ', ext: true },
      { href: '/project#ban-do', label: 'Xem dự án', ext: false },
    ]
    let cur = 0, revealed = false
    const swap = makeTitleSwap(titles, () => cur, () => revealed)
    ScrollTrigger.create({ trigger: sec, start: 'top 40%', once: true, onEnter: () => { revealed = true; gsap.to(linesOf(titles[cur]), { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08 }) } })
    tabs.forEach((tab, i) => scope.on(tab, 'click', () => {
      if (i === cur) return
      const prev = cur
      cur = i
      revealed = true
      tabs.forEach((t, k) => { t.classList.toggle('active', k === i); t.setAttribute('aria-selected', String(k === i)) })
      swap(prev, i, i > prev ? 1 : -1)
      descs.forEach((d, k) => d.classList.toggle('active', k === i))
      bgs.forEach((b, k) => b.classList.toggle('active', k === i))
      btn.setAttribute('href', meta[i].href)
      if (meta[i].ext) { btn.setAttribute('target', '_blank'); btn.setAttribute('rel', 'noopener') } else { btn.removeAttribute('target'); btn.removeAttribute('rel') }
      labels.forEach((l) => { l.textContent = meta[i].label })
    }))
    const imgs = $('#locImages', sec)
    gsap.fromTo(imgs, { y: 0 }, { y: () => -(window.innerHeight + imgs.offsetHeight), ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } })
    gsap.fromTo('#locBg', { y: 0 }, { y: () => -rem(14), ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } })
  }

  /* ---------- màn tải (chỉ lần đầu mở website) ---------- */
  function runPreloader(done) {
    const pre = $('#preloader')
    if (!pre) return done()
    if (!firstLoad) { pre.style.display = 'none'; return done() }
    html.classList.add('is-loading')
    lenis?.stop()
    const pct = $('.js-percent', pre)
    const anim = $('.loading-anim', pre)
    const area = $('.loading-area', pre)
    const critical = ['/img/hero-poster.webp', '/img/logo-metal.png', '/img/mark-metal.png', '/img/nen-selavia.webp', '/img/nen-regal.webp', '/img/nen-lumena.webp']
    const loadImg = (src) => new Promise((res) => { const im = new Image(); im.onload = im.onerror = res; im.src = src })
    const assets = Promise.all(critical.map(loadImg))
    const timeout = new Promise((res) => setTimeout(res, 8000))
    const counter = { v: 0 }
    const update = () => { pct.textContent = `${Math.round(counter.v)}%`; gsap.set(anim, { y: ((area.offsetHeight - anim.offsetHeight) * counter.v) / 100 }) }
    gsap.set('.pre-text span', { yPercent: HIDE })
    gsap.set('.pre-logo', { autoAlpha: 0, scale: 0.92 })
    gsap.to('.pre-text span', { yPercent: 0, duration: 1.1, ease: 'expo.out', delay: 0.2, stagger: 0.06 })
    gsap.to('.pre-logo', { autoAlpha: 1, scale: 1, duration: 1.3, ease: 'expo.out', delay: 0.1 })
    const first = gsap.to(counter, { v: 86, duration: 1.9, ease: 'power2.out', onUpdate: update })
    const exit = () => {
      gsap.timeline({ onComplete: () => { pre.style.display = 'none'; html.classList.remove('is-loading'); lenis?.start(); done() } })
        .to('.pre-text span', { yPercent: -HIDE, duration: 0.6, ease: 'expo.in', stagger: 0.05 })
        .to('.pre-logo', { autoAlpha: 0, scale: 0.9, duration: 0.6, ease: 'expo.in' }, '<')
        .to('.loading-area', { autoAlpha: 0, duration: 0.4 }, '<')
        .to('.preloader-bg', { yPercent: -100, duration: 1.15, ease: 'expo.inOut' }, '-=.15')
        .add(() => scope.add(heroEntrance), '-=.6')
    }
    Promise.race([assets, timeout]).then(() => {
      scope.add(() => {
        const finish = () => gsap.to(counter, { v: 100, duration: 0.5, ease: 'power1.inOut', onUpdate: update, onComplete: () => scope.add(exit) })
        if (first.isActive()) first.eventCallback('onComplete', finish)
        else finish()
      })
    })
    scope.onDispose(() => { html.classList.remove('is-loading') })
  }

  /* ---------- khởi động ---------- */
  const cancelFonts = whenFontsReady(() => {
    scope.add(() => {
      splitAll(root)
      setupHero()
      setupAboutSlider() // tạo trước các hiệu ứng phía dưới vì nó ghim và chèn thêm khoảng cuộn
      setupReveals(root)
      setupStats()
      setupCaseModal()
      setupServices()
      setupWhy()
      setupTeam()
      setupLocations()
      setupFooter(scope, root)
      zones = createUiZones(root, () => heroColor)
      ScrollTrigger.refresh()
    })
    runPreloader(() => {})
    if (!firstLoad) scope.add(heroEntrance)
  })

  let lastW = window.innerWidth
  let rT = null
  scope.on(window, 'resize', () => {
    clearTimeout(rT)
    rT = setTimeout(() => {
      if (window.innerWidth === lastW) return
      lastW = window.innerWidth
      scope.add(() => { splitAll(root); ScrollTrigger.refresh() })
    }, 250)
  })

  return () => {
    cancelFonts()
    clearTimeout(rT)
    scope.dispose()
    zones?.reset()
    unsplitAll(root)
  }
}
