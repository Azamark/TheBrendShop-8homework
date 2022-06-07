<template>
    <article class="product" :id="product.id_product">
        <img :src="require(`../assets/${product.img}`)" alt="item1">
        <div class="product__overlay product__overlay--flex">
            <div class="overlay">
                <div class="add__btn--grey">
                    <my-button-add
                        :button_id="product.id_product"
                        @addItem="addToCart"
                    />
                </div>
            </div>
        </div>
        <div class="product__container">
            <h3 class="product__name"
             @click.stop="goToProduct">
            <b>{{product.product_name}}</b></h3>
            <p> Категория: {{product.category}}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet in magnam excepturi expedita repellat possimus non nisi, nobis a dolore!</p>
            <strong>{{product.price}} Р.</strong>
        </div>
    </article>
</template>

<script>
import MyButtonAdd from './UI/MyButtonAdd.vue';
import { mapActions } from 'vuex'

export default {
    components: {
        MyButtonAdd
    },
    props: {
        product: {
            type: Object,
            required: true,
        }
    },
    methods: {
        ...mapActions({
            GET_PRODUCT: 'catalog/GET_PRODUCT',
        }), 
        addToCart() {
            this.$emit('addToCart', this.product)
        },
        goToProduct() {
            this.GET_PRODUCT(this.product);
            this.$router.push(`/product/${this.product.id_product}`);
        }
    }
};
</script>