const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("nav");
const gallery = document.querySelector(".gallery");
const modal = document.querySelector("dialog");
const modalButton = document.querySelector(".close-viewer");

function menuButtonClicked () {
	menu.classList.toggle("hidden");
}

function windowResized () {
	if (window.innerWidth >= 1000) {
		menu.classList.remove("hidden");
	}
}

function galleryClicked (event) {
	const img = event.target.closest("img");

	modal.firstElementChild.src = img.src.split("-")[0] + "-full.jpeg";
	modal.showModal();
}

gallery.addEventListener("click", galleryClicked);
modal.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.close();
	}
});
modalButton.addEventListener("click", () => {
	modal.close();
});


menuButton.addEventListener("click", menuButtonClicked);
window.addEventListener("resize", windowResized);
windowResized();