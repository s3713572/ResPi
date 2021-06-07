<template>
    <div class="payform-container">

        <h3>Enter details</h3>

        <v-divider></v-divider><br>

        <form @submit.prevent="submit">

            <v-text-field
            v-model="name"
            label="Customer Name"
            required
            ></v-text-field>

            <v-text-field
            v-model="city"
            label="City"
            required
            ></v-text-field>

            <v-text-field
            v-model="address"
            label="Address"
            required
            ></v-text-field>

            <v-text-field
            v-model="state"
            label="State"
            required
            ></v-text-field>

            <v-text-field
            v-model="country"
            label="Country"
            required
            ></v-text-field>
            
            <br>
        <small>Confirm your order</small><br><br>
        <v-data-table
            :headers="headers"
            :items="getOrderFood"
            :items-per-page="5"
            class="elevation-1"
        >
        <template v-slot:item.img_url="{ item }">
            <img :src="item.img_url" style="width: 50px; height: 50px" />
        </template>
        </v-data-table><br><br>

        <v-btn
            class="mr-4"
            type="submit"
        >
            Buy
        </v-btn>
        <v-btn @click="clear">
            clear
        </v-btn>
        </form><br>

    </div>



</template>

<script>
import { mapGetters } from 'vuex';
import OrderApi from '@/api/OrderApi';
export default {
    name:"OrderPay",
    components: {
    },
    props:{
        recipe: Object,
    },
    data: () => ({
      name: '',
      city: 'Melbourne',
      address: '',
      state: 'Vic',
      select: null,
      country: 'Au',
      headers: [
            {
            text: 'Image',
            align: 'start',
            sortable: false,
            value: 'img_url',
            },
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'count' },
            { text: 'Unit', value: 'unit' },

      ],
      checkbox: null,
    }),
    methods: {
      clear () {
        this.name = ''
        this.phoneNumber = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
      async submit(){
        const orderInfo = {
                            address: this.address,
                            city: this.city,
                            customer_name: this.name,
                            state:this.state,
                            country: this.country,
                            purchase_order_items: this.getOrderFood
                          }
        const orderApi = new OrderApi(this.getAccessToken);
        const response = await orderApi.postOrder(orderInfo);

        this.$router.push({name: 'Invoice', params: {id: response.data.order.id}})
      }
    },
    computed: {
        ...mapGetters([
            "isLogin",
            "getOrderFood",
            "getAccessToken"
        ])
    },
    created(){
        if (!this.isLogin){
            this.$router.push({name:'Login'})
        }
    },
    mounted(){
        if (!this.getOrderFood || this.getOrderFood.size === 0){
            this.$router.push({name: 'Recipe'})
        }
    }
}
</script>

<style scoped>
.payform-container{
    width: 500px;
    padding-top:50px;
    margin: 0 auto;

}
</style>