<template>
    <div>
        <div 
        v-if="show"
        @click="hideCartMini" 
        class="cart__table">
                <div class="cart__top cart__top--flex">
                    <cart-item
                        v-for="cartItem in cartData"
                        :cartItem="cartItem"
                        :key="cartItem.id_product"
                        @delete="delItem(cartItem)"
                        @decrement="remove(cartItem)"
                        @increment="increment(cartItem)"
                    />
                </div>
                <div class="cart__bottom cart__bottom--flex">
                    <button class="cart__link" @click="$router.push('/cart')">
                        <p>КОРЗИНА</p>
                    </button>
                    <div class="full-price">
                        <p>Полная стоимость: {{cartTotalCost}} Р.</p>
                    </div>
                </div>
        </div>
        <div class="counter">
            <div class="counter_flex">
                {{cartTotalCnt}}
            </div>
        </div>
    </div>
</template>

<script>
import CartItem from './CartItem.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {CartItem},
    data() {
        return {

        }
    },
    props: { 
        show: { 
            type: Boolean, 
            default: false 
        },
        cartData: {
            type: Array,
            required: true,
        }
    },
    methods: {
        ...mapActions({
            ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
            REMOVE_PRODUCT_FROM_CART: 'REMOVE_PRODUCT_FROM_CART',
            DELETE_PRODUCT_FROM_CART: 'DELETE_PRODUCT_FROM_CART',
            CLEAR_CART: 'CLEAR_CART'
        }),
       delItem(cartItem){
            this.DELETE_PRODUCT_FROM_CART(cartItem);
        },
        increment(cartItem) {
            this.ADD_PRODUCT_TO_CART(cartItem);
        },
        remove(cartItem) {
            this.REMOVE_PRODUCT_FROM_CART(cartItem);
        },
        hideCartMini() {
            this.$emit("update:show", false);
        }
    },
    computed: {
       ...mapGetters({
            cartTotalCost: 'cart/cartTotalCost',
            cartTotalCnt: 'cart/cartTotalCnt'
        })
    }
}
</script>