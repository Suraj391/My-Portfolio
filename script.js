const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");
const cursorGlow = document.querySelector(".cursor-glow");

menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

window.addEventListener("mousemove", e => {
  if (cursorGlow) {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = "1";
    const target = Number(entry.target.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      entry.target.textContent = current + "+";
    }, 35);
  });
}, {threshold: .8});
counters.forEach(c => counterObserver.observe(c));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-links a")];

window.addEventListener("scroll", () => {
  const y = window.scrollY + 180;
  let current = sections[0]?.id;
  sections.forEach(section => {
    if (y >= section.offsetTop) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
});

document.querySelectorAll('a[href="#"]').forEach(a => {
  a.addEventListener("click", e => e.preventDefault());
});
