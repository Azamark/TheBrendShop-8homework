<template>
    <section class="cart">
        <header class="cart__header">
            <div class="cart__header--flex container">
                <h1>КОРЗИНА</h1>
            </div>
        </header>
        <div class="cart__main container">
            <div class="cart__main--flex">
                <div class="cart__items cart__items--flex">
                        <cart-item
                            v-for="cartItem in cart"
                            :cartItem="cartItem"
                            :key="cartItem.id_product"
                            @delete="delItem(cartItem)"
                            @decrement="remove(cartItem)"
                            @increment="increment(cartItem)"
                        />
                        <div class="cart__main-common">
                            <div class="total-price">
                                Полная стоимость: {{cartTotalCost}} Р.
                            </div>
                        </div>
                        <div class="cart__items-btns">
                            <button @click="$router.push('/')">Продолжить покупки</button>
                            <button @click.stop="clear">Отчистить корзину</button>
                        </div>
                </div>
                <!-- <div class="shopform shopform--flex">
                    <h2>Форма заказа</h2>
                    <my-order-form
                        @prepOrder="sendOrder"
                    />
                </div> -->
            </div>
        </div>
    </section>
</template>

<script>
import CartItem from '../components/CartItem.vue'
//import MyOrderForm from '../components/MyOrderForm.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {CartItem},
    data() {
        return {
            
        }
    },
    props: {    
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
        clear() {
            this.CLEAR_CART();
        },
        sendOrder(data) {
            console.log(data)
        }
    },
    computed: {
        ...mapGetters({
            cart: 'cart/cart',
            cartTotalCost: 'cart/cartTotalCost',
            cartTotalCnt: 'cart/cartTotalCnt'
        })
    },
}
</script>

