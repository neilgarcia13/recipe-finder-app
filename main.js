const SEARCH_API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


const searchForm = document.querySelector('.search-form');
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');

const messageArea = document.querySelector('.message-area');

const resultsGrid = document.querySelector('.results-grid');

searchForm.addEventListener("submit", e => {
  e.preventDefault();

  const searchPrompt = searchBar.value.trim();

  if (searchPrompt) {

    searchRecipe(searchPrompt);

  } else {

    showMessage("Please search a valid recipe first.", true);
  }

});

async function searchRecipe(query) {

  showMessage(`Searching for "${query}"...`, false, true);

  try {

    const response = await fetch(`${SEARCH_API_URL} ${query}`);
    if (!response.ok) throw new Error("Network error.");

    const data = await response.json();
    clearMessage();

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

function showMessage(message, isError = false, isLoading = false) {
  
  messageArea.textContent = message;

  if (isError) messageArea.classList.add('error');
  if (isLoading) messageArea.classList.add('loading');

}

function clearMessage() {

  messageArea.textContent = "";
  messageArea.className = "";

}


const closeButton = document.querySelector('.close-button');

closeButton.addEventListener("click", () => {
  document.querySelector('.modal-container').classList.add('hidden');
});