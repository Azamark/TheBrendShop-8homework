<template>
    <div>
        <div
        class="cart__table" 
        v-if="show"
        @click="hide" >
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
            urlCart: '/api/cart/'
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
        hide() {
            this.$emit("update:show", false);
        }
    },
    computed: {
       ...mapGetters({
            cartTotalCost: 'cart/cartTotalCost',
            cartTotalCnt: 'cart/cartTotalCnt',
        })
    }
}
</script>