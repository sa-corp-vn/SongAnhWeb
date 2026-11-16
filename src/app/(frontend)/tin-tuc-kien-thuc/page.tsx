import type { Metadata } from 'next'
import { NewsListing } from '@/components/views/Views'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Tin tức & kiến thức - Song Anh',
  description: 'Tin tức, kiến thức thiết kế, hoạt động và tuyển dụng của Công ty CP Tư vấn Đầu tư Xây dựng Song Anh.',
  alternates: { canonical: '/tin-tuc-kien-thuc' },
}

export default function NewsPage() {
  return <NewsListing />
}
