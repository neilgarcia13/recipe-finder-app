import { showMessage } from "./message.js";
import { searchRecipe, getRandomRecipe, getRecipeDetails } from "./recipe.js";
import { closeModal } from "./modal.js";

//VARIABLE DECLARATION

export const resultsGrid = document.querySelector('.results-grid');
export const modalContainer = document.querySelector('.modal-container');

const searchForm = document.querySelector('.search-form');
const searchBar = document.querySelector('.search-bar');

const randomButton = document.querySelector('.random-button');

//Search form functionality
searchForm.addEventListener("submit", e => {

  e.preventDefault();

  const searchPrompt = searchBar.value.trim();

  if (searchPrompt) {

    searchRecipe(searchPrompt);

  } else {

    showMessage("Please search a valid recipe first.", true);
  }

});

//Generate Random Recipe button functionality
randomButton.addEventListener("click", () => {

  getRandomRecipe();

});

//Showing of recipe details using the API's mealId
resultsGrid.addEventListener("click", (e) => {

  const recipeCard = e.target.closest('.recipe-item');

  if (recipeCard) {
    const recipeId = recipeCard.dataset.recipeId;
    getRecipeDetails(recipeId);

  }

});

//If the user clicked outside the modal-content, modal-content will close itself
modalContainer.addEventListener("click", (e) => {

  if (e.target === modalContainer) {

    closeModal();

  }

});