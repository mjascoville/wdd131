import recipes from "./recipes.mjs";

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  const randomIndex = random(list.length);
  return list[randomIndex];
}

function tagsTemplate(tags) {
  return tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");
}

//Is there a way to display half stars? Some of the recipes have a rating like "4.5", and this block of code accounts for that. I don't know if there was an alternate way to do this.
function ratingTemplate(rating) {
  let html = `
    <span
      class="rating"
      role="img"
      aria-label="Rating: ${rating} out of 5 stars"
    >
  `;

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star">☆</span>`;
    }
  }

  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `
    <section class="recipe">
      <img src="${recipe.image}" alt="${recipe.name}">

      <div class="recipe-info">

        ${tagsTemplate(recipe.tags)}

        <h2>${recipe.name}</h2>

        ${ratingTemplate(recipe.rating)}

        <p>${recipe.description}</p>

      </div>
    </section>
  `;
}

function renderRecipes(recipeList) {
  const container = document.querySelector("main");
  const html = recipeList.map(recipe => recipeTemplate(recipe)).join("");
  container.innerHTML = html;
}

function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}

init();

const searchButton = document.querySelector(".search-form button");
const searchInput = document.querySelector(".search-form input");

function filterRecipes(query) {
  const results = recipes.filter(recipe => {
    const nameMatch = recipe.name.toLowerCase().includes(query);
    const descMatch = recipe.description.toLowerCase().includes(query);
    const tagMatch = recipe.tags.find(tag => tag.toLowerCase().includes(query));
    const ingMatch = recipe.recipeIngredient.find(ing =>
      ing.toLowerCase().includes(query)
    );

    return nameMatch || descMatch || tagMatch || ingMatch;
  });

  results.sort((a, b) => a.name.localeCompare(b.name));
  renderRecipes(results);
}

function searchHandler(event) {
  event.preventDefault();
  const query = searchInput.value.toLowerCase().trim();
  filterRecipes(query);
}

searchButton.addEventListener("click", searchHandler);
