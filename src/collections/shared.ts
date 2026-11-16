import type { Access, CollectionAfterChangeHook, CollectionAfterDeleteHook, Field, FieldHook } from 'payload'

/** Tạo đường dẫn không dấu từ tiêu đề tiếng Việt: "Thiết kế Concept" → "thiet-ke-concept" */
export const toSlug = (input: string): string =>
  (input || '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const formatSlug: FieldHook = ({ value, data, operation }) => {
  if (typeof value === 'string' && value.trim()) return toSlug(value)
  if (operation === 'create' && typeof data?.title === 'string') return toSlug(data.title)
  return value
}

export const slugField = (): Field => ({
  name: 'slug',
  label: 'Đường dẫn',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  hooks: { beforeValidate: [formatSlug] },
  admin: {
    position: 'sidebar',
    description: 'Phần cuối của địa chỉ trang, vd. /thiet-ke-concept. Để trống sẽ tự tạo từ tiêu đề.',
  },
})

export const seoFields = (): Field => ({
  type: 'collapsible',
  label: 'SEO & chia sẻ',
  admin: { initCollapsed: true },
  fields: [
    { name: 'seoTitle', label: 'Tiêu đề SEO', type: 'text', admin: { description: 'Hiện trên tab trình duyệt và Google. Để trống = tiêu đề bài.' } },
    { name: 'excerpt', label: 'Mô tả ngắn', type: 'textarea', admin: { description: 'Dùng cho Google, thẻ chia sẻ và danh sách bài.' } },
  ],
})

/** Nội dung: trình soạn thảo cho bài mới + HTML giữ nguyên định dạng của bài chuyển từ website cũ */
export const contentFields = (): Field[] => [
  {
    name: 'content',
    label: 'Nội dung',
    type: 'richText',
    admin: { description: 'Nếu ô này có nội dung, website hiển thị nội dung này thay cho phần HTML bên dưới.' },
  },
  {
    name: 'contentHtml',
    label: 'Nội dung HTML (chuyển từ website cũ)',
    type: 'code',
    admin: {
      language: 'html',
      description: 'Bài chuyển từ sa-corp.vn được giữ nguyên dạng HTML để không mất bảng, ảnh, chú thích. Có thể sửa trực tiếp.',
    },
  },
]

export const anyone: Access = () => true
export const authenticated: Access = ({ req }) => Boolean(req.user)
/** Khách xem chỉ thấy bản đã xuất bản; người đăng nhập thấy cả bản nháp */
export const publishedOrAuthenticated: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } }

/** Làm mới (revalidate) các trang liên quan khi nội dung thay đổi */
export const revalidate = (paths: (doc: Record<string, unknown>) => string[]) => {
  const run = async (doc: Record<string, unknown>, context: Record<string, unknown>) => {
    if (context?.disableRevalidate) return
    try {
      const { revalidatePath } = await import('next/cache')
      for (const p of new Set(['/', '/search-index.json', '/sitemap.xml', ...paths(doc)])) revalidatePath(p)
    } catch {
      /* chạy ngoài Next.js (vd. script nạp dữ liệu) */
    }
  }
  const afterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, context }) => {
    await run(doc, context)
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) await run(previousDoc, context)
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = async ({ doc, context }) => {
    await run(doc, context)
    return doc
  }
  return { afterChange: [afterChange], afterDelete: [afterDelete] }
}
