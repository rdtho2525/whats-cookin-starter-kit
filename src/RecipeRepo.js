const recipeData = require('../data/recipes');
const Recipe = require('../src/Recipe');

class RecipeRepo {
  constructor() {
    this.recipes = this.populateRecipes();
  }

  populateRecipes() {
    const recipes = recipeData.map(recipe => new Recipe(recipe));
    return recipes;
  }

  filterByTag(searchString) {
    const tags = searchString.split(',').map(tag => tag.trim());
    
    const recipes = this.recipes.reduce((matchingRecipes, recipe) => {
      tags.forEach(tag => {
        if (recipe.tags.includes(tag)) {
          matchingRecipes.push(recipe);
        }
      })
      return matchingRecipes
    }, [])
    return this.removeDuplicates(recipes);
  }

  filterByName(searchString) {
    const names = searchString.split(',').map(tag => tag.trim());

    const recipes = this.recipes.reduce((matchingRecipes, recipe) => {
      names.forEach(recipeName => {
        if (recipe.name === recipeName) {
          matchingRecipes.push(recipe);
        }
      })
      return matchingRecipes;
    }, [])
    return this.removeDuplicates(recipes);
  }

  filterByIngredient(searchString) {
    const ingredients = searchString.split(',').map(tag => tag.trim());
    
    const recipes = this.recipes.reduce((matchingRecipes, recipe) => {
      const recipeIngredients = recipe.getIngredientNames();
      ingredients.forEach(ingredientName => {
        if (recipeIngredients.includes(ingredientName)) {
          matchingRecipes.push(recipe);
        }
      })
      return matchingRecipes;
    }, [])
    return this.removeDuplicates(recipes);
  }

  removeDuplicates(data) {
    return data.filter((a, b) => data.indexOf(a) === b)
  }
}

if (typeof module !== 'undefined') {
  module.exports = RecipeRepo;
}
