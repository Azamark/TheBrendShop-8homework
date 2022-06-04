<template>
    <div class="wrapper">
        <div class="wrapper-top">
            <my-header/>
            <main class="main">
                <router-view></router-view>
            </main>
        </div>
        <my-footer/>
    </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import { mapActions } from 'vuex'
export default {
    components: {MyHeader, MyFooter},
    methods: {
        ...mapActions({
            GET_JSON: 'api/GET_JSON',
            GET_PRODUCTS: 'catalog/GET_PRODUCTS',
            GET_CART: 'cart/GET_CART'
        }),
    },
    computed: {

    },
    mounted() {
        this.GET_JSON('/api/products')
            .then(data => this.GET_PRODUCTS(data))
        this.GET_JSON('/api/cart')
            .then(data => this.GET_CART(data))
    }
};
</script>
