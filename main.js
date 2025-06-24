const SEARCH_API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const RANDOM_API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
const LOOKUP_API_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";


const searchForm = document.querySelector('.search-form');
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');

const randomButton = document.querySelector('.random-button');

const messageArea = document.querySelector('.message-area');

const resultsGrid = document.querySelector('.results-grid');

const modalContainer = document.querySelector('.modal-container');
const closeButton = document.querySelector('.close-button');

searchForm.addEventListener("submit", e => {
  e.preventDefault();

  const searchPrompt = searchBar.value.trim();

  if (searchPrompt) {

    searchRecipe(searchPrompt);

  } else {

    showMessage("Please search a valid recipe first.", true);
  }

});

randomButton.addEventListener("click", () => {

  getRandomRecipe();

});


async function searchRecipe(query) {

  showMessage(`Searching for "${query}"...`, false, true);

  try {

    const response = await fetch(`${SEARCH_API_URL} ${query}`);
    if (!response.ok) throw new Error("Network error.");

    const data = await response.json();
    clearMessage();

    console.log(data)

    if (data.meals) {
      displayRecipe(data.meals);

    } else {

      showMessage(`No recipe/s found for "${query}".`, true);

    }

  } catch (error) {
    showMessage("Something went wrong, please try again.", true);
  }
  
}

function displayRecipe(recipes) {

  let recipesHTML = ''

  if (!recipes || recipes.length === 0) {
    showMessage("No recipe/s to display.");
    return;
  }

  recipes.forEach((recipe) => {

    recipesHTML += `
      <div class="recipe-item">
        <img class="recipe-img" src=${recipe.strMealThumb} alt="${recipe.strMeal}" loading="lazy">
        <h3 class="recipe-name">${recipe.strMeal}</h3>
      </div>
    `
  });

  resultsGrid.innerHTML = recipesHTML;

}

function displayRecipeModal(recipes) {

  let recipesModalHTML = '';

  recipes.forEach((recipeModal) => {

    recipesModalHTML += `
      <div class="modal-content">

        <button class="close-button">×</button>

        <h2 class="recipe-title">${recipeModal.strMeal}</h2>

        <img class="modal-img" src=${recipeModal.strMealThumb}>

        <h3>Category: ${recipeModal.strCategory}</h3>
        <h3>Area: ${recipeModal.strArea}</h3>
        <h3>Ingredients</h3>

        <ul>

          <li>1/2 bag Rice Stick Noodles</li>
          <li>8 oz Prawns</li>

        </ul>

        <h3>Instructions</h3>

        <p>${recipeModal.strInstructions}</p>

        <h3>Video Recipe</h3>

        <div class="youtube-link-container">
          <a href=${recipeModal.strYoutube} target="_blank">Watch on Youtube</a>
        </div>

        <div class="source-link-container">
         <a href="https://sueandgambo.com/pages/shrimp-chow-fun">View Original Source</a>
        </div>

      </div>
    `
  });

  modalContainer.innerHTML = recipesModalHTML;

}

async function getRandomRecipe() {

  showMessage("Loading random recipe...", false, true);

  try {
    const response = await fetch(RANDOM_API_URL);
    if(!response.ok) throw new Error("Something went wrong.");

    const data = await response.json();
    clearMessage();

    if (data.meals && data.meals.length > 0) {

      displayRecipe(data.meals);

    } else {
      showMessage("Loading random recipe failed. Please try again.", true)
    }

  } catch (error) {
    showMessage("Error loading random recipe. Please try again.", true);
  }

}

function showMessage(message, isError = false, isLoading = false) {
  
  messageArea.textContent = message;

  if (isError) messageArea.classList.add('error');
  if (isLoading) messageArea.classList.add('loading');

}

function clearMessage() {

  messageArea.textContent = "";
  messageArea.className = "message-area";

}

resultsGrid.addEventListener("click", (e) => {

  const recipeCard = e.target.closest('.recipe-item');

  if (recipeCard) {

    showModal();

  }
})

async function getRecipeDetails(id) {
  showModal();
}

function showModal() {
  modalContainer.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalContainer.classList.add("hidden");
  document.body.style.overflow = "";
}

closeButton.addEventListener("click", () => {
  closeModal();
});

modalContainer.addEventListener("click", (e) => {

  if (e.target === modalContainer) {
    closeModal();
  }

});