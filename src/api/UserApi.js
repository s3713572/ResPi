const axios = require('axios'); //获得axios

class UserApi {
  constructor() {
    this.api_url = process.env.VUE_APP_API_URL || 'http://api-recipe.us-east-1.elasticbeanstalk.com'
    this.local_var_path = '/auth/userinfo'
  }

  async getUserInfo(accessToken) {
    const response = await axios.get(this.path + `?access_token=${accessToken}`);
    return response.data.data;
  }

  get path() {
    return `${this.api_url}${this.local_var_path}`
  }
}

export default UserApi;