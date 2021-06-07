const axios = require('axios'); //获得axios
const BaseApi = require('./BaseApi.js').default;


class OrderApi extends BaseApi {
  constructor(access_token) {
    super('/v1/purchase_orders');
    this.access_token = access_token;
  }

  async getOrders() {
    const response = await axios.get(this.path, { headers: this.headers });
    return response.data.data.purchase_orders;
  }

  get headers() {
    return { 'Authorization': `Bearer ${this.access_token}`}
  }

  async postOrder(orderData){
    orderData.purchase_order_items = this.toOrderItem(orderData.purchase_order_items);

    const response = await axios.post(this.path, orderData, { headers: this.headers })
    if(response.data.message === 'success'){
      return response.data
    }else{
      throw 'Order created fail';
    }
  }

  toOrderItem(items) {
    return items.map((item) => {
                      return {count: item.count, unit: item.unit, id: item.id}
                    })
  }

  async getOrder(id){
    const response = await axios.get(`${this.path}/${id}`, {headers: this.headers});
    return response.data
  }
}

export default OrderApi;