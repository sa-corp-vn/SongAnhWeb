/* =========================================================
   Hiệu ứng trang con: hero, chữ hiện dần, mục lục, danh sách dịch vụ,
   bộ lọc dự án, "xem thêm" tin tức, footer. Trả về hàm dọn dẹp.
   ========================================================= */
import {
  gsap, ScrollTrigger, $, $$, rem, isMobile, HIDE, createScope, scrollToEl, splitAll, unsplitAll, linesOf,
  createUiZones, setupReveals, setupFooter, whenFontsReady,
} from './core'

export function initInner() {
  const scope = createScope()
  const root = $('.page-inner')
  if (!root) return () => {}
  let zones = null

  /* anchor trong trang (mục lục, #ban-do…) */
  scope.on(document, 'click', (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]')
    if (!a || a.getAttribute('href').length < 2) return
    const t = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)))
    if (!t) return
    e.preventDefault()
    scrollToEl(t, { offset: -rem(4), duration: 1.4 })
    history.replaceState(history.state, '', a.getAttribute('href'))
  })

  function setupHero() {
    const hero = $('.p-hero', root)
    if (!hero) return
    const bg = $('.p-hero__bg img', hero)
    if (bg) gsap.fromTo(bg, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
    gsap.to($('.p-hero__inner', hero), { autoAlpha: 0, y: () => -rem(4), ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '70% top', scrub: true, invalidateOnRefresh: true } })
  }
  function entrance() {
    const t = $('[data-hero]', root)
    const tl = gsap.timeline()
    if (t) { t.classList.add('revealed'); tl.fromTo(linesOf(t), { yPercent: HIDE }, { yPercent: 0, duration: 1.3, stagger: 0.09, ease: 'expo.out' }, 0.15) }
    tl.fromTo('.p-hero__kicker, .p-hero__lead, .p-crumbs, .p-hero__foot', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06, ease: 'expo.out' }, 0.3)
      .fromTo('.ui-anim, .ui-logo', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06, ease: 'expo.out' }, 0.3)
  }
  function setupProseImages() {
    $$('.p-prose figure img', root).forEach((img) => {
      gsap.set(img, { autoAlpha: 0, scale: 1.04 })
      ScrollTrigger.create({ trigger: img, start: 'top 94%', once: true, onEnter: () => gsap.to(img, { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'expo.out' }) })
    })
  }
  function setupToc() {
    const links = $$('[data-toc]', root)
    if (!links.length) return
    const set = (id) => links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id))
    links.forEach((a) => {
      const h = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)))
      if (h) ScrollTrigger.create({ trigger: h, start: 'top 40%', onEnter: () => set(h.id), onEnterBack: () => set(h.id) })
    })
  }
  function setupSvcFloat() {
    if (isMobile()) return
    $$('.svc-list', root).forEach((list) => {
      const float = list.nextElementSibling?.classList.contains('svc-float') ? list.nextElementSibling : null
      if (!float) return
      const rows = $$('.svc-row', list)
      const imgs = rows.map((r) => { const im = new Image(); im.src = r.dataset.img; im.alt = ''; float.appendChild(im); return im })
      scope.onDispose(() => imgs.forEach((im) => im.remove()))
      const fy = gsap.quickTo(float, 'y', { duration: 0.5, ease: 'power3' })
      rows.forEach((r, i) => {
        scope.on(r, 'mouseenter', () => { float.classList.add('show'); imgs.forEach((im, k) => im.classList.toggle('active', k === i)) })
        scope.on(r, 'mouseleave', () => float.classList.remove('show'))
      })
      // cố định ở cột trống bên trái (3rem), chỉ chạy dọc theo con trỏ, căn giữa theo chiều cao ảnh
      gsap.set(float, { x: rem(3) })
      scope.on(window, 'pointermove', (e) => { fy(e.clientY - float.offsetHeight / 2) }, { passive: true })
    })
  }
  function setupFilters() {
    const tabs = $$('#pjTabs [data-filter]', root)
    if (!tabs.length) return
    const cards = $$('#pjGrid .pj-card', root)
    const apply = (f) => {
      tabs.forEach((t) => t.classList.toggle('active', t.dataset.filter === f))
      cards.forEach((c) => c.classList.toggle('is-hidden', f !== '*' && !(' ' + c.dataset.cats + ' ').includes(' ' + f + ' ')))
      gsap.fromTo(cards.filter((c) => !c.classList.contains('is-hidden')), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.04, ease: 'expo.out' })
      ScrollTrigger.refresh()
    }
    tabs.forEach((t) => scope.on(t, 'click', () => {
      apply(t.dataset.filter)
      history.replaceState(history.state, '', t.dataset.filter === '*' ? location.pathname : '#' + t.dataset.filter)
    }))
    const h = decodeURIComponent(location.hash.slice(1))
    if (h && tabs.some((t) => t.dataset.filter === h)) { apply(h); scope.timeout(() => scrollToEl($('#pjTabs', root), { offset: -rem(4) }), 700) }
  }
  function setupMore() {
    const btn = $('[data-more]', root)
    if (!btn) return
    const per = +btn.dataset.more
    const shown = $('.js-shown', root)
    scope.on(btn, 'click', () => {
      const hidden = $$('#nGrid .n-card.is-hidden', root).slice(0, per)
      hidden.forEach((c) => c.classList.remove('is-hidden'))
      gsap.fromTo(hidden, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.04, ease: 'expo.out' })
      if (shown) shown.textContent = $$('#nGrid .n-card:not(.is-hidden)', root).length
      if (!$('#nGrid .n-card.is-hidden', root)) btn.closest('.n-more').style.display = 'none'
      ScrollTrigger.refresh()
    })
  }

  const cancelFonts = whenFontsReady(() => {
    scope.add(() => {
      splitAll(root)
      setupReveals(root)
      setupProseImages()
      setupHero()
      setupToc()
      setupSvcFloat()
      setupFilters()
      setupMore()
      setupFooter(scope, root)
      zones = createUiZones(root)
      ScrollTrigger.refresh()
      entrance()
      const id = decodeURIComponent(location.hash.slice(1))
      const target = id && document.getElementById(id)
      if (target && !target.closest('#pjTabs')) scope.timeout(() => scrollToEl(target, { offset: -rem(4) }), 600)
    })
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
  scope.on(window, 'load', () => ScrollTrigger.refresh())

  return () => {
    cancelFonts()
    clearTimeout(rT)
    scope.dispose()
    zones?.reset()
    unsplitAll(root)
  }
}
