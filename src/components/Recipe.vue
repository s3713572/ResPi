<template>
    <div style="margin-left: 40px;">

  <v-card
    class="mx-auto my-12"
    max-width="300"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="200"
      v-bind:src="`${recipe.cover_url}`" class="imageproduit recipe-img"
    ></v-img>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>{{recipe.title}}</v-card-title>

    <v-card-text>
        <div class="content-shortant">
          <small v-html="recipe.content.body"></small>
        </div>


        <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>
                <router-link :to="{ path: `/recipes/${recipe.id}` }">See more...</router-link>
            </v-btn>
        </v-card-actions>
    </v-card-text>

  </v-card>
    </div>
</template>

<script>
export default {
    name: 'Recipe',
    components:{
    },
    props:{
        recipe: Object,
    },
}
</script>

<style scope>
.fas {
  color: rgb(229, 109, 109);
  margin-left: 175px;
}
.img-container{
  height: 200px;
  border: 1px solid red;
  margin-bottom: 20px;
}
.recipe {
  background: white;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid white;
  box-shadow: rgb(247, 3, 3) 0px 5px 15px;
}
.recipe.reminder {
  border-left: 5px solid green;
}
.recipe p{
  color: black;
  font-family: 'Alegreya';
  margin-bottom: 10px;
}

.recipe-img{
    height: 150px;
    width: 200px;
    margin-left: 15%;
}

.content-shortant{
  white-space: nowrap;
  width: 250px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis; 
}



</style>