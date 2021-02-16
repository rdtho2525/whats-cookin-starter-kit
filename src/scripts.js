//GLOBAL VARIABLES//
// const Recipe = require('../src/Recipe');
// const User = require('../src/User');
// const RecipeRepo = require('../src/RecipeRepo');

// { <p id="" class="recipe-tags">
//     <ul class="list tag">
//         <li>${recipe.tags[0] || null}</li>
//         <li>${recipe.tags[1] || null}</li>
//         <li>${recipe.tags[2] || null}</li>
//     </ul>
// </p> }

const recipeRepo = new RecipeRepo();


//DOM ELEMENTS//
const navSection = document.querySelector('#navigation');
const favRecipesButton = document.querySelector('#favoriteRecipes');
const recipesToCookButton = document.querySelector('#recipesToCook');
const userSearch = document.querySelector('#userSearch');
const searchField = document.querySelector('#searchField')
const searchFilter = document.querySelector('#searchFilter');
const landingPage = document.querySelector('#landingPage');
const userGreeting = document.querySelector('#userGreeting');
const recentlyViewRecipes = document.querySelector('#recentlyViewedRecipes');
const centerPieceCard = document.querySelector('#centerPieceCard');
const cardContainer = document.querySelector('#cardContainer');
const modalContainer = document.querySelector('#modalContainer');
const fullRecipeCard = document.querySelector('#fullRecipeCard');
const fullCardImage = document.querySelector('#fullCardImage');
const fullCardName = document.querySelector('#fullCardName');
const totalCost = document.querySelector('#totalCost');
const ingredientsTitle = document.querySelector('#ingredientsTitle');
const ingredientsNeeded = document.querySelector('#ingredientsNeeded');
const instructionsTitle = document.querySelector('#instructionsTitle');
const recipeInstructions = document.querySelector('#recipeInstructions');
const exitFullCardButton = document.querySelector('#exitFullCard');
const searchButton = document.querySelector('#searchButton');
const recipeListTitle = document.querySelector('#recipeListTitle')

//FUNCTIONS//

//SELECT RANDOM USER - ON LOAD//
const getRandomIndex = array => {
    return Math.floor(Math.random() * array.length)
}

//unsure where to make this declaration
const currentUser = new User(usersData[getRandomIndex(usersData)]);
currentUser.favoriteRecipes.push(recipeRepo.recipes[3])


const greetUser = () => {
    const firstName = currentUser.name.split(' ', 2);
    userGreeting.textContent = `Welcome to What's Cookin', ${firstName[0]}!`;
    setTimeout(function() {
        addClass(userGreeting);
    }, 10000)
}

//VIEW LIST OF ALL RECIPES
const displayRecipes = (array) => {
    const pickArray = array.recipes || array;
    const allRecipes = pickArray.map(recipe => {
        return `
        <article id="${recipe.id}" class="recipe-card left click">
            <img src="${recipe.image}" alt="${recipe.name}">
            <p id="" class="recipe-name">${recipe.name}</p>
        </article>`
    });

    return cardContainer.innerHTML = allRecipes.join('\n');
}

//CAROUSEL - "MOST POPULAR RECIPES OF THE WEEK"

//VIEW FULL RECIPE CARD - DIRECTIONS, INGREDIENTS, TOTAL COST
const addClass = (element, className) => {
    element.classList.add(className || "hidden");
  };
  
const removeClass = (element, className) => {
    element.classList.remove(className || "hidden");
  };

const changeToFullCard = event => {
    let recipe;
    const recipeID = parseInt(event.target.closest('article').id);
    if (recipeID.toString() === 'NaN') {
        return;
    } else {
        recipe = recipeRepo.recipes.find(rec => rec.id === recipeID);
    }
    showFullCard(recipe);
}

const showFullCard = recipe => {
    fullCardImage.src = recipe.image;
    fullCardImage.alt = recipe.name;
    fullCardName.innerText = recipe.name;
    recipeInstructions.innerHTML = getInstructions(recipe);
    totalCost.innerText = `total cost: $${recipe.getTotalCostOfIngredients()}`;
    ingredientsNeeded.innerHTML = getIngredients(recipe);
    removeClass(modalContainer);
}

const getInstructions = recipe => {
    const result = recipe.instructions.map(ele => {
        return `<li class="item">${ele.instruction}</li>`;
    })
    return result.join('\n');
}

const getIngredients = recipe => {
    const ingredients = recipe.getIngredientNames();
    const result = ingredients.map((ingr, i) => {
        return `<li>${ingr}:  ${recipe.ingredients[i].quantity.amount} ${recipe.ingredients[i].quantity.unit}</li>`;
    })
    return result.join('\n');
}




//FILTER RECIPES BY TAG, NAME, INGREDIENTS
const filterRecipes = () => {
    const filterValue = searchFilter.value;
    const userInput = searchField.value.toLowerCase();
    let recipeCards = [];
    switch (filterValue) {
        case 'name':
            console.log('this name')
            recipeCards = recipeRepo.filterByName(userInput);
            break;
        case 'tag':
            console.log('this tag')
            recipeCards = recipeRepo.filterByTag(userInput);
            break;
        case 'ingredients':
            console.log('this ingredient')
            recipeCards = recipeRepo.filterByIngredient(userInput);
            break;
        default:
            console.log('keep trying');
            recipeCards = recipeRepo.recipes;
            break;
    }
    searchField.value = '';
    return displayRecipes(recipeCards);
}

const changeTitle = event => {
    return recipeListTitle.innerText = `Currently Viewing: ${event.target.value}`
}


//combine display and filter for event lister, on change to input


//EVENT LISTENERS **AT BOTTOM**//
window.addEventListener('load', filterRecipes);
window.addEventListener('load', greetUser);
searchButton.addEventListener('click', filterRecipes);

exitFullCardButton.addEventListener('click', function() {
    addClass(modalContainer);
})

cardContainer.addEventListener('click', function(event) {
    changeToFullCard(event);
});
allRecipes.addEventListener('click', function(event) {
    changeTitle(event);
    filterRecipes();
})
favRecipesButton.addEventListener('click', function(event) {
    changeTitle(event);
    displayRecipes(currentUser.favoriteRecipes);
})