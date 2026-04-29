# 📐 BLUEPRINT: Rebuild Affiliate Coupon Cluster Site — Chuẩn SEO

> Tài liệu này mô tả chi tiết toàn bộ cấu trúc, component, pattern và code
> để bạn build lại một site tương tự từ đầu, chuẩn SEO hơn bản gốc.

---

## MỤC LỤC

1. [Tổng quan kiến trúc](#1-tổng-quan-kiến-trúc)
2. [Cấu trúc thư mục chuẩn](#2-cấu-trúc-thư-mục-chuẩn)
3. [Template HTML chuẩn SEO (dùng cho mọi trang)](#3-template-html-chuẩn-seo)
4. [CSS — Toàn bộ design system](#4-css--design-system)
5. [JavaScript — site.js chuẩn](#5-javascript--sitejs)
6. [Từng trang: nội dung & cấu trúc HTML](#6-từng-trang-nội-dung--html)
7. [sitemap.xml](#7-sitemapxml)
8. [robots.txt](#8-robotstxt)
9. [Checklist SEO khi code](#9-checklist-seo-khi-code)

---

## 1. Tổng quan kiến trúc

### Loại site
- **Static HTML** — không backend, không database
- **GitHub Pages** hosting (hoặc Netlify/Cloudflare Pages)
- **Topic Cluster**: 1 homepage + nhiều money pages + blog posts

### Mô hình kinh doanh
Affiliate site: User click link → mua sản phẩm → site nhận hoa hồng.

### Cấu trúc nội dung (Content Cluster Model)
```
Homepage (Pillar Page)
├── /review/          → Review intent ("is it worth it?")
├── /pricing/         → Pricing intent ("how much does it cost?")
├── /alternatives/    → Comparison intent ("vs competitors")
├── /offers/          → Transactional intent ("buy now / coupon")
├── /blog/            → Blog archive (informational hub)
│   ├── /blog/coupon-guide/        → "how to use coupon"
│   ├── /blog/setup-guide/         → "how to set up"
│   └── /blog/use-cases-guide/     → "best use cases"
├── /disclosure/      → Legal: affiliate disclosure
└── /privacy/         → Legal: privacy policy
```

### Nguyên tắc URL
- Mỗi trang nằm trong thư mục riêng với file `index.html`
- URL clean: `/review/` thay vì `/review.html`
- Không dùng query string, không dùng underscore

---

## 2. Cấu trúc thư mục chuẩn

```
your-site/
├── index.html                    ← Homepage
├── sitemap.xml                   ← PHẢI CÓ
├── robots.txt                    ← PHẢI CÓ
├── assets/
│   ├── styles.css
│   ├── site.js
│   └── images/
│       ├── hero-image.webp       ← Dùng .webp, max ~100KB
│       ├── feature-1.webp
│       └── feature-2.webp
├── review/
│   └── index.html
├── pricing/
│   └── index.html
├── alternatives/
│   └── index.html
├── offers/
│   └── index.html
├── blog/
│   ├── index.html
│   ├── coupon-guide/
│   │   └── index.html
│   ├── setup-guide/
│   │   └── index.html
│   └── use-cases-guide/
│       └── index.html
├── disclosure/
│   └── index.html
└── privacy/
    └── index.html
```

---

## 3. Template HTML chuẩn SEO

> Đây là template HEAD chuẩn, dùng cho TẤT CẢ trang.
> Thay các biến `{{...}}` theo từng trang.

```html
<!DOCTYPE html>
<html lang="vi" data-root="{{ROOT_PATH}}" data-page="{{PAGE_KEY}}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- ====== SEO CORE ====== -->
  <title>{{TITLE}}</title>
  <meta name="description" content="{{DESCRIPTION}}" />
  <link rel="canonical" href="{{CANONICAL_URL}}" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="{{SITE_NAME}}" />

  <!-- ====== OPEN GRAPH (Social Sharing) ====== -->
  <meta property="og:type" content="{{OG_TYPE}}" />
  <!-- og:type: "website" cho homepage, "article" cho blog posts -->
  <meta property="og:title" content="{{OG_TITLE}}" />
  <meta property="og:description" content="{{OG_DESCRIPTION}}" />
  <meta property="og:url" content="{{CANONICAL_URL}}" />
  <meta property="og:image" content="{{SITE_DOMAIN}}/assets/images/og-image.webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="{{SITE_NAME}}" />
  <meta property="og:locale" content="vi_VN" />

  <!-- ====== TWITTER CARD ====== -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{{OG_TITLE}}" />
  <meta name="twitter:description" content="{{OG_DESCRIPTION}}" />
  <meta name="twitter:image" content="{{SITE_DOMAIN}}/assets/images/og-image.webp" />

  <!-- ====== GOOGLE FONTS (KHÔNG dùng @import trong CSS) ====== -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap"
  />

  <!-- ====== STYLES ====== -->
  <link rel="stylesheet" href="{{ROOT_PATH}}/assets/styles.css" />

  <!-- ====== SCHEMA.ORG (Thay đổi theo từng trang) ====== -->
  <script type="application/ld+json">
  {{SCHEMA_JSON}}
  </script>

  <!-- ====== JS (defer = không block render) ====== -->
  <script defer src="{{ROOT_PATH}}/assets/site.js"></script>
</head>
<body>
  <div class="site-shell">

    <!-- HEADER: Viết trực tiếp vào HTML, KHÔNG inject bằng JS -->
    <header class="site-header">
      <div class="wrap header-inner">
        <a class="brand" href="{{ROOT_PATH}}/index.html">
          <span>{{BRAND_NAME}}</span>
        </a>
        <button class="menu-toggle" type="button"
          aria-expanded="false" aria-controls="site-nav"
          aria-label="Toggle navigation">
          Menu
        </button>
        <div class="nav-row">
          <nav aria-label="Primary navigation">
            <ul class="nav-list" id="site-nav">
              <li><a href="{{ROOT_PATH}}/index.html" class="{{active if home}}">Trang chủ</a></li>
              <li><a href="{{ROOT_PATH}}/review/index.html" class="{{active if review}}">Review</a></li>
              <li><a href="{{ROOT_PATH}}/pricing/index.html" class="{{active if pricing}}">Bảng giá</a></li>
              <li><a href="{{ROOT_PATH}}/alternatives/index.html" class="{{active if alternatives}}">So sánh</a></li>
              <li><a href="{{ROOT_PATH}}/offers/index.html" class="{{active if offers}}">Ưu đãi</a></li>
              <li><a href="{{ROOT_PATH}}/blog/index.html" class="{{active if blog}}">Blog</a></li>
            </ul>
          </nav>
          <a class="nav-cta"
            href="https://example.com/?ref=YOURCODE"
            target="_blank"
            rel="noopener noreferrer sponsored">
            Mua ngay
          </a>
        </div>
      </div>
    </header>

    <main>
      <!-- NỘI DUNG TỪNG TRANG Ở ĐÂY -->
    </main>

    <!-- FOOTER: Viết trực tiếp vào HTML, KHÔNG inject bằng JS -->
    <footer class="site-footer">
      <div class="wrap footer-panel">
        <div class="footer-grid">
          <div>
            <h3>{{SITE_NAME}}</h3>
            <p>Mô tả ngắn về site.</p>
          </div>
          <div>
            <h3>Trang chính</h3>
            <ul class="footer-links">
              <li><a href="{{ROOT_PATH}}/index.html">Trang chủ</a></li>
              <li><a href="{{ROOT_PATH}}/review/index.html">Review</a></li>
              <li><a href="{{ROOT_PATH}}/pricing/index.html">Bảng giá</a></li>
              <li><a href="{{ROOT_PATH}}/alternatives/index.html">So sánh</a></li>
              <li><a href="{{ROOT_PATH}}/offers/index.html">Ưu đãi</a></li>
            </ul>
          </div>
          <div>
            <h3>Bài viết & Pháp lý</h3>
            <ul class="footer-links">
              <li><a href="{{ROOT_PATH}}/blog/index.html">Blog</a></li>
              <li><a href="{{ROOT_PATH}}/disclosure/index.html">Disclosure</a></li>
              <li><a href="{{ROOT_PATH}}/privacy/index.html">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-note">
          Website này chứa affiliate links. Xem <a href="{{ROOT_PATH}}/disclosure/index.html">Affiliate Disclosure</a>.
        </div>
      </div>
    </footer>

  </div><!-- /.site-shell -->
</body>
</html>
```

---

### Schema.org theo từng loại trang

**Homepage → FAQPage:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Câu hỏi 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trả lời câu hỏi 1."
      }
    }
  ]
}
```

**Review page → Review:**
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "name": "Tên sản phẩm Review 2026",
  "author": { "@type": "Organization", "name": "{{SITE_NAME}}" },
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": "Tên sản phẩm",
    "applicationCategory": "BusinessApplication",
    "url": "https://example.com"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.2",
    "bestRating": "5"
  },
  "reviewBody": "Mô tả ngắn về đánh giá."
}
```

**Blog post → Article:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{TITLE}}",
  "description": "{{DESCRIPTION}}",
  "author": { "@type": "Organization", "name": "{{SITE_NAME}}" },
  "publisher": {
    "@type": "Organization",
    "name": "{{SITE_NAME}}",
    "url": "{{SITE_DOMAIN}}"
  },
  "datePublished": "2026-01-01",
  "dateModified": "2026-04-01"
}
```

**Breadcrumb (thêm vào MỌI trang trừ homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang chủ",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Review",
      "item": "https://example.com/review/"
    }
  ]
}
```

---

## 4. CSS — Design System

> Paste toàn bộ CSS này vào `assets/styles.css`.
> XÓA dòng `@import` Google Fonts — font đã load qua `<link>` trong HTML.

```css
/* ======================================================
   DESIGN SYSTEM — CSS VARIABLES
====================================================== */
:root {
  --bg: #f6f8fd;
  --bg-soft: #edf3ff;
  --surface: #ffffff;
  --surface-alt: #f8fbff;
  --surface-strong: #e7efff;
  --ink: #0f172a;
  --muted: #4a5a78;
  --line: #dbe5f4;
  --brand: #145df6;
  --brand-strong: #0d47c7;
  --brand-soft: #eef4ff;
  --accent: #53a2ff;
  --nav-bg: rgba(255, 255, 255, 0.92);
  --shadow-sm: 0 10px 30px rgba(15, 23, 42, 0.06);
  --shadow: 0 18px 60px rgba(20, 93, 246, 0.12);
  --shadow-lg: 0 24px 70px rgba(15, 23, 42, 0.14);
  --radius-sm: 14px;
  --radius: 20px;
  --radius-lg: 28px;
  --content: 1080px;
}

/* ======================================================
   RESET & BASE
====================================================== */
*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  font-family: "Sora", sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at top right, rgba(20, 93, 246, 0.08), transparent 28%),
    radial-gradient(circle at bottom left, rgba(83, 162, 255, 0.1), transparent 32%),
    linear-gradient(180deg, #fcfdff 0%, var(--bg) 100%);
  line-height: 1.72;
  overflow-x: hidden;
}

a { color: var(--brand); text-decoration: none; }
a:hover { color: var(--brand-strong); }
img { max-width: 100%; display: block; }
main { position: relative; }
.site-shell { min-height: 100vh; }

/* ======================================================
   LAYOUT — WRAP & GRIDS
====================================================== */
.wrap {
  width: min(calc(100% - 2rem), var(--content));
  margin: 0 auto;
}

/* 2 cột: main content + sidebar */
.hero-grid,
.split {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(290px, 0.75fr);
  gap: 1.5rem;
  align-items: start;
}

.cards-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.cards-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.deal-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.blog-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.media-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.media-grid.two-up { grid-template-columns: 1fr; }

.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1.25rem;
}

section { padding: 1.3rem 0; }

/* ======================================================
   HEADER & NAVIGATION
====================================================== */
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.07);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 62px;
  padding: 0.65rem 0;
}

.brand {
  display: inline-flex;
  align-items: center;
  color: var(--ink);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.brand strong { color: var(--brand); }

.menu-toggle {
  display: none;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  border-radius: 999px;
  padding: 0.75rem 1rem;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}

.nav-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 600;
  transition: background 0.18s ease, color 0.18s ease;
}

.nav-list a:hover,
.nav-list a.active {
  background: var(--brand-soft);
  color: var(--brand);
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--brand), var(--brand-strong));
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 8px 26px rgba(20, 93, 246, 0.28);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.nav-cta:hover {
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 14px 34px rgba(20, 93, 246, 0.34);
}

/* ======================================================
   TYPOGRAPHY
====================================================== */
h1, h2, h3 {
  line-height: 1.14;
  letter-spacing: -0.03em;
  margin: 0 0 0.8rem;
}

h1 { font-size: clamp(2.15rem, 5vw, 3.75rem); max-width: 12ch; }
h2, .section-title { font-size: clamp(1.5rem, 3vw, 2.18rem); }
h3 { font-size: 1.08rem; }
p, li, td, th { font-size: 0.96rem; }
p { margin: 0 0 1rem; color: var(--ink); }
li { color: var(--ink); }
.lede { font-size: 1.02rem; color: var(--muted); max-width: 68ch; }
.muted { color: var(--muted); }
.small { font-size: 0.84rem; }

/* ======================================================
   HERO SECTION
====================================================== */
.hero { padding: 3.3rem 0 2.2rem; }

/* Card nền cho hero content */
.hero-grid > div:first-child,
.hero .wrap:not(.hero-grid) {
  background: linear-gradient(135deg, #ffffff 0%, #f5f9ff 50%, #edf4ff 100%);
  border: 1px solid rgba(20, 93, 246, 0.12);
  border-radius: var(--radius-lg);
  padding: 2.2rem;
  box-shadow: var(--shadow);
  overflow: hidden;
  position: relative;
}

/* Decorative blobs */
.hero-grid > div:first-child::before,
.hero .wrap:not(.hero-grid)::before {
  content: "";
  position: absolute;
  top: -86px; right: -86px;
  width: 260px; height: 260px;
  background: radial-gradient(circle, rgba(20, 93, 246, 0.14) 0%, transparent 70%);
  pointer-events: none;
}

.hero-grid > div:first-child::after,
.hero .wrap:not(.hero-grid)::after {
  content: "";
  position: absolute;
  bottom: -70px; left: -50px;
  width: 220px; height: 220px;
  background: radial-gradient(circle, rgba(83, 162, 255, 0.12) 0%, transparent 72%);
  pointer-events: none;
}

/* ======================================================
   COMPONENTS
====================================================== */

/* --- Eyebrow label --- */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.78rem;
  border-radius: 999px;
  background: var(--brand-soft);
  border: 1px solid rgba(20, 93, 246, 0.14);
  color: var(--brand-strong);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.eyebrow::before {
  content: "";
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--brand);
  box-shadow: 0 0 0 5px rgba(20, 93, 246, 0.1);
}

/* --- Tags --- */
.tag-row { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(20, 93, 246, 0.12);
  color: var(--brand-strong);
  font-size: 0.76rem;
  font-weight: 600;
}

/* --- Buttons --- */
.button,
.button-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 46px;
  padding: 0.8rem 1.2rem;
  border-radius: 14px;
  border: 1px solid transparent;
  background: linear-gradient(135deg, var(--brand), var(--brand-strong));
  color: #fff;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(20, 93, 246, 0.28);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.button:hover,
.button-link:hover {
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 16px 38px rgba(20, 93, 246, 0.35);
}

.button.alt {
  background: #fff;
  color: var(--brand);
  border-color: rgba(20, 93, 246, 0.18);
  box-shadow: none;
}

.button.alt:hover {
  background: var(--brand-soft);
  color: var(--brand-strong);
}

/* --- Cards --- */
.card,
.panel,
.coupon-box,
.faq-item,
.deal-box,
.table-wrap {
  background: var(--surface);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}

.card, .panel, .table-wrap { padding: 1.35rem; }

.faq-item, .deal-box { padding: 1.25rem; }

.coupon-box {
  padding: 1.45rem;
  background: linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%);
  border-color: rgba(20, 93, 246, 0.12);
  box-shadow: var(--shadow);
}

.card:hover, .panel:hover, .faq-item:hover, .deal-box:hover {
  transform: translateY(-3px);
  border-color: rgba(20, 93, 246, 0.16);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.1);
}

/* --- Coupon code display --- */
.coupon-code {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 64px;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  background: #fff;
  border: 1px dashed rgba(20, 93, 246, 0.28);
  color: var(--brand);
  font-family: "DM Mono", monospace;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.12em;
}

/* --- Metrics row --- */
.metric {
  padding: 0.95rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #f3f8ff, #ecf3ff);
  border: 1px solid rgba(20, 93, 246, 0.08);
}
.metric strong {
  display: block;
  margin-bottom: 0.28rem;
  font-size: 1.25rem;
  color: var(--brand);
}

/* --- List (clean, no bullet, custom dot) --- */
.list-clean { list-style: none; padding: 0; margin: 0; }
.list-clean li { position: relative; padding-left: 1.1rem; }
.list-clean li::before {
  content: "";
  position: absolute;
  left: 0; top: 0.6rem;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--brand);
}
.list-clean li + li { margin-top: 0.78rem; }

/* --- Table --- */
.table-wrap { overflow-x: auto; }
.table { width: 100%; min-width: 640px; border-collapse: collapse; }
.table th, .table td {
  padding: 0.95rem 0.85rem;
  text-align: left;
  border-bottom: 1px solid var(--line);
  vertical-align: top;
}
.table th {
  background: linear-gradient(135deg, var(--brand), var(--brand-strong));
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.table td:first-child { font-weight: 700; }

/* --- FAQ list --- */
.faq-list { display: grid; gap: 1rem; }

/* --- Deal box --- */
.deal-box p { margin-bottom: 0; }
.deal-box hr { border: 0; border-top: 1px solid var(--line); margin: 0.9rem 0 0; }

/* --- Media card (images) --- */
.media-card {
  background: var(--surface);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.media-card img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
.media-card figcaption { display: none; }
/* NOTE: Vẫn viết figcaption trong HTML để screen reader và SEO đọc được */

/* --- Breadcrumbs --- */
.breadcrumbs { font-size: 0.85rem; color: var(--muted); padding-top: 1.1rem; }
.breadcrumbs a { color: var(--muted); }
.breadcrumbs a:hover { color: var(--brand); }

/* ======================================================
   FOOTER
====================================================== */
.site-footer { margin-top: 2.5rem; padding: 0 0 3rem; }

.footer-panel {
  background: linear-gradient(135deg, #0f49cf 0%, #145df6 55%, #2a7dff 100%);
  color: #fff;
  border-radius: 28px;
  padding: 2.2rem;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  position: relative;
}

.footer-panel::before {
  content: "";
  position: absolute;
  top: -50px; right: -50px;
  width: 200px; height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}

.footer-panel::after {
  content: "";
  position: absolute;
  bottom: -70px; left: -20px;
  width: 220px; height: 220px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}

.footer-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 1.5rem;
}

.footer-panel h3, .footer-panel p,
.footer-panel a, .footer-panel li { color: #fff; }
.footer-panel p { opacity: 0.88; }

.footer-links { list-style: none; padding: 0; margin: 0; }
.footer-links li + li { margin-top: 0.52rem; }
.footer-links a { opacity: 0.92; }
.footer-links a:hover { opacity: 1; }

.footer-note {
  position: relative;
  z-index: 1;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 0.8rem;
  line-height: 1.7;
  opacity: 0.88;
}

/* ======================================================
   STANDARD LIST BULLETS (cho <ul> thường)
====================================================== */
ul:not(.list-clean):not(.nav-list):not(.footer-links) {
  margin: 0 0 1rem;
  padding-left: 1.15rem;
}
ul:not(.list-clean):not(.nav-list):not(.footer-links) li + li {
  margin-top: 0.52rem;
}

/* ======================================================
   RESPONSIVE — MOBILE BREAKPOINT
====================================================== */
@media (max-width: 920px) {
  .hero-grid, .split, .cards-2, .cards-3,
  .deal-grid, .blog-grid, .media-grid,
  .metrics, .footer-grid {
    grid-template-columns: 1fr;
  }

  .menu-toggle { display: inline-flex; }

  .nav-row {
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-list {
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    padding-top: 0.75rem;
  }

  .nav-list a, .nav-cta {
    width: 100%;
    justify-content: center;
  }

  .nav-list.open { display: flex; }

  .header-inner {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-grid > div:first-child,
  .hero .wrap:not(.hero-grid),
  .coupon-box { padding: 1.5rem; }

  h1 { max-width: none; }
}
```

---

## 5. JavaScript — site.js

> JavaScript CHỈ làm 3 việc: mobile menu toggle, copy coupon, active nav link.
> Header/Footer KHÔNG inject bằng JS nữa — đã viết thẳng vào HTML.

```javascript
// ======================================================
// site.js — Minimal, no framework
// ======================================================

// 1. Mobile menu toggle
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-list");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Đóng menu khi click ra ngoài
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// 2. Copy coupon button
document.querySelectorAll("[data-copy-coupon]").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.dataset.couponCode || "YOURCODE";
    try {
      await navigator.clipboard.writeText(code);
      const original = button.textContent;
      button.textContent = "✓ Đã copy!";
      setTimeout(() => { button.textContent = original; }, 2000);
    } catch {
      button.textContent = "Dùng code: " + code;
    }
  });
});

// 3. Highlight active nav link dựa trên URL hiện tại
const currentPath = window.location.pathname;
document.querySelectorAll(".nav-list a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href && currentPath.includes(href.replace("index.html", "").replace(/^\.+\//, ""))) {
    link.classList.add("active");
  }
});
```

**Cách dùng copy coupon button:**
```html
<!-- data-coupon-code chứa mã coupon -->
<button class="button alt" type="button"
  data-copy-coupon
  data-coupon-code="YOURCODE">
  Copy YOURCODE
</button>
```

---

## 6. Từng trang: Nội dung & HTML

---

### 📄 TRANG 1: Homepage (`/index.html`)

**Mục tiêu SEO:** Brand awareness + Coupon intent + Pillar page cho cluster  
**Keywords chính:** "[Sản phẩm] coupon", "[Sản phẩm] discount", "[Sản phẩm] review"  
**Schema:** FAQPage

**Cấu trúc nội dung theo thứ tự:**

```
1. [HERO] — H1 + lede + tags + CTA buttons
   Sidebar: Coupon box (mã code + metrics)

2. [IMAGE] — Screenshot sản phẩm (hero image)

3. [CARDS-3] — 3 cards giới thiệu: "Sản phẩm là gì / Dành cho ai / Tại sao site này"

4. [SPLIT] — Giải thích sâu về sản phẩm
   Sidebar: Related pages (internal links đến các trang trong cluster)

5. [SECTION] — "Tại sao sản phẩm được đánh giá cao?"
   → 2-3 đoạn văn giải thích positioning của sản phẩm

6. [SECTION] — "Top Use Cases"
   → Grid 6 cards, mỗi card = 1 use case (H3 + mô tả)

7. [SECTION] — "Tính năng nổi bật"
   → Grid cards-2, mỗi card = 1 feature (H3 + mô tả)

8. [IMAGE] — Screenshot feature thứ 2

9. [SPLIT + TABLE] — Bảng so sánh nhanh "Câu hỏi buyer / Trang tốt nhất"
   Sidebar: FAQ snapshot (bullets)

10. [SECTION] — Phân tích competitor ngắn gọn (3 đoạn văn)

11. [FAQ SECTION] — 5 câu hỏi thường gặp (Schema FAQPage)
    → Dùng <article class="faq-item"> với H3 cho từng câu hỏi
```

**HTML pattern quan trọng:**
```html
<!-- HERO -->
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <span class="eyebrow">Tên cluster / Tagline</span>
      <h1>Tiêu đề chính với keyword — Ngắn, mạnh, rõ</h1>
      <p class="lede">Mô tả 1-2 câu, giải thích trang này làm gì.</p>
      <p>Đoạn văn mở rộng 1...</p>
      <p>Đoạn văn mở rộng 2...</p>
      <div class="tag-row">
        <span class="tag">Tag 1</span>
        <span class="tag">Tag 2</span>
        <span class="tag">Tag 3</span>
      </div>
      <p style="margin-top: 1.2rem">
        <a class="button-link"
          href="https://example.com/?ref=CODE"
          target="_blank"
          rel="noopener noreferrer sponsored">
          Xem ưu đãi
        </a>
        <button class="button alt" type="button"
          data-copy-coupon data-coupon-code="YOURCODE">
          Copy YOURCODE
        </button>
      </p>
    </div>

    <aside class="coupon-box">
      <h2>Dùng mã YOURCODE</h2>
      <p>Mô tả ngắn về coupon.</p>
      <div class="coupon-code">YOURCODE</div>
      <ul class="list-clean" style="margin-top: 1rem">
        <li><strong>Điểm 1:</strong> Nội dung</li>
        <li><strong>Điểm 2:</strong> Nội dung</li>
        <li><strong>Điểm 3:</strong> Nội dung</li>
      </ul>
      <div class="metrics">
        <div class="metric">
          <strong>Số liệu 1</strong>
          <span>Chú thích</span>
        </div>
        <div class="metric">
          <strong>Số liệu 2</strong>
          <span>Chú thích</span>
        </div>
        <div class="metric">
          <strong>Số liệu 3</strong>
          <span>Chú thích</span>
        </div>
      </div>
    </aside>
  </div>
</section>

<!-- IMAGE SECTION -->
<section>
  <div class="wrap media-grid two-up">
    <figure class="media-card">
      <img
        src="./assets/images/hero-image.webp"
        alt="Mô tả ảnh chi tiết, có keyword"
        width="1080"
        height="607"
        loading="lazy"
        decoding="async"
      />
      <figcaption>Chú thích ảnh — hiển thị cho screen reader và SEO</figcaption>
    </figure>
  </div>
</section>

<!-- CARDS-3 -->
<section>
  <div class="wrap cards-3">
    <article class="card">
      <h2>Sản phẩm là gì</h2>
      <p>Mô tả ngắn gọn.</p>
    </article>
    <article class="card">
      <h2>Dành cho ai</h2>
      <p>Mô tả ngắn gọn.</p>
    </article>
    <article class="card">
      <h2>Tại sao site này hữu ích</h2>
      <p>Mô tả ngắn gọn.</p>
    </article>
  </div>
</section>

<!-- FAQ SECTION -->
<section>
  <div class="wrap">
    <h2 class="section-title">Câu hỏi thường gặp về [Sản phẩm]</h2>
    <div class="faq-list">
      <article class="faq-item">
        <h3>Câu hỏi 1?</h3>
        <p>Trả lời câu hỏi 1.</p>
      </article>
      <article class="faq-item">
        <h3>Câu hỏi 2?</h3>
        <p>Trả lời câu hỏi 2.</p>
      </article>
    </div>
  </div>
</section>
```

---

### 📄 TRANG 2: Review (`/review/index.html`)

**Mục tiêu SEO:** Review intent — "is [product] worth it?"  
**Keywords:** "[sản phẩm] review", "có nên dùng [sản phẩm]"  
**Schema:** Review + BreadcrumbList

**Cấu trúc nội dung:**
```
1. Breadcrumb: Home / Review
2. [HERO] — H1 "Review [Sản phẩm] 2026: Có Đáng Tiền Không?"
   Sidebar: Review Snapshot (dạng list: Best for, Drawback, Coupon, Links)
3. [IMAGE] — Dashboard screenshot
4. [SECTION] — Verdict (kết luận ngắn trước, chi tiết sau)
5. [CARDS-3] — "Điểm mạnh / Điểm yếu / Phù hợp với ai"
6. [SECTION] — Deep dive features (nhiều đoạn văn)
7. [TABLE] — Comparison table vs competitors
8. [SECTION] — "Ai nên mua, ai không nên mua"
9. [FAQ] — 4-5 câu hỏi review
```

**HTML pattern đặc trưng:**
```html
<!-- Breadcrumb (cả HTML lẫn Schema) -->
<div class="wrap breadcrumbs">
  <a href="../index.html">Trang chủ</a> / Review [Sản phẩm]
</div>

<!-- Review snapshot sidebar -->
<aside class="panel">
  <h2>Review Tóm tắt</h2>
  <ul class="list-clean">
    <li><strong>Phù hợp với:</strong> agencies, team đa tài khoản</li>
    <li><strong>Hạn chế:</strong> Giá cao cho người dùng cá nhân</li>
    <li><strong>Coupon:</strong> YOURCODE</li>
    <li><strong>Xem thêm:</strong>
      <a href="../pricing/index.html">Bảng giá</a>,
      <a href="../alternatives/index.html">So sánh</a>
    </li>
  </ul>
</aside>
```

---

### 📄 TRANG 3: Pricing (`/pricing/index.html`)

**Mục tiêu SEO:** Pricing intent — "how much does [product] cost?"  
**Keywords:** "[sản phẩm] pricing", "[sản phẩm] price", "[sản phẩm] plans"  
**Schema:** BreadcrumbList + (tùy chọn) Offer

**Cấu trúc nội dung:**
```
1. Breadcrumb
2. [HERO] — H1 "Giá [Sản phẩm] 2026: Phân tích các gói Trial, Pro, Business"
   Sidebar: Coupon snapshot box
3. [IMAGE]
4. [TABLE] — Bảng giá đầy đủ (Plan / Profiles / Giá / Best Fit)
5. [CARDS-3] — "Trial gồm gì / Pro thêm gì / Business unlock gì"
6. [SPLIT] — "Cách đọc bảng giá đúng"
   Sidebar: "Buyer Rules" (list nhanh)
7. [SECTION] — "Tín hiệu từ nhà sản xuất"
8. [IMAGE]
9. [CARDS-2] — "Chọn gói nào?" (4 cards, mỗi card = 1 gói)
10. [SECTION] — "Bạn thực sự đang trả tiền cho gì?"
11. [FAQ] — 5 câu hỏi về giá
```

**HTML pattern đặc trưng — Bảng giá:**
```html
<section>
  <div class="wrap table-wrap">
    <h2>Bảng giá [Sản phẩm] (USD)</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Gói</th>
          <th>Số profiles</th>
          <th>Giá/tháng</th>
          <th>Giá/năm</th>
          <th>Phù hợp nhất</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Trial 3 ngày</td>
          <td>5 profiles</td>
          <td>~$2 một lần</td>
          <td>N/A</td>
          <td>Test nhanh sản phẩm</td>
        </tr>
        <tr>
          <td>Pro 10</td>
          <td>10 profiles</td>
          <td>~$10/tháng</td>
          <td>~$6/tháng (trả năm)</td>
          <td>Solo, low-volume</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

---

### 📄 TRANG 4: Alternatives (`/alternatives/index.html`)

**Mục tiêu SEO:** Comparison intent  
**Keywords:** "[sản phẩm] alternatives", "[sản phẩm] vs [competitor]", "best [category]"  
**Schema:** BreadcrumbList

**Cấu trúc nội dung:**
```
1. Breadcrumb
2. [HERO] — H1 "Top Alternatives cho [Sản phẩm] 2026"
   Sidebar: Fast Conclusion (list bullets: chọn X nếu..., chọn Y nếu...)
3. [IMAGE]
4. [TABLE] — So sánh: Tool / Positioning / Best For / Tradeoff
5. [SECTION] — Phân tích từng competitor (mỗi tool 1 H2 + 2-3 đoạn)
6. [SECTION] — "Khi nào nên chọn [Sản phẩm], khi nào không?"
7. [SECTION] — "Tóm tắt quyết định"
8. [FAQ] — 4-5 câu hỏi so sánh
```

---

### 📄 TRANG 5: Offers (`/offers/index.html`)

**Mục tiêu SEO:** Transactional intent  
**Keywords:** "[sản phẩm] coupon", "[sản phẩm] discount code", "[sản phẩm] deal"  
**Schema:** BreadcrumbList

**Cấu trúc nội dung:**
```
1. Breadcrumb
2. [HERO] — H1 "[Sản phẩm] Coupon: 12 Cách Dùng YOURCODE"
   Sidebar: Coupon box + Copy button
3. [IMAGE]
4. [SECTION] — "Deal Stack Grid"
   → 12 deal boxes, mỗi box: H3 (angle khác nhau) + mô tả + CTA button
5. [CARDS-2] — "Cách dùng coupon / Tại sao trang này hiệu quả"
6. [IMAGE]
7. [FAQ]
```

**HTML pattern đặc trưng — Deal box:**
```html
<section>
  <div class="wrap">
    <h2>Các biến thể deal với mã YOURCODE</h2>
    <div class="deal-grid">
      <div class="deal-box">
        <h3>Tiết kiệm ngay cho lần đầu dùng</h3>
        <p>Dành cho người dùng mới.</p>
        <a class="button-link"
          href="https://example.com/?ref=CODE"
          target="_blank"
          rel="noopener noreferrer sponsored">
          Nhận ưu đãi
        </a>
        <hr>
      </div>
      <!-- Lặp lại 12 lần với angle khác nhau -->
    </div>
  </div>
</section>
```

---

### 📄 TRANG 6: Blog Archive (`/blog/index.html`)

**Mục tiêu SEO:** Hub cho informational content  
**Keywords:** "[sản phẩm] guide", "[sản phẩm] tutorial"

**Cấu trúc:**
```
1. Breadcrumb
2. [HERO] — H1 "Blog [Sản phẩm]: Hướng dẫn, Tutorial, Mẹo mua hàng"
3. [IMAGE]
4. [BLOG-GRID] — 3 cards, mỗi card = 1 bài blog (H2 + mô tả + CTA)
```

```html
<div class="wrap blog-grid">
  <article class="card">
    <h2>Tên bài blog 1</h2>
    <p>Mô tả ngắn.</p>
    <p><a class="button-link" href="./coupon-guide/index.html">Đọc bài viết</a></p>
  </article>
  <!-- ... -->
</div>
```

---

### 📄 TRANG 7-9: Blog Posts

**Cấu trúc blog post chuẩn:**
```
1. Breadcrumb: Home / Blog / Tên bài
2. [HERO] — không có sidebar, chỉ 1 cột
   → span.eyebrow "Bài viết X"
   → H1 dài, keyword-rich
   → p.lede
3. [IMAGE]
4. [CONTENT] — Các H2 + đoạn văn
   → Mỗi H2 = 1 bước / 1 chủ đề
   → Đan xen internal links
5. [IMAGE thứ 2]
6. [FAQ]
```

**LƯU Ý:** Blog posts không có `hero-grid` (không sidebar). Dùng:
```html
<section class="hero">
  <div class="wrap">  <!-- Không có hero-grid -->
    <span class="eyebrow">Bài viết 1</span>
    <h1>Tiêu đề bài blog</h1>
    <p class="lede">Mô tả...</p>
  </div>
</section>
```

---

### 📄 TRANG 10: Disclosure (`/disclosure/index.html`)

```html
<section class="hero">
  <div class="wrap">
    <h1>Affiliate Disclosure</h1>
    <p class="lede">Website này chứa affiliate links. Khi bạn click và mua hàng, chúng tôi có thể nhận hoa hồng mà không tốn thêm chi phí của bạn.</p>
    <p>Nội dung disclosure chi tiết...</p>
    <p>Chúng tôi luôn cố gắng cung cấp thông tin chính xác, nhưng giá và tính năng sản phẩm có thể thay đổi. Hãy kiểm tra lại trên website chính thức trước khi mua.</p>
  </div>
</section>
```

---

### 📄 TRANG 11: Privacy (`/privacy/index.html`)

```html
<section class="hero">
  <div class="wrap">
    <h1>Chính sách Bảo mật</h1>
    <p class="lede">Chúng tôi tôn trọng quyền riêng tư của bạn.</p>
    <h2>Thu thập thông tin</h2>
    <p>Site này không thu thập thông tin cá nhân...</p>
    <h2>Cookies</h2>
    <p>Chúng tôi sử dụng cookies từ bên thứ ba (Google Analytics)...</p>
    <h2>Affiliate Links</h2>
    <p>Xem <a href="../disclosure/index.html">Affiliate Disclosure</a> để biết thêm.</p>
    <h2>Liên hệ</h2>
    <p>Email: your@email.com</p>
  </div>
</section>
```

---

## 7. sitemap.xml

> Đặt file này tại ROOT: `sitemap.xml` (cùng cấp với `index.html`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://your-domain.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <lastmod>2026-04-01</lastmod>
  </url>

  <url>
    <loc>https://your-domain.com/review/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <lastmod>2026-04-01</lastmod>
  </url>

  <url>
    <loc>https://your-domain.com/pricing/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <lastmod>2026-04-01</lastmod>
  </url>

  <url>
    <loc>https://your-domain.com/alternatives/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>2026-04-01</lastmod>
  </url>

  <url>
    <loc>https://your-domain.com/offers/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>2026-04-01</lastmod>
  </url>

  <url>
    <loc>https://your-domain.com/blog/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>2026-04-01</lastmod>
  </url>

  <url>
    <loc>https://your-domain.com/blog/coupon-guide/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>2026-04-01</lastmod>
  </url>

  <url>
    <loc>https://your-domain.com/blog/setup-guide/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>2026-04-01</lastmod>
  </url>

  <url>
    <loc>https://your-domain.com/blog/use-cases-guide/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>2026-04-01</lastmod>
  </url>

</urlset>
```

---

## 8. robots.txt

> Đặt tại ROOT: `robots.txt`

```
User-agent: *
Allow: /

# Không index trang pháp lý (tùy chọn)
# Disallow: /privacy/
# Disallow: /disclosure/

Sitemap: https://your-domain.com/sitemap.xml
```

---

## 9. Checklist SEO khi code

### Mỗi trang PHẢI có:
- [ ] `<title>` — có keyword, có năm, max 60 ký tự
- [ ] `<meta name="description">` — có keyword, max 160 ký tự
- [ ] `<link rel="canonical">` — URL đầy đủ, kết thúc bằng `/`
- [ ] `<meta name="robots" content="index, follow">`
- [ ] Open Graph: `og:title`, `og:description`, `og:url`, `og:image`
- [ ] Twitter Card: `twitter:card`, `twitter:title`, `twitter:image`
- [ ] Đúng 1 thẻ `<h1>` per trang
- [ ] H2, H3 có keyword tự nhiên
- [ ] Breadcrumb HTML (và Schema BreadcrumbList)
- [ ] Schema.org phù hợp theo loại trang
- [ ] `lang="vi"` (hoặc `lang="en"`) trên `<html>`

### Mỗi ảnh PHẢI có:
- [ ] `alt=""` mô tả chi tiết, có keyword tự nhiên
- [ ] `width=""` và `height=""` (tránh CLS)
- [ ] `loading="lazy"` (trừ ảnh đầu tiên above-the-fold)
- [ ] `decoding="async"`
- [ ] Format `.webp`, tối đa ~100KB

### Affiliate links PHẢI có:
- [ ] `target="_blank"` — mở tab mới
- [ ] `rel="noopener noreferrer sponsored"` — bắt buộc theo Google guidelines

### File cần tạo:
- [ ] `sitemap.xml` — liệt kê tất cả URL
- [ ] `robots.txt` — khai báo sitemap

### Google Search Console:
- [ ] Submit site
- [ ] Submit sitemap URL
- [ ] Check Index Coverage sau 1 tuần

### Performance:
- [ ] Google Fonts qua `<link>` trong HTML, KHÔNG dùng `@import` trong CSS
- [ ] Ảnh `.webp`
- [ ] JS có `defer`
- [ ] CSS không có `@import` bên ngoài Google Fonts

---

## BẢNG TÓM TẮT: Các thẻ meta theo từng trang

| Trang | title (max 60 ký tự) | og:type | Schema |
|---|---|---|---|
| Homepage | "[Sản phẩm] Coupon CODE: Review, Giá, Ưu đãi" | website | FAQPage |
| /review/ | "Review [Sản phẩm] 2026: Có Đáng Tiền Không?" | article | Review + Breadcrumb |
| /pricing/ | "Bảng Giá [Sản phẩm] 2026: Trial, Pro, Business" | website | Breadcrumb |
| /alternatives/ | "Top Alternatives cho [Sản phẩm] 2026" | website | Breadcrumb |
| /offers/ | "[Sản phẩm] Coupon & Deal: Dùng Mã CODE" | website | Breadcrumb |
| /blog/ | "Blog [Sản phẩm]: Hướng dẫn & Tutorial" | website | Breadcrumb |
| /blog/post/ | "Tiêu đề bài viết dài — [Sản phẩm]" | article | Article + Breadcrumb |
| /disclosure/ | "Affiliate Disclosure — [Site Name]" | website | — |
| /privacy/ | "Chính sách Bảo mật — [Site Name]" | website | — |

---

*Blueprint này đủ để bạn rebuild site hoàn toàn từ đầu. Mỗi phần đã được thiết kế để chuẩn SEO hơn bản gốc.*
