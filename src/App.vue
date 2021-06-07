<template>
  <v-app>
    <v-app-bar app style="max-height:20%">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">
          <v-toolbar-side-icon>
             <v-img 
              class='mr-3'
              src='@/assets/logo-sushi.png'
              height='64px'
              width='64px'
            ></v-img>
          </v-toolbar-side-icon>
        </router-link>
      </v-toolbar-title>
       {{ appTitle }}
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn :to="'/'" >
          <v-icon left dark>home</v-icon>
          Recipes
        </v-btn>
        <template v-if="isLogin">
          <v-btn :to="'/order'" >
            <v-icon left dark>list</v-icon>
            Orders
          </v-btn>
          <v-btn :to="'/user_info'">
            <v-icon left dark>account_circle</v-icon>
            User Info
          </v-btn>
          <v-btn @click="logout">
            <v-icon left dark>logout</v-icon>
            Logout
          </v-btn>
        </template>
        <template v-else>
          <v-btn :to="'/login'">
            <v-icon left dark>login</v-icon>
            Login
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>
    
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import store from './store/index';
export default {
  name: 'App',
  data(){
    return {
      appTitle: 'ResPi',
    }
  },
  methods: {
    logout() {
      store.commit("LOGOUT");
      this.$router.push({name: 'Recipe'});
    }
  },
  computed: {
    ...mapGetters([
      "isLogin"
    ])
  }
};
</script>

