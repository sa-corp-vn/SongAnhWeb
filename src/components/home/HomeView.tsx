/* Giao diện trang chủ theo template — sửa trực tiếp tại đây. */
import Image from 'next/image'
import type { ReactNode } from 'react'

type Props = { news: ReactNode; footer: ReactNode; cases: ReactNode; caseBgs: ReactNode; contactForm: ReactNode }

export function HomeView({ news, footer, cases, caseBgs, contactForm }: Props) {
  return (
    <>
<div className="preloader" id="preloader" aria-hidden="true">
  <div className="preloader-bg"></div>
  <div className="loading-area">
    <p className="loading-anim l2"><span className="js-percent">0%</span><span>đang tải trải nghiệm</span></p>
  </div>
  <p className="pre-text pre-left l1"><span>Kiến tạo</span></p>
  <div className="pre-logo"><img src="/img/logo-metal.png" alt="" /></div>
  <p className="pre-text pre-right l1"><span>giá trị thực?</span></p>
</div>
<main className="page page-home">

  
  <section className="hero" id="intro">
    <div className="hero-sticky">
      <div className="hero-bg">
        <video className="inner-img" src="/video/hero.mp4" poster="/img/hero-poster.webp" autoPlay muted loop playsInline preload="auto"></video>
        <div className="hero-shade"></div>
      </div>
      <span className="hero-dot"></span>
      <h1 className="hero-title h1" data-split="">Song Anh — kiến tạo giá trị thực, bền vững, khác biệt</h1>
      <div className="hero-card">
        <p className="l1-t">Tổng thầu tư vấn thiết kế đa bộ môn</p>
        <ul className="l1">
          <li><a href="/tu-van-thiet-ke-concept-song-anh">Concept<svg className="arrow-svg" viewBox="0 0 10 16" aria-hidden="true"><path d="M1.5 12.5 8.5 5.5M3 5.5h5.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg></a></li>
          <li><a href="/tu-van-thiet-ke-kien-truc-song-anh">Kiến trúc<svg className="arrow-svg" viewBox="0 0 10 16" aria-hidden="true"><path d="M1.5 12.5 8.5 5.5M3 5.5h5.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg></a></li>
          <li><a href="/dich-vu-thiet-ke-ket-cau-song-anh">Kết cấu<svg className="arrow-svg" viewBox="0 0 10 16" aria-hidden="true"><path d="M1.5 12.5 8.5 5.5M3 5.5h5.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg></a></li>
          <li><a href="/tu-van-thiet-ke-co-dien-mepf">Cơ điện MEPF<svg className="arrow-svg" viewBox="0 0 10 16" aria-hidden="true"><path d="M1.5 12.5 8.5 5.5M3 5.5h5.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg></a></li>
          <li><a href="/thiet-ke-canh-quan-song-anh">Cảnh quan<svg className="arrow-svg" viewBox="0 0 10 16" aria-hidden="true"><path d="M1.5 12.5 8.5 5.5M3 5.5h5.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg></a></li>
        </ul>
      </div>
      <div className="hero-symbol"><img src="/img/mark-white.png" alt="" /></div>

      
      <div className="red-screen"></div>
      <div className="clip-slide n1"><img src="/img/nen-selavia.webp" alt="" /></div>
      <div className="clip-slide n2"><img src="/img/nen-regal.webp" alt="" /></div>
      <div className="clip-slide n3"><img src="/img/nen-lumena.webp" alt="" /></div>
      <div className="scale-slide">
        <div className="scale-half left">
          <p className="scale-title h1">Mỗi dự án là một cam kết về<br />chất lượng và uy tín của Song Anh</p>
          <p className="scale-description l1">Tổng thầu tư vấn thiết kế kiến trúc, kết cấu, cơ điện cho các dự án chung cư, khách sạn và khu đô thị trên khắp Việt Nam.</p>
        </div>
        <div className="scale-half right" aria-hidden="true">
          <p className="scale-title h1">Mỗi dự án là một cam kết về<br />chất lượng và uy tín của Song Anh</p>
        </div>
      </div>
    </div>
  </section>

  
  <section className="about-section" id="about" data-ui="black">
    <div className="about">
      <span className="l1-t block-name">Về chúng tôi</span>
      <h2 className="h1-t title" data-split="" data-reveal="">Công ty Cổ phần Tư vấn Đầu tư Xây dựng Song Anh — đơn vị tư vấn thiết kế và tổng thầu thiết kế các dự án chung cư cao tầng, nhà ở xã hội, khách sạn, khu nghỉ dưỡng và khu đô thị phức hợp trên khắp Việt Nam.</h2>
      {/* ảnh giữ nguyên tỉ lệ gốc (không cắt); desktop: cuộn dọc → dải ảnh chạy ngang (fx/home.js), mobile: vuốt ngang */}
      <div className="slider-pin" id="aboutSlider">
      <div className="slider-wrap">
        <div className="slider-track">
          <figure className="a-slide"><Image src="/img/about-1.jpg" alt="Đội ngũ Song Anh tại team building 2026" width={1493} height={1120} sizes="(max-width:1023px) 80vw, 45vw" loading="eager" fetchPriority="low" draggable={false} /></figure>
          <figure className="a-slide"><Image src="/img/about-2.jpg" alt="Song Anh khảo sát dự án Đông Hải tại Hải Phòng" width={840} height={1120} sizes="(max-width:1023px) 80vw, 45vw" loading="eager" fetchPriority="low" draggable={false} /></figure>
          <figure className="a-slide"><Image src="/img/about-3.jpg" alt="Song Anh tham dự Vietnam Proud Construction Networking" width={1680} height={1120} sizes="(max-width:1023px) 80vw, 45vw" loading="eager" fetchPriority="low" draggable={false} /></figure>
          <figure className="a-slide"><Image src="/img/about-4.jpg" alt="Song Anh chào đón sinh viên UTE tham quan doanh nghiệp" width={840} height={1120} sizes="(max-width:1023px) 80vw, 45vw" loading="eager" fetchPriority="low" draggable={false} /></figure>
          <figure className="a-slide"><Image src="/img/about-5.jpg" alt="Lễ bổ nhiệm Giám đốc Thiết kế Song Anh" width={1440} height={1080} sizes="(max-width:1023px) 80vw, 45vw" loading="eager" fetchPriority="low" draggable={false} /></figure>
          <figure className="a-slide"><Image src="/img/about-6.jpg" alt="Giám đốc Thiết kế Song Anh tại Hội đồng Kiến trúc" width={1493} height={1120} sizes="(max-width:1023px) 80vw, 45vw" loading="eager" fetchPriority="low" draggable={false} /></figure>
        </div>
        <div className="a-progress" aria-hidden="true"><span /></div>
      </div>
      </div>
      <ul className="honors-list">
        <li data-reveal="fade">
          <span className="honor-name l1-t">Tổng thầu</span>
          <p className="l1">Tổng thầu thiết kế kiến trúc, kết cấu, cơ điện &amp; PCCC — trọn gói hồ sơ các bộ môn</p>
        </li>
        <li data-reveal="fade">
          <span className="honor-name l1-t">BIM</span>
          <p className="l1">Quy trình ứng dụng BIM xuyên suốt từ concept đến hồ sơ thi công</p>
        </li>
        <li data-reveal="fade">
          <span className="honor-name l1-t">Design Director</span>
          <p className="l1">Hơn 15 năm kinh nghiệm quốc tế dẫn dắt định hướng thiết kế tại Song Anh</p>
        </li>
      </ul>
    </div>
  </section>

  
  <section className="stats" id="stats" data-ui="white">
    <div className="stats-sticky">
      <div className="img-bg" id="statsBg">
        <img className="active" src="/img/bg-thap-hoang-hon.webp" alt="" />
        <img src="/img/bg-nghi-duong.webp" alt="" loading="lazy" />
        <img src="/img/bg-thap-trang.webp" alt="" loading="lazy" />{caseBgs}
      </div>
      <div className="stats-shade"></div>
      <div className="stats-top">
        <div className="stat-column left">
          <p className="stat-value d1"><span className="stat-value-scroller"><span>2014</span><span>2020</span></span></p>
          <p className="stats-details l1"><span>Năm thành lập, khởi đầu với định hướng tư vấn thiết kế xây dựng</span><span>Triển khai BIM xuyên suốt các giai đoạn thiết kế</span></p>
        </div>
        <div className="stat-column center">
          <p className="stat-value d1"><span className="stat-value-scroller"><span>15</span><span>23</span></span></p>
          <p className="stats-details l1"><span>Dự án tiêu biểu từ Hải Phòng đến Phú Quốc</span><span>Khách sạn 4–6 sao trong kinh nghiệm của Giám đốc Thiết kế</span></p>
        </div>
        <div className="stat-column right">
          <p className="stat-value d1"><span className="stat-value-scroller"><span>10</span><span>4,45M</span></span></p>
          <p className="stats-details l1"><span>Dịch vụ tư vấn: từ concept, kiến trúc, kết cấu, MEPF đến dự toán và thẩm tra</span><span>m² sàn xây dựng trong danh mục của Giám đốc Thiết kế</span></p>
        </div>
      </div>
      <div className="center-description-wrap">
        <p className="active l1 center-description"><em className="l1-t">Tầm nhìn</em> Trở thành đơn vị tư vấn thiết kế và tổng thầu thiết kế hàng đầu Việt Nam, được chủ đầu tư tin tưởng nhờ chất lượng hồ sơ, tiến độ và năng lực ứng dụng BIM.</p>
        <p className="l1 center-description"><em className="l1-t">Sứ mệnh</em> Đồng hành cùng chủ đầu tư tạo ra những công trình tối ưu công năng, an toàn, bền vững và hiệu quả đầu tư, từ ý tưởng đến thi công.</p>
        <p className="l1 center-description"><em className="l1-t">Giá trị cốt lõi</em> Chuyên nghiệp, minh bạch, sáng tạo và trách nhiệm. Mỗi dự án là một cam kết về chất lượng và uy tín của Song Anh.</p>
      </div>
      <div className="cases-overlay"></div>
    </div>

    <div className="stats-steps" aria-hidden="true">
      <div className="stats-step"></div>
      <div className="stats-step"></div>
      <div className="stats-step"></div>
      <div className="stats-step-tail"></div>
      <div className="cases-step-in"></div>
      <div className="cases-step-hold"></div>
    </div>

    <div className="cases" id="cases">
      <div className="cases-pin">
        <h2 className="cases-title h1"><span>Dự án tiêu biểu</span></h2>
        {cases}
      </div>
    </div>
  </section>

  
  <section className="our-services" id="services" data-ui="black">
    <div className="audio-part">
      <div className="wrap-btn"><span className="block-name l1-t">Dịch vụ tư vấn thiết kế</span></div>
    </div>
    <div className="wrap-cont">
      <div className="title-slides">
        <div className="h1 title-slide" data-split="">Thiết kế <i>Concept</i></div>
        <div className="h1 title-slide" data-split="">Thiết kế <i>kiến trúc</i></div>
        <div className="h1 title-slide" data-split="">Thiết kế <i>kết cấu</i></div>
        <div className="h1 title-slide" data-split="">Cơ điện <i>MEPF</i> &amp; <i>PCCC</i></div>
        <div className="h1 title-slide" data-split="">Thiết kế <i>cảnh quan</i></div>
        <div className="h1 title-slide" data-split="">Dự toán &amp; <i>quản lý</i> <i>chi phí</i></div>
      </div>
      <div className="services-bottom">
        <p className="slides-counter l1-t"><span className="js-sv-cur">01</span> / <span className="js-sv-total">06</span></p>
        <div className="text-slides">
          <p className="text-slide l1">Định hình ý tưởng, phong cách kiến trúc và phương án quy hoạch ban đầu — “linh hồn” dẫn dắt toàn bộ quá trình phát triển dự án.</p>
          <p className="text-slide l1">Giải pháp đồng bộ từ ý tưởng đến thi công, phối hợp kiến trúc – kết cấu – MEP ngay từ đầu để phương án khả thi khi triển khai thực tế.</p>
          <p className="text-slide l1">An toàn chịu lực trong suốt vòng đời công trình, thi công thuận lợi, tối ưu vật liệu và kiểm soát chi phí xây dựng.</p>
          <p className="text-slide l1">Điện, nước, HVAC và phòng cháy chữa cháy đồng bộ — vận hành ổn định, hạn chế xung đột kỹ thuật và phát sinh tại công trường.</p>
          <p className="text-slide l1">Cảnh quan triển khai cùng kiến trúc, kết cấu, cơ điện và hạ tầng trong một bộ hồ sơ thống nhất, từ concept tới bản vẽ thi công.</p>
          <p className="text-slide l1">Ứng dụng BIM để lập dự toán sát thực tế, giảm phát sinh và tối ưu ngân sách ngay từ giai đoạn thiết kế.</p>
        </div>
        <div className="controls">
          <button className="btn btn-round" id="svPrev" aria-label="Dịch vụ trước">
            <span className="wrap-icon hidden"><svg className="arrow to-left" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg></span>
            <span className="wrap-icon hover"><svg className="arrow to-left" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg></span>
            <span className="btn-hover-bg"></span>
          </button>
          <button className="btn btn-round" id="svNext" aria-label="Dịch vụ tiếp theo">
            <span className="wrap-icon hidden"><svg className="arrow" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg></span>
            <span className="wrap-icon hover"><svg className="arrow" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg></span>
            <span className="btn-hover-bg"></span>
          </button>
          <a className="btn" href="#contact" data-scroll="">
            <span className="wrap-text l1 hidden">Trao đổi ngay</span>
            <span className="wrap-text l1 hover">Trao đổi ngay</span>
            <span className="btn-hover-bg"></span>
          </a>
          <a className="btn btn-more" id="svMore" href="/tu-van-thiet-ke-concept-song-anh">
            <span className="wrap-text l1 hidden">Chi tiết</span>
            <span className="wrap-text l1 hover">Chi tiết</span>
            <span className="btn-hover-bg"></span>
          </a>
        </div>
      </div>
    </div>
    <div className="slider-images" id="svImages">
      <div className="sv-slide" data-url="/tu-van-thiet-ke-concept-song-anh"><div className="parallax-wrapper"><img className="inner-img" src="/img/svc-concept.jpg" alt="Thiết kế concept" loading="lazy" /></div></div>
      <div className="sv-slide" data-url="/tu-van-thiet-ke-kien-truc-song-anh"><div className="parallax-wrapper"><img className="inner-img" src="/img/svc-kientruc.jpg" alt="Thiết kế kiến trúc" loading="lazy" /></div></div>
      <div className="sv-slide" data-url="/dich-vu-thiet-ke-ket-cau-song-anh"><div className="parallax-wrapper"><img className="inner-img" src="/img/svc-ketcau.jpg" alt="Thiết kế kết cấu" loading="lazy" /></div></div>
      <div className="sv-slide" data-url="/tu-van-thiet-ke-co-dien-mepf"><div className="parallax-wrapper"><img className="inner-img" src="/img/svc-codien.jpg" alt="Thiết kế cơ điện MEPF" loading="lazy" /></div></div>
      <div className="sv-slide" data-url="/thiet-ke-canh-quan-song-anh"><div className="parallax-wrapper"><img className="inner-img" src="/img/svc-canhquan.jpg" alt="Thiết kế cảnh quan" loading="lazy" /></div></div>
      <div className="sv-slide" data-url="/lap-tong-du-toan-va-quan-ly-chi-phi-du-an"><div className="parallax-wrapper"><img className="inner-img" src="/img/svc-dutoan.jpg" alt="Lập dự toán và quản lý chi phí" loading="lazy" /></div></div>
    </div>
  </section>

  
  <div className="anim-image-place">
    <div className="image-sticky" aria-hidden="true">
      <div className="perspective-image">
        <div className="card-wrap">
          <div className="card-face front"><img className="inner-img" src="/img/card-front.jpg" alt="" /></div>
          <div className="card-face back"><img className="inner-img" src="/img/card-back.jpg" alt="" /></div>
        </div>
      </div>
    </div>

    <section className="why-choose" id="why" data-ui="white">
      <div className="bg"><img className="inner-img" src="/img/bg-nghi-duong.webp" alt="" loading="lazy" /></div>
      <p className="sub-title l1" data-reveal="fade">Vì sao chủ đầu tư chọn Song Anh?</p>
      <p className="title d1" data-split="" data-reveal="">Một đầu mối,<br />đa bộ môn,<br />BIM xuyên suốt</p>
      <ul className="benefits">
        <li className="benefit-item" data-reveal="fade"><p className="benefit-title l1-t">Concept rõ ràng</p><p className="benefit-description l1">Định hướng ngay từ giai đoạn đầu, khi phương án còn linh hoạt.</p></li>
        <li className="benefit-item" data-reveal="fade"><p className="benefit-title l1-t">Nhất quán</p><p className="benefit-description l1">Giữ ý đồ thiết kế xuyên suốt từ phát triển đến triển khai hồ sơ.</p></li>
        <li className="benefit-item" data-reveal="fade"><p className="benefit-title l1-t">Gắn với vận hành</p><p className="benefit-description l1">Tích hợp sớm yêu cầu của đơn vị vận hành quốc tế cho khách sạn, nghỉ dưỡng.</p></li>
        <li className="benefit-item" data-reveal="fade"><p className="benefit-title l1-t">Phối hợp tốt hơn</p><p className="benefit-description l1">Thiết kế và kỹ thuật được đánh giá đồng thời về công năng, thẩm mỹ, khả năng thi công.</p></li>
        <li className="benefit-item" data-reveal="fade"><p className="benefit-title l1-t">BIM xuyên suốt</p><p className="benefit-description l1">Phát hiện sớm xung đột, rút ngắn thời gian thiết kế, bảo đảm chất lượng hồ sơ.</p></li>
      </ul>
    </section>

    <section className="ticker" data-ui="black" aria-label="Đối tác và chủ đầu tư">
      <div className="wrapper">
        <div className="ticker-line">
          <img className="ticker-item" src="/img/logo-datxanh.webp" alt="Đất Xanh Group" loading="lazy" />
          <img className="ticker-item" src="/img/logo-novaland.webp" alt="Novaland" loading="lazy" />
          <img className="ticker-item" src="/img/logo-namlong.webp" alt="Nam Long" loading="lazy" />
          <img className="ticker-item" src="/img/logo-vingroup.webp" alt="Vingroup" loading="lazy" />
          <img className="ticker-item" src="/img/logo-hungthinh.webp" alt="Hưng Thịnh" loading="lazy" />
          <img className="ticker-item" src="/img/logo-datxanh.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-novaland.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-namlong.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-vingroup.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-hungthinh.webp" alt="" loading="lazy" />
        </div>
        <div className="ticker-line" aria-hidden="true">
          <img className="ticker-item" src="/img/logo-datxanh.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-novaland.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-namlong.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-vingroup.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-hungthinh.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-datxanh.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-novaland.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-namlong.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-vingroup.webp" alt="" loading="lazy" />
          <img className="ticker-item" src="/img/logo-hungthinh.webp" alt="" loading="lazy" />
        </div>
      </div>
    </section>

    <section className="investment-funds" id="partnership" data-ui="black">
      <div className="sticky-content">
        <p className="sub-title l1-t">Đối tác &amp; chủ đầu tư</p>
        <h3 className="title h1-t" data-split="" data-reveal="">Đồng hành cùng các chủ đầu tư hàng đầu trên khắp Việt Nam</h3>
        <div className="bottom-part">
          <p className="desc l1">Song Anh đồng hành từ thiết kế concept đến triển khai hồ sơ, với vai trò tổng thầu thiết kế đa bộ môn.<br /><br />Sự phối hợp chặt chẽ giữa các bộ môn trên mô hình BIM giúp phát hiện sớm xung đột, rút ngắn thời gian thiết kế và bảo đảm chất lượng hồ sơ.</p>
          <a className="btn" href="#contact" data-scroll="">
            <span className="wrap-text l1 hidden">Trao đổi ngay</span>
            <span className="wrap-text l1 hover">Trao đổi ngay</span>
            <span className="btn-hover-bg"></span>
          </a>
        </div>
      </div>
      <div className="scroller-content">
        <p className="h1 net-title" data-split="" data-reveal=""><i>Đồng hành</i><br />[Đối tác]</p>
        <div className="right info-wrap" data-reveal="fade">
          <p className="h1">Tổng thầu</p>
          <p className="info-text l1">Một đầu mối chịu trách nhiệm hồ sơ kiến trúc, kết cấu, cơ điện &amp; PCCC, cảnh quan và hạ tầng.</p>
        </div>
        <div className="info-wrap" data-reveal="fade">
          <p className="h1">780 ha</p>
          <p className="info-text l1">Đồ án quy hoạch lớn nhất trong kinh nghiệm của Giám đốc Thiết kế Song Anh</p>
        </div>
        <div className="right info-wrap" data-reveal="fade">
          <p className="h1">Đối tác</p>
          <p className="info-text l1">Đất Xanh Group, Novaland, Nam Long, Vingroup, Hưng Thịnh, TTC Group, Kim Oanh Group, BEE Group, CC1, Gia Định Group, Charm Group</p>
        </div>
      </div>
    </section>
  </div>

  
  {news}

  <div className="team-contact">
    <section className="team-slider" id="team" data-ui="white" data-ui-right="black">
      <div className="slider-part left">
        <div className="team-bg">
          <img className="active" src="/img/teambg-david.jpg" alt="" loading="lazy" />
          <img src="/img/teambg-team.jpg" alt="" loading="lazy" />
          <img src="/img/teambg-bim.jpg" alt="" loading="lazy" />
        </div>
        <button className="btn-change-slide prev l1" id="teamPrev">Trước</button>
        <div className="team-names">
          <p className="person-name h1" data-split="">David Leschinski Ivanov</p>
          <p className="person-name h1" data-split="">Đội ngũ Song Anh</p>
          <p className="person-name h1" data-split="">Phối hợp đa bộ môn</p>
        </div>
      </div>
      <div className="slider-part right">
        <button className="btn-change-slide next l1" id="teamNext">Tiếp</button>
        <div className="person-slider">
          <img className="active" src="/img/portrait-david.jpg" alt="David Leschinski Ivanov — Giám đốc Thiết kế Song Anh" loading="lazy" />
          <img src="/img/portrait-team.jpg" alt="Đội ngũ kiến trúc sư và kỹ sư Song Anh" loading="lazy" />
          <img src="/img/portrait-bim.jpg" alt="Buổi kick-off dự án của Song Anh" loading="lazy" />
        </div>
        <div className="details-slides">
          <div className="wrap-detail active"><p className="l1-t">Giám đốc Thiết kế | Design Director</p><p className="l1">Hơn 15 năm kinh nghiệm quốc tế về kiến trúc và quản lý thiết kế tại Tây Ban Nha, Việt Nam, Campuchia và Thái Lan.</p></div>
          <div className="wrap-detail"><p className="l1-t">Kiến trúc sư · Kỹ sư · BIM</p><p className="l1">Đội ngũ kiến trúc sư, kỹ sư kết cấu, cơ điện và chuyên viên BIM giàu kinh nghiệm, tổ chức chuyên môn hóa theo bộ môn.</p></div>
          <div className="wrap-detail"><p className="l1-t">Quy trình BIM</p><p className="l1">Các bộ môn phối hợp trên cùng mô hình BIM để phát hiện sớm xung đột, rút ngắn thời gian thiết kế và bảo đảm chất lượng hồ sơ.</p></div>
        </div>
        <a className="team-more l1" href="/david-leschinski-ivanov-design-director-song-anh"><span className="wrap" data-text="Xem hồ sơ lãnh đạo"><span>Xem hồ sơ lãnh đạo</span></span></a>
      </div>
      <div className="right-decor-plash"></div>
    </section>
    <div className="contact-reveal-pause" aria-hidden="true" data-ui="black" data-ui-start="top top"></div>
    <section className="contact" id="contact" data-ui="black">
      <h2 className="title d1" data-split="" data-reveal="">Sẵn sàng kiến tạo<br />công trình<br />của bạn?</h2>
      <p className="sub-title l1">Chuyên viên Song Anh sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
      {contactForm}
    </section>
  </div>

  
  <section className="locations" id="locations" data-ui="white">
    <div className="loc-sticky">
      <div className="bg" id="locBg">
        <img className="active" src="/img/bg-thap-trang.webp" alt="" loading="lazy" />
        <img src="/img/nen-thapvensong.webp" alt="" loading="lazy" />
      </div>
      <div className="wrap-content">
        <ul className="tabs l1" role="tablist">
          <li><button className="tab active" role="tab" aria-selected="true" data-idx="0"><span className="wrap" data-text="TP. Hồ Chí Minh"><span>TP. Hồ Chí Minh</span></span></button></li>
          <li><button className="tab" role="tab" aria-selected="false" data-idx="1"><span className="wrap" data-text="Việt Nam"><span>Việt Nam</span></span></button></li>
        </ul>
        <div className="titles-place">
          <p className="slide-title h1" data-split="">Văn phòng tại<br />tòa nhà Park IX</p>
          <p className="slide-title h1" data-split="">Dự án trải dài khắp Việt Nam</p>
        </div>
        <a className="btn btn-show-map" id="locBtn" href="https://maps.app.goo.gl/vsTJRApc5BNmztfd6" target="_blank" rel="noopener">
          <span className="wrap-text l1 hidden js-loc-label">Xem bản đồ</span>
          <span className="wrap-text l1 hover js-loc-label">Xem bản đồ</span>
          <span className="btn-hover-bg"></span>
        </a>
      </div>
      <div className="description-slides-wrap">
        <div className="description-slide active">
          <p className="l1-t small-title">Park IX</p>
          <p className="l1">Trụ sở Song Anh tại Tòa nhà Park IX, 08 Phan Đình Giót, P. Tân Sơn Hòa, TP.HCM — nơi đội ngũ kiến trúc sư, kỹ sư và chuyên viên BIM cùng chủ đầu tư kiến tạo những công trình giá trị.</p>
        </div>
        <div className="description-slide">
          <p className="l1-t small-title">Hải Phòng → Phú Quốc</p>
          <p className="l1">Từ Hải Phòng, Quảng Bình, Đà Nẵng đến TP.HCM và Phú Quốc — Song Anh đồng hành cùng chủ đầu tư tại các dự án chung cư, nhà ở xã hội, khách sạn và khu nghỉ dưỡng.</p>
        </div>
      </div>
      <div className="images-wrap" id="locImages">
        <div className="image-wrap"><img className="inner-img" src="/img/loc-1.jpg" alt="" loading="lazy" /></div>
        <div className="image-wrap"><img className="inner-img" src="/img/loc-2.jpg" alt="" loading="lazy" /></div>
        <div className="image-wrap"><img className="inner-img" src="/img/loc-3.jpg" alt="" loading="lazy" /></div>
        <div className="image-wrap"><img className="inner-img" src="/img/loc-4.jpg" alt="" loading="lazy" /></div>
      </div>
    </div>
    <div className="anim-plash" aria-hidden="true"></div>
  </section>

  
  {footer}
</main>
<div className="case-modal" id="caseModal" role="dialog" aria-modal="true" aria-labelledby="cmTitle" aria-hidden="true">
  <div className="cm-bg"><img className="inner-img" id="cmImg" src="" alt="" /></div>
  <div className="cm-overlay"></div>
  <button className="cm-close l1" id="cmClose"><span className="wrap" data-text="Đóng ✕"><span>Đóng ✕</span></span></button>
  <p className="cm-big" id="cmBig" aria-hidden="true"></p>
  <div className="cm-content">
    <p className="l1-t cm-counter" id="cmCounter">001</p>
    <h3 className="h1 cm-title" id="cmTitle"></h3>
    <p className="l1 cm-meta"><span className="l1-t">Chủ đầu tư</span><span id="cmClient"></span></p>
    <p className="l1 cm-meta"><span className="l1-t">Địa điểm</span><span id="cmLoc"></span></p>
    <p className="l1 cm-meta"><span className="l1-t">Quy mô</span><span id="cmScale"></span></p>
    <div className="cm-actions">
      <button className="btn btn-round light" id="cmPrev" aria-label="Dự án trước">
        <span className="wrap-icon hidden"><svg className="arrow to-left" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg></span>
        <span className="wrap-icon hover"><svg className="arrow to-left" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg></span>
        <span className="btn-hover-bg"></span>
      </button>
      <button className="btn btn-round light" id="cmNext" aria-label="Dự án tiếp theo">
        <span className="wrap-icon hidden"><svg className="arrow" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg></span>
        <span className="wrap-icon hover"><svg className="arrow" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg></span>
        <span className="btn-hover-bg"></span>
      </button>
      <a className="btn light" id="cmLink" href="/project">
        <span className="wrap-text l1 hidden">Xem chi tiết dự án</span>
        <span className="wrap-text l1 hover">Xem chi tiết dự án</span>
        <span className="btn-hover-bg"></span>
      </a>
    </div>
  </div>
</div>
    </>
  )
}
