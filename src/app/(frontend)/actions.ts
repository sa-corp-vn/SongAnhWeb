'use server'

import { getClient } from '@/lib/data'

export type ContactState = { ok: boolean; message: string; errors?: Record<string, boolean> } | null

const PHONE = /^\+?[0-9 .]{9,15}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Nhận yêu cầu từ form liên hệ: lưu vào CMS (mục "Yêu cầu liên hệ") và gửi email nếu đã cấu hình SMTP */
export async function submitContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const get = (k: string) => String(form.get(k) || '').trim()
  const data = { name: get('name'), phone: get('phone'), email: get('email'), message: get('message'), sourcePage: get('source').slice(0, 200) }
  if (get('website')) return { ok: true, message: 'Cảm ơn bạn!' } // bẫy chống spam

  const errors: Record<string, boolean> = {}
  if (data.name.length < 2 || data.name.length > 120) errors.name = true
  if (!PHONE.test(data.phone)) errors.phone = true
  if (data.email && !EMAIL.test(data.email)) errors.email = true
  if (data.message.length < 2 || data.message.length > 3000) errors.message = true
  if (Object.keys(errors).length) return { ok: false, message: 'Vui lòng điền đầy đủ và đúng thông tin.', errors }

  try {
    const payload = await getClient()
    await payload.create({ collection: 'contact-submissions', data: { ...data, email: data.email || undefined, status: 'new' }, overrideAccess: true })
    if (process.env.SMTP_HOST && process.env.CONTACT_NOTIFY_TO) {
      await payload
        .sendEmail({
          to: process.env.CONTACT_NOTIFY_TO,
          subject: `Yêu cầu tư vấn từ website — ${data.name}`,
          text: `Họ và tên: ${data.name}\nSố điện thoại: ${data.phone}\nEmail: ${data.email || '—'}\nNội dung: ${data.message}\nTrang: ${data.sourcePage}`,
        })
        .catch((err: unknown) => payload.logger.error({ err }, 'Không gửi được email thông báo liên hệ'))
    }
    return { ok: true, message: 'Cảm ơn bạn! Chuyên viên Song Anh sẽ liên hệ lại trong thời gian sớm nhất.' }
  } catch {
    return { ok: false, message: 'Hệ thống đang bận, vui lòng gọi hotline 0969 865 728 hoặc thử lại sau.' }
  }
}
