import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Thông tin công ty',
  admin: { group: 'Hệ thống' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: {
    afterChange: [
      async ({ doc, context }) => {
        if (context?.disableRevalidate) return doc
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/', 'layout')
        } catch {
          /* ngoài Next.js */
        }
        return doc
      },
    ],
  },
  fields: [
    { name: 'companyName', label: 'Tên công ty', type: 'text', required: true, defaultValue: 'Công ty CP Tư vấn Đầu tư Xây dựng Song Anh' },
    { name: 'taxCode', label: 'Mã số doanh nghiệp', type: 'text', defaultValue: '0312816675' },
    {
      type: 'row',
      fields: [
        { name: 'phone', label: 'Hotline (hiển thị)', type: 'text', defaultValue: '0969 865 728' },
        { name: 'email', label: 'Email', type: 'email', defaultValue: 'tnc@sa-corp.vn' },
      ],
    },
    { name: 'address', label: 'Địa chỉ', type: 'text', defaultValue: 'Tòa nhà Park IX, 08 Phan Đình Giót, P. Tân Sơn Hòa, TP.HCM' },
    { name: 'mapUrl', label: 'Link Google Maps', type: 'text', defaultValue: 'https://maps.app.goo.gl/vsTJRApc5BNmztfd6' },
    {
      name: 'socials',
      label: 'Mạng xã hội',
      type: 'array',
      fields: [
        { type: 'row', fields: [{ name: 'label', label: 'Tên', type: 'text', required: true }, { name: 'url', label: 'Đường dẫn', type: 'text', required: true }] },
      ],
      defaultValue: [
        { label: 'Facebook', url: 'https://www.facebook.com/thietkesonganh' },
        { label: 'TikTok', url: 'https://www.tiktok.com/@tongthausonganh' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/company/song-anh/' },
      ],
    },
  ],
}
