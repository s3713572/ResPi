<template>
  <div class="flex-container">
    <Recipes :recipes="recipes"/>
    
  </div>
</template>

<script>
  import Recipes from '../components/Recipes'
  import RecipeApi from '../api/RecipeApi'

  export default {
    name: 'Recipe',

    components: {
      Recipes,
    },
    data(){
      return{
        recipes: [],
      }
    },
    async created(){
      const recipeApi = new RecipeApi;
      this.recipes = await recipeApi.getAllRecipes();
    }
  }
</script>

<style scoped>
.flex-container{
  display: flex;
}
</style>