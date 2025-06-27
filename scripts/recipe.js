import { resultsGrid, modalContainer } from "./main.js";
import { showMessage, clearMessage } from "./message.js";
import { showModal, closeModal } from "./modal.js";

//VARIABLE DECLARATION OF THE APIs
const SEARCH_API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const RANDOM_API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
const LOOKUP_API_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";


const modalContent = document.querySelector('.modal-content');

export async function searchRecipe(query) {

  showMessage(`Searching for "${query}"...`, false, true);

  try {
    //Data fetching in the API
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

export function displayRecipe(recipes) {

  let recipesHTML = ''

  if (!recipes || recipes.length === 0) {
    showMessage("No recipe/s to display.");
    return;
  }

  recipes.forEach((recipe) => {
    //Generated the HTML using the DOM
    recipesHTML += `
      <div class="recipe-item" data-recipe-id="${recipe.idMeal}">
        <img class="recipe-img" src=${recipe.strMealThumb} alt="${recipe.strMeal}" loading="lazy">
        <h3 class="recipe-name">${recipe.strMeal}</h3>
      </div>
    `
  });

  resultsGrid.innerHTML = recipesHTML;

}

export async function getRandomRecipe() {

  showMessage("Loading random recipe...", false, true);

  try {
    //Data fetching in the API
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

export async function getRecipeDetails(id) {

  modalContent.innerHTML = '<p class="message-area loading">Loading recipe details...</p>';
  showModal();

  try {
    //Data fetching in the API
    const response = await fetch(`${LOOKUP_API_URL} ${id}`);
    if(!response.ok) throw new Error("Something went wrong.");

    const data = await response.json();

    if (data.meals && data.meals.length > 0) {

      displayRecipeModal(data.meals, data.meals[0]);

    } else {
      modalContent.innerHTML = '<p class="message-area error">Could not load recipe details. Please try again.</p>';
    }

  } catch (error) {
    console.log(error);
    modalContent.innerHTML = '<p class="message-area error">Loading recipe details failed. Please try again.</p>';

  }
}

export function displayRecipeModal(recipes, recipesIngredient) {

  let recipesModalHTML = '';

  //Displaying of the recipe's list of ingredients functionality
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {

    const ingredient = recipesIngredient[`strIngredient${i}`]?.trim();
    const measurement = recipesIngredient[`strMeasure${i}`]?.trim();
    
    if (ingredient) {

      ingredients.push(`<li>${measurement ? `${measurement} ` : ""}${ingredient}</li>`);

    } else break;

  }

  recipes.forEach((recipe) => {
    //Generated the HTML using the DOM
    recipesModalHTML += `
    
      <div class="modal-content">

        <button class="close-button">×</button>

        <h2 class="recipe-title">${recipe.strMeal}</h2>

        <img class="modal-img" src=${recipe.strMealThumb}>

        <h3>Category: ${recipe.strCategory ? `${recipe.strCategory}` : ""}</h3>
        <h3>Area: ${recipe.strArea ? `${recipe.strArea}` : ""}</h3>
        <h3>Ingredients</h3>

        <ul>

         ${ingredients.join("")}

        </ul>

        <h3>Instructions</h3>

        <p>${recipe.strInstructions ? `${recipe.strInstructions.replace(/\r?\n/g, "<br>")}` : "Instructions are not available."}</p>

        <h3>Video Recipe</h3>

        <div class="youtube-link-container">
          <a href=${recipe.strYoutube ? `${recipe.strYoutube}` : ""} target="_blank">Watch on Youtube</a>
        </div>

        <div class="source-link-container">
         <a href="${recipe.strSource ? `${recipe.strSource}` : ""}" target="_blank">View Original Source</a>
        </div>

      </div>
    `
  });

  modalContainer.innerHTML = recipesModalHTML;

  //Modal's close button functionality
  document.querySelector('.close-button').addEventListener("click", () => {
    
    closeModal();
    
  });

}