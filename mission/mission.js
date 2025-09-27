const themeSelector = document.getElementById("theme-selector");
function changeTheme() {
	if (themeSelector.value === "dark") {
		document.body.className = "dark";
		document.querySelector(".logo").src = "byui-logo_white.png";
	} else {
		document.body.className = "";
		document.querySelector(".logo").src = "byui-logo_blue.png";
	}
}

// add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);