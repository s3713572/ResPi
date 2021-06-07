const axios = require('axios'); //获得axios
const BaseApi = require('./BaseApi.js').default;

class RecipeApi extends BaseApi {
  constructor() {
    super('/v1/recipes');
  }

  async getAllRecipes() {
    const response = await axios.get(this.path);
    return response.data.data.recipes;
  }

  async getRecipe(id) {
    const response = await axios.get(`${this.path}/${id}`);
    return response.data.data;
  }
}

export default RecipeApi;