const navButton = document.querySelector(".toggle-nav");
const navMenu = document.querySelector(".nav-links");

function handleNavToggle() {
  navMenu.classList.toggle("hidden");
}

function handleResize() {
  if (window.innerWidth >= 1000) {
    navMenu.classList.remove("hidden");
  } else {
    navMenu.classList.add("hidden");
  }
}

navButton.addEventListener("click", handleNavToggle);
window.addEventListener("resize", handleResize);
handleResize();

function buildViewerTemplate(imageSrc, imageAlt) {
  const dialog = document.createElement("dialog");
  dialog.classList.add("viewer");

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = imageAlt;

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.classList.add("close-btn");

  dialog.append(img, closeButton);

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => dialog.remove());

  return dialog;
}

const gallery = document.querySelector(".gallery");

function openImageViewer(event) {
  const selected = event.target.closest("img");
  if (!selected) return;

  const largePath = "norris-full.jpeg";
  const viewer = buildViewerTemplate(largePath, selected.alt);
  document.body.appendChild(viewer);
  viewer.showModal();
}

gallery.addEventListener("click", openImageViewer);
