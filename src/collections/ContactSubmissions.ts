import type { CollectionConfig } from 'payload'
import { authenticated } from './shared'

/** Yêu cầu gửi từ form liên hệ trên website (chỉ người quản trị xem được) */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Yêu cầu liên hệ', plural: 'Yêu cầu liên hệ' },
  admin: { useAsTitle: 'name', group: 'Khách hàng', defaultColumns: ['name', 'phone', 'status', 'createdAt'] },
  defaultSort: '-createdAt',
  access: { read: authenticated, create: () => false, update: authenticated, delete: authenticated },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Họ và tên', type: 'text', required: true },
        { name: 'phone', label: 'Số điện thoại', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email' },
      ],
    },
    { name: 'message', label: 'Nội dung', type: 'textarea', required: true },
    {
      name: 'status',
      label: 'Trạng thái xử lý',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Mới', value: 'new' },
        { label: 'Đã liên hệ', value: 'contacted' },
        { label: 'Đã xong', value: 'done' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'note', label: 'Ghi chú nội bộ', type: 'textarea', admin: { position: 'sidebar' } },
    { name: 'sourcePage', label: 'Gửi từ trang', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
  ],
}
