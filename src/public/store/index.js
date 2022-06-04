import { createStore } from "vuex";
import { catalogModule } from "./catalogModule";
import { cartModule } from "./cartModule";
import { apiModule } from "./apiModule";

export default createStore({
    state: {

    },
    mutations: {

    },
    actions: {
        ADD_PRODUCT_TO_CART({ dispatch, rootGetters }, item) {
            let find = rootGetters['cart/cart'].find(el => el.id_product === item.id_product);
            if (find) {
                dispatch('cart/INCREMENT_ITEM', find, { root: true });
                dispatch('api/PUT_JSON', { quantity: { quantity: 1 }, id: find.id_product }, { root: true });
            } else {
                dispatch('cart/ADD_TO_CART', item, { root: true });
                dispatch('api/POST_JSON', rootGetters['cart/cart'][rootGetters['cart/cart'].length - 1], { root: true });
            }
        },
        DELETE_PRODUCT_FROM_CART({ dispatch }, item) {
            dispatch('cart/DELETE_FROM_CART', item, { root: true });
            dispatch('api/DELETE_JSON', { id: item.id_product }, { root: true });
        },
        REMOVE_PRODUCT_FROM_CART({ dispatch }, item) {
            if (item.quantity > 1) {
                dispatch('cart/DECREMENT_ITEM', item, { root: true });
                dispatch('api/PUT_JSON', { quantity: { quantity: -1 }, id: item.id_product }, { root: true });
            } else {
                dispatch('DELETE_PRODUCT_FROM_CART', item);
            }
        },
        CLEAR_CART({ dispatch }) {
            dispatch('cart/CLEAR_CART', null, { root: true });
            dispatch('api/CLEAR_JSON', '/api/cart/', { root: true });
        }
    },
    modules: {
        catalog: catalogModule,
        cart: cartModule,
        api: apiModule
    }
})