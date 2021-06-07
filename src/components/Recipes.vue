<template>
<div class="flex-container">
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
        <Recipe :recipe="recipe" />
    </div>
</div>
</template>

<script>
import Recipe from './Recipe'
export default {
    name: 'Recipes',
    props:{
        recipes: Array
    },
    components:{
        Recipe
    }
}
</script>

<style scoped>
</style>