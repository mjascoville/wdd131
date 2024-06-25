let currentyear = document.getElementById("currentyear");
let today = new Date();
currentyear.innerText = today.getFullYear();

let lastModified = document.getElementById("lastModified");
lastModified.innerText = document.lastModified;