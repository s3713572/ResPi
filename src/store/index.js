import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
const axios = require('axios'); //获得axios

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: Cookies.get("accessToken"),
    expiresIn: null,
    foods: Cookies.get("cart"),
    isLogin: Cookies.get("accessToken") ? true : false
  },
  mutations: {
    AUTH(state, payload) {
      localStorage.setItem('refresh_token', payload.refresh_token)
      state.expiresIn = payload.expires_in;
      Cookies.set("accessToken", payload.access_token, { expires: payload.expires_in });
      state.isLogin = true;
    },
    LOGOUT(state) {
      Cookies.remove('accessToken');
      localStorage.removeItem('refresh_token');
      state.isLogin = false;
    },
    ADDTOCART(state, payload){
      state.foods = payload.foods;
      Cookies.set("cart", payload.foods, { expires: 36000 });
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getAccessToken: (state) => {
      const currentToken = Cookies.get("accessToken");
      const refreshToken = localStorage.getItem('refresh_token');
      const url = process.env.VUE_APP_API_URL || 'http://api-recipe.us-east-1.elasticbeanstalk.com';

      if(currentToken){
        return currentToken;
      }else if(refreshToken){
        // If refresh token is store
        // request new token
        return axios.get(`${url}/auth/request_new_token?refresh_token=${refreshToken}`).then((response) => {
          console.log(response);
          Cookies.set("accessToken", response.data.access_token, { expires: response.data.expires_in });
          state.isLogin = true;
          return Promise.resolve(response.data.access_token);
        });
      }else{
        // if no refresh token && no access token
        return null;
      }
    },
    isLogin: (state) => {
      return state.isLogin
    },
    getOrderFood: (state) =>{
      return state.foods || JSON.parse(Cookies.get("cart")); 
    }
  }
})
