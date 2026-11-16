'use client'

import { usePathname } from 'next/navigation'
import { useActionState, useEffect, useRef, useState, type CSSProperties } from 'react'
import { submitContact, type ContactState } from '@/app/(frontend)/actions'

const FIELDS = [
  { name: 'name', label: 'Họ và tên', ph: 'nhập họ và tên...', type: 'text', auto: 'name', required: true },
  { name: 'phone', label: 'Số điện thoại', ph: 'nhập số điện thoại...', type: 'tel', auto: 'tel', required: true },
  { name: 'email', label: 'Email', ph: 'nhập email (không bắt buộc)...', type: 'email', auto: 'email', required: false },
  { name: 'message', label: 'Nội dung', ph: 'dự án, quy mô, nhu cầu tư vấn...', type: 'text', auto: 'off', required: true },
] as const

/** Form liên hệ theo giao diện template, gửi qua server action (lưu vào CMS + email) */
export function ContactForm({ withEmail = true }: { withEmail?: boolean }) {
  const pathname = usePathname()
  const [values, setValues] = useState<Record<string, string>>({})
  // React 19 tự xoá ô nhập sau khi action chạy xong; ở đây chỉ cần xoá trạng thái "đã nhập"
  const [state, action, pending] = useActionState<ContactState, FormData>(async (prev, fd) => {
    const res = await submitContact(prev, fd)
    if (res?.ok) setValues({})
    return res
  }, null)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } }, { rootMargin: '0px 0px -15% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const fields = FIELDS.filter((f) => withEmail || f.name !== 'email')
  const label = pending ? 'Đang gửi…' : state?.ok ? 'Đã gửi ✓' : 'Gửi yêu cầu'
  return (
    <form ref={ref} className="form" id="contactForm" action={action}>
      {fields.map((f, i) => (
        <label
          key={f.name}
          className={`wrap-input form-input${values[f.name] ? ' has-value' : ''}${visible ? ' anim' : ''}${state?.errors?.[f.name] ? ' invalid' : ''}`}
          style={{ "--d": `${i * 0.14}s` } as CSSProperties}
        >
          <span className="input-name l1-t">{f.label}</span>
          <span className="placeholder l1">{f.ph}</span>
          <input
            name={f.name}
            type={f.type}
            className="input h1"
            autoComplete={f.auto}
            required={f.required}
            maxLength={f.name === 'message' ? 3000 : 120}
            {...(f.name === 'phone' ? { pattern: '\\+?[0-9 .]{9,15}', title: 'Số điện thoại 9–15 chữ số' } : {})}
            onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
          />
        </label>
      ))}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      <input type="hidden" name="source" value={pathname} />
      <div className="btn-send">
        <button className="btn" type="submit" disabled={pending}>
          <span className="wrap-text l1 hidden">{label}</span>
          <span className="wrap-text l1 hover">{label}</span>
          <span className="btn-hover-bg" />
        </button>
      </div>
      <p className="form-status l1" role="status" aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}
