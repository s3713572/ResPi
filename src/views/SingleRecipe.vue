<template>
    <div class="container" v-if="recipe">
        <v-card elevation="2" shaped>
            <br>
            <h3>{{ recipe.title }}</h3>
            <div class="content-fit" v-if="recipe.content">
                <small v-html="recipe.content.body"></small>        
            </div>
            <div>
        <v-container
            class="fill-height"
            fluid
            style="min-height: 200px; margin-top: 1px !important"
        >
            <h4 style="font-family:Gill Sans, sans-serif">Ingredients:</h4><br>
            <v-fade-transition mode="out-in">
            <v-row style="margin-top:1px; padding-top:1px">
            
                <v-col cols="6" v-for="food in foods" :key="food.id">
                <v-card class="food-card">
                    <v-img
                    :src="food.img_url"
                    height="125"
                    class="grey darken-4"
                    ></v-img>
                    <small>{{ food.name }}</small><br>
                    <small>Amount: {{ food.count }} {{ food.unit }}</small>
                </v-card>
                </v-col>

            </v-row>
            </v-fade-transition>
        </v-container>

            </div>


            <div class="btn-fit">
                <v-btn color="error" @click="buy()">
                    Buy now
                </v-btn>          
            </div>      

        </v-card> 
    </div>
</template>

<script>
import RecipeApi from '../api/RecipeApi'
import store from '../store/index'
export default {
    name: 'SingleRecipe',
    async created() {
        const recipeApi = new RecipeApi;
        this.recipe = await recipeApi.getRecipe(this.$route.params.id)
        this.foods = await this.recipe.foods
        console.log(this.foods)
    },
    data(){
        return{
            recipe: Object,
            foods:[],
        }
    },
    mounted () {
        this.updateImages()
    },
    methods: {
        updateImages () {
        const attachments = document.querySelectorAll('action-text-attachment')
        for (const attachment of attachments) {
            const img = document.createElement('img')
            img.setAttribute('src', attachment.getAttribute('url'))
            attachment.parentNode.replaceChild(img, attachment)
        }
    },
    buy(){
        store.commit("ADDTOCART", {
            foods: this.foods
        });
        this.$router.push({name: 'OrderPay'})
    }
  },
  updated () {
    this.updateImages()
  },

}
</script>

<style scoped>
.container{
    width:800px;
    margin: 0 auto;
    margin-top: 50px;
}

h3{
    text-align: center;
    margin-bottom: 20px;
}

small{
    text-align: center;
    width: 100px;
    margin-left: 20px;
}



.btn-fit{
    margin-left: 42%;
    margin-top: 20px;
    padding-bottom: 20px;
}

.food-card{
    width: 200px;
    margin-left: 80px;
}

.single-recipe-btn{
    text-decoration: none;
}
</style>