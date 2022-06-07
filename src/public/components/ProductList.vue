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
            urlCart: '/api/cart/'
        }
    },
    methods: {
        ...mapActions({
            BUILD_ACT_DESC: 'userActions/BUILD_ACT_DESC',
        }),
        addItem(prod){
            this.BUILD_ACT_DESC({
                action: 'add',
                data: prod,
                url: `${this.urlCart}`,
            });
        }
    },
}
</script>