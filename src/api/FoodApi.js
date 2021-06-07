const axios = require('axios'); //获得axios
const BaseApi = require('./BaseApi.js').default;

class FoodApi extends BaseApi {
  constructor() {
    super('/v1/foods');
  }

  async getAllFood() {
    const response = await axios.get(this.path);
    return response.data.data.foods;
  }

  async getFood(id) {
    const response = await axios.get(`${this.path}/${id}`);
    return response.data.data.foods;
  }
}

export default FoodApi;