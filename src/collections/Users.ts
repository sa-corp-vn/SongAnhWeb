import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Người quản trị', plural: 'Người quản trị' },
  admin: { useAsTitle: 'email', group: 'Hệ thống' },
  auth: true,
  fields: [{ name: 'name', label: 'Họ tên', type: 'text' }],
}
