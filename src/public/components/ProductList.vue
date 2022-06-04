<template>
    <section class="products-list products-list__wrap container" v-if="products.length > 0">
        <product 
            v-for="product in products"
            :product="product"
            :key="product.id_product"
            @addToCart="addItem"
        />
    </section>
    <h2 v-else style="color: red">Список товаров пуст</h2>
</template>

<script>
import Product from './Product.vue'
import { mapActions } from 'vuex'

export default {
    components: { Product },
    props: {
        products: {
            type: Array,
            required: true,
        }
    },
    data () {
        return {

        }
    },
    methods: {
        ...mapActions({
            ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART'
        }),
        addItem(data){
            this.ADD_PRODUCT_TO_CART(data);
        }
    },
    computed: {

    }
}
</script>