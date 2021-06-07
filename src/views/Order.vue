<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="orders"
        :items-per-page="15"
        class="elevation-1" 
    >
        <template v-slot:item.id="{ item }">
            <a :href="'/invoice/' + item.id" style="width: 50px; height: 50px"> {{item.id}}</a>
        </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OrderApi from '../api/OrderApi'
export default {
    name:'Order',
    data(){
        return{
            orders:[],
            headers:[          
            {
                text: 'Id',
                align: 'start',
                sortable: true,
                value: 'id',
                href: '#'
            },
            { text: 'Customer', value: 'customer_name' },
            { text: 'Address', value: 'address' },
            { text: 'City', value: 'city' },
            { text: 'Country', value: 'country' },
            { text: 'State', value: 'state' },
            { text: 'Created at', value: 'created_at' },

          ],
        }
    },
    async created(){
        if (!this.isLogin){
            this.$router.push({name:'Login'})
        }
        const orderApi = new OrderApi(this.getAccessToken);
        this.orders = await orderApi.getOrders();
        console.log(this.orders)

    },
    computed: {
        ...mapGetters([
            "isLogin",
            "getAccessToken"
        ])
    }
}


</script>
