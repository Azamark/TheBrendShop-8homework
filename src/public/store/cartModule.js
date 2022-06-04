export const cartModule = {
    state: () => ({
        cartData: [],

    }),
    getters: {
        cart(state) {
            return state.cartData;
        },
        cartTotalCost(state) {
            let result = [];

            for (let elem of state.cartData) {
                result.push(elem.quantity * elem.price);
            }
            result = result.reduce((accum, current) => accum + current, 0);

            return result
        },
        cartTotalCnt(state) {
            return state.cartData.reduce((accum, current) => accum + current.quantity, 0);
        }
    },
    mutations: {
        setCart(state, cartData) {
            state.cartData = cartData;
        },
        add(state, product) {
            state.cartData.push(product);
        },
        increment(state, product) {
            let index = state.cartData.indexOf(product);
            state.cartData[index].quantity++;
        },
        decrement(state, product) {
            let index = state.cartData.indexOf(product);
            state.cartData[index].quantity--;
        },
        delete(state, product) {
            let index = state.cartData.indexOf(product);
            state.cartData.splice(index, 1);
        },
        clear(state) {
            state.cartData.splice(0, state.cartData.length);
        }
    },
    actions: {
        GET_CART({ commit }, data) {
            commit('setCart', data);
        },
        ADD_TO_CART({ commit }, product) {
            let prod = {};
            prod = Object.assign(prod, { quantity: 1 }, product);
            commit('add', prod);
        },
        INCREMENT_ITEM({ commit }, product) {
            commit('increment', product);
        },
        DECREMENT_ITEM({ commit }, product) {
            commit('decrement', product);
        },
        DELETE_FROM_CART({ commit }, product) {
            commit('delete', product)
        },
        CLEAR_CART({ commit }) {
            commit('clear');
        }
    },
    namespaced: true
}