# Website Song Anh — Next.js + Payload CMS

Website chính thức của Công ty CP Tư vấn Đầu tư Xây dựng Song Anh. Giao diện theo template (hiệu ứng GSAP + Lenis), nội dung quản lý bằng **Payload CMS** chạy chung trong cùng ứng dụng Next.js.

| Thành phần | Công nghệ |
|---|---|
| Giao diện | Next.js 16 (App Router), React 19, TypeScript |
| Quản trị nội dung | Payload CMS 3 — trang quản trị tại `/admin` (tiếng Việt) |
| Cơ sở dữ liệu | SQLite (`data/sa.db`) — đổi sang Postgres khi cần, xem bên dưới |
| Hiệu ứng | GSAP + ScrollTrigger, Lenis (cuộn mượt), Leaflet (bản đồ dự án) |

## Chạy trên máy

Cần Node.js ≥ 20.18.

```bash
npm install
cp .env.example .env        # rồi đặt PAYLOAD_SECRET là một chuỗi ngẫu nhiên dài
npm run seed                 # nạp nội dung chuyển từ sa-corp.vn (chỉ cần lần đầu)
npm run dev                  # http://localhost:3000  ·  quản trị: http://localhost:3000/admin
```

Lần đầu vào `/admin`, Payload yêu cầu **tạo tài khoản quản trị đầu tiên** — người tạo đầu tiên là quản trị viên.

Bản production: `npm run build && npm start`.

## Quản trị nội dung (`/admin`)

| Mục | Dùng để |
|---|---|
| Tin tức › Bài viết | Đăng / sửa bài. Có **bản nháp** — chỉ hiện trên website khi bấm *Xuất bản* |
| Tin tức › Chuyên mục tin | Kiến thức thiết kế, Hoạt động Song Anh, Tuyển dụng… |
| Dự án › Dự án | Thông tin, số liệu, vị trí trên bản đồ, "hiện ở trang chủ" (8 dự án đầu theo thứ tự) |
| Dịch vụ › Dịch vụ | 10 dịch vụ tư vấn thiết kế |
| Nội dung › Trang văn bản | Chính sách bảo mật và các trang văn bản khác |
| Nội dung › Thư viện ảnh | Ảnh tải lên |
| Khách hàng › Yêu cầu liên hệ | Mọi yêu cầu gửi từ form liên hệ (đánh dấu Mới / Đã liên hệ / Đã xong) |
| Hệ thống › Thông tin công ty | Hotline, email, địa chỉ, MSDN, mạng xã hội — hiện ở footer và trang Liên hệ |

**Nội dung bài:** bài mới soạn trong ô *Nội dung* (trình soạn thảo). Bài chuyển từ website cũ được giữ nguyên ở ô
*Nội dung HTML* để không mất bảng, ảnh, chú thích — vẫn sửa trực tiếp được. Nếu ô *Nội dung* có chữ, website dùng ô đó.

Khi bấm *Lưu / Xuất bản*, trang liên quan được làm mới ngay (không cần build lại).

## Cấu trúc mã nguồn

```
src/
  app/(frontend)/          các trang website (trang chủ, [slug] cho bài/dự án/dịch vụ, danh sách…)
  app/(payload)/           trang quản trị Payload (tự sinh)
  app/sitemap.ts robots.ts sitemap.xml, robots.txt tự động
  collections/ globals/    cấu trúc dữ liệu CMS
  components/home/HomeView.tsx   giao diện trang chủ theo template
  components/site/         hero, thẻ dự án/tin, footer, menu, form liên hệ, bản đồ…
  components/views/        khung trang bài viết, dự án, dịch vụ, danh sách tin
  fx/                      hiệu ứng (GSAP): core, home (trang chủ), inner (trang con), runtime (chuyển trang, tìm kiếm)
  seed/                    script + dữ liệu nạp nội dung ban đầu (images/: ảnh đại diện để nạp vào Thư viện ảnh)
  styles/                  CSS theo template
public/uploads/            ảnh trong nội dung bài (chuyển từ website cũ)
media/                     ảnh tải lên qua CMS
data/sa.db                 cơ sở dữ liệu SQLite
```

## Đưa lên máy chủ

Đường dẫn trang giữ đúng như website WordPress cũ (vd. `/gioi-thieu`, `/tham-tra`); địa chỉ cũ có dấu `/` ở cuối
tự chuyển hướng 308 nên không mất thứ hạng Google.

### Deploy miễn phí trên Netlify (tên miền dạng `songanh.netlify.app`)

Netlify không có ổ đĩa lưu lâu dài, nên dùng thêm hai dịch vụ miễn phí: **Turso** (SQLite trên mây) cho
nội dung CMS và **UploadThing** cho ảnh tải lên. Cả ba đều đăng nhập bằng GitHub, không cần thẻ.

1. **Turso** (turso.tech): tạo database `songanh`, vùng **AWS US East (Ohio)** (gần máy chủ Netlify) →
   copy *Database URL* (`libsql://…`) và tạo *token*.
2. **UploadThing** (uploadthing.com): tạo app `songanh` → *API Keys* → copy `UPLOADTHING_TOKEN`.
3. **Nạp nội dung** (một lần, chạy trên máy có mã nguồn): điền 3 giá trị trên vào `.env` rồi `npm run seed`
   — tạo bảng trên Turso và tải 367 ảnh lên UploadThing. Xong thì trả `.env` về như cũ nếu muốn chạy cục bộ.
4. **Netlify** (netlify.com): *Add new project → Import from GitHub → `sa-corp-vn/SongAnhWeb`* (cho phép
   Netlify truy cập tổ chức sa-corp-vn). *Project name* = phần tên miền mong muốn, vd. `songanh` →
   `https://songanh.netlify.app`. Thêm biến môi trường:

   | Biến | Giá trị |
   |---|---|
   | `DATABASE_URL`, `DATABASE_AUTH_TOKEN` | từ Turso |
   | `UPLOADTHING_TOKEN` | từ UploadThing |
   | `PAYLOAD_SECRET` | chuỗi ngẫu nhiên dài **mới** (không dùng lại khoá máy khác) |
   | `NEXT_PUBLIC_SITE_URL` | `https://songanh.netlify.app` (đổi khi gắn tên miền thật) |
   | `SITE_NOINDEX` | `1` khi sa-corp.vn cũ còn chạy; xoá khi website này thay thế hẳn |

5. *Deploy* → vào `/admin` tạo tài khoản quản trị đầu tiên. Mỗi lần push lên `main`, Netlify tự build lại.

Giới hạn gói miễn phí Netlify tính theo "credit" mỗi tháng (băng thông, số lần deploy…); hết credit thì
website tạm dừng tới tháng sau — xem mức dùng ở *Netlify → Usage*. Khi lượng truy cập lớn, chuyển sang gói
trả phí hoặc máy chủ riêng (Cách 1 bên dưới).

**Cách 1 — Docker (khuyên dùng):** chép cả thư mục lên máy chủ (gồm `data/` và `media/`), tạo `.env`, rồi:

```bash
docker compose up -d --build      # website chạy ở cổng 3000
```

Đặt Nginx/Caddy phía trước để gắn tên miền và HTTPS.

**Cách 2 — Node.js + PM2:** `npm ci && npm run build && pm2 start npm --name songanh -- start`.

**Sao lưu:** chỉ cần 2 thư mục `data/` (nội dung) và `media/` (ảnh tải lên).

### Biến môi trường (`.env`)

| Biến | Ý nghĩa |
|---|---|
| `DATABASE_URL` | `file:./data/sa.db` (SQLite) |
| `PAYLOAD_SECRET` | Khoá bí mật — chuỗi ngẫu nhiên dài, **mỗi môi trường một khoá, không chia sẻ** |
| `NEXT_PUBLIC_SITE_URL` | Tên miền chính thức, vd. `https://sa-corp.vn` (dùng cho sitemap, thẻ chia sẻ) |
| `SMTP_HOST` `SMTP_PORT` `SMTP_USER` `SMTP_PASS` | Máy chủ email để gửi thông báo khi có yêu cầu liên hệ. Để trống = chỉ lưu vào CMS |
| `CONTACT_NOTIFY_TO` | Email nhận thông báo liên hệ (mặc định `tnc@sa-corp.vn`) |

### Khi lượng truy cập / số người biên tập tăng: chuyển sang Postgres

1. `npm install @payloadcms/db-postgres@3.91.0`
2. Trong `src/payload.config.ts` thay `sqliteAdapter(...)` bằng `postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } })`
3. Đặt `DATABASE_URL=postgres://...`, chạy `npm run payload migrate:create` rồi `npm run payload migrate`
4. Chạy lại `npm run seed` để nạp nội dung vào cơ sở dữ liệu mới

## Ghi chú

- Phiên bản đã ghim: Payload 3.91.0, Next.js 16.4.3 (Payload ≥ 3.92 yêu cầu Node ≥ 24.22).
- Bản đồ dự án dùng ô bản đồ OpenStreetMap như website cũ.
