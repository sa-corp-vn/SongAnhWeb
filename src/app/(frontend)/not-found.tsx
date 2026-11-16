import { Btn } from '@/components/site/ui'

export default function NotFound() {
  return (
    <main className="page page-inner">
      <section className="nf" data-ui="white">
        <p className="l1">Lỗi 404</p>
        <h1 className="d1">Không tìm thấy trang</h1>
        <p className="l1">Trang bạn tìm có thể đã được đổi địa chỉ.</p>
        <Btn href="/" light>
          Về trang chủ
        </Btn>
      </section>
    </main>
  )
}
