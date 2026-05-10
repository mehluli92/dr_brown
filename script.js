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
