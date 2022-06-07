<template>
    <article class="cart-item">
        <img :src="require(`../assets/${cartItem.img}`)" alt="cart_item">
        <div class="cart-item__desc">
            <header class="cart-item__header">
                <h3 @click="goToProduct">
                    {{cartItem.product_name}}
                </h3>
                <button class="button-del" @click.stop="deleteItem"><span>X</span></button>
            </header>
            <div class="cart-item__body cart-item__body--grid">
                <div class="item-price-single">
                    <p>{{cartItem.price}} руб/ед</p>
                </div>
                <div class="item-quantity">
                    <p>Кол-во:
                        <button 
                            class="quantity__btn"
                            @click.stop="decrementItem"
                        >&#8722;</button> 
                        {{cartItem.quantity}}
                        <button
                            class="quantity__btn" 
                            @click.stop="incrementItem"
                        >&#43;</button>
                    </p>
                </div>
                <div class="item-price">
                    <p>{{cartItem.quantity * cartItem.price}}</p>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        cartItem: {
            type: Object,
            required: true,
        }
    },
    methods: {
        ...mapActions({
            GET_PRODUCT: 'catalog/GET_PRODUCT',
        }),
        decrementItem() {
            this.$emit('decrement')
        },
        incrementItem() {
            this.$emit('increment')
        },
        deleteItem(){
            this.$emit('delete');
        },
        goToProduct(){
            this.GET_PRODUCT(this.cartItem);
            this.$router.push(`/product/${this.cartItem.id_product}`);
        }
    }
}
</script>
