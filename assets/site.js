// ======================================================
// site.js — Minimal, no framework
// ======================================================

// ======================================================
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
document.querySelectorAll(" data-copy-coupon ").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.dataset.couponCode || "50MAM";
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
