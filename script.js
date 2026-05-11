const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".site-menu");
const menuLabel = document.querySelector(".menu-label");

function setMenuState(isOpen) {
  menu?.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuButton?.setAttribute("aria-expanded", String(isOpen));
  menuButton?.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menu?.setAttribute("aria-hidden", String(!isOpen));
  if (menuLabel) menuLabel.textContent = isOpen ? "Close" : "Menu";
}

menuButton?.addEventListener("click", () => {
  const isOpen = !menu?.classList.contains("is-open");
  setMenuState(isOpen);
});

menu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuState(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function addRollingText(element) {
  const label = element.textContent?.trim();
  if (!label || element.querySelector(".rolling-link__track")) return;

  element.setAttribute("aria-label", label);
  element.classList.add("rolling-link");
  element.textContent = "";

  const mask = document.createElement("span");
  mask.className = "rolling-link__mask";

  const track = document.createElement("span");
  track.className = "rolling-link__track";
  track.setAttribute("aria-hidden", "true");

  [label, label].forEach((text) => {
    const line = document.createElement("span");
    line.className = "rolling-link__line";
    line.textContent = text;
    track.append(line);
  });

  mask.append(track);
  element.append(mask);
}

document
  .querySelectorAll(".menu-nav a, .site-footer nav a, .button, .header-cta, .footer-community")
  .forEach(addRollingText);

const revealTargets = [
  ".hero-content",
  ".section-copy",
  ".section-image",
  ".support-section .support-content",
  ".support-flower",
  ".specialties-section h2",
  ".specialty",
  ".moving-section > div",
  ".moving-image",
  ".contact-cta > *",
  ".footer-script",
  ".footer-contact",
  ".footer-brand",
  ".site-footer nav",
  ".footer-community",
  ".about-hero h1",
  ".about-hero img",
  ".welcome-card",
  ".about-bio",
  ".values-wrap",
  ".philosophy-main > *",
  ".contact-intro-card",
  ".contact-panel",
  ".services-title-section h2",
  ".service-tile",
  ".service-detail-card",
];

const imageMotionTargets = [
  ".best-self-image",
  ".philosophy-family",
  ".contact-photo",
  ".service-photo",
];

document.querySelectorAll(imageMotionTargets.join(",")).forEach((element) => {
  element.classList.add("pop-image");
});

document
  .querySelectorAll(".about-hero img, .support-flower, .menu-flower")
  .forEach((element) => {
    element.classList.add("buoyant-float");
  });

const revealElements = Array.from(document.querySelectorAll(revealTargets.join(",")));

revealElements.forEach((element, index) => {
  element.classList.add("ethical-reveal");
  element.style.setProperty("--reveal-delay", `${Math.min((index % 5) * 85, 340)}ms`);
});

if (reduceMotion) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  window.addEventListener(
    "pointermove",
    (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 22;
      const y = (event.clientY / window.innerHeight - 0.5) * 22;
      document.documentElement.style.setProperty("--cursor-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${y}px`);
    },
    { passive: true }
  );
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
