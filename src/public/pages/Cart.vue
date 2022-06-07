<template>
    <my-order-form
        v-model:show="isShowOrderForm"
        :cartData = "cart"
        @submitOrder="sendOrder"
    />
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
                            <button @click="showOrderForm">Оформить заказ</button>
                            <button @click="$router.push('/')">Продолжить покупки</button>
                            <button @click.stop="clear">Отчистить корзину</button>
                        </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CartItem from '../components/CartItem.vue'
import MyOrderForm from '../components/MyOrderForm.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: { CartItem, MyOrderForm },
    data() {
        return {
            isShowOrderForm: false,
            urlCart: '/api/cart/',
            urlOrder: '/api/orders/',
        }
    },
    methods: {
        ...mapActions({
            BUILD_ACT_DESC: 'userActions/BUILD_ACT_DESC',
        }),
        delItem(cartItem){
            this.BUILD_ACT_DESC({
                action: 'delete',
                data: cartItem,
                url: `${this.urlCart}`,
            });
        },
        increment(cartItem) {
            this.BUILD_ACT_DESC({
                action: 'add',
                data: cartItem,
                url: `${this.urlCart}`,
            });
        },
        remove(cartItem) {
            this.BUILD_ACT_DESC({
                action: 'remove',
                data: cartItem,
                url: `${this.urlCart}`
            });
        },
        clear() {
            this.BUILD_ACT_DESC({
                action: 'clear',
                data: null,
                url: `${this.urlCart}`,
            });
        },
        sendOrder(data) {
            data.items = this.cart;
            this.BUILD_ACT_DESC({
                action: 'submit',
                data: data,
                url: `${this.urlOrder}`
            });
        },
        showOrderForm() {
            this.isShowOrderForm = !this.isShowOrderForm;
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

