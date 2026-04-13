const components = [
  { id: "nav-placeholder",      file: "components/nav.html" },
  { id: "hero-placeholder",     file: "components/hero.html" },
  { id: "menu-placeholder",     file: "components/menu.html" },
  { id: "horarios-placeholder", file: "components/horarios.html" },
  { id: "ubicacion-placeholder",file: "components/ubicacion.html" },
  { id: "footer-placeholder",   file: "components/footer.html" },
];

async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Error cargando ${file}: ${res.status}`);
    const html = await res.text();
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

async function init() {
  await Promise.all(components.map(({ id, file }) => loadComponent(id, file)));
  initNavScroll();
  initMobileMenu();
}

function initNavScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });
}

function initMobileMenu() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-toggle");
    const menu = document.querySelector(".nav-links");
    if (btn && menu) menu.classList.toggle("open");
    if (!e.target.closest("nav") && menu) menu.classList.remove("open");
  });
}

document.addEventListener("DOMContentLoaded", init);