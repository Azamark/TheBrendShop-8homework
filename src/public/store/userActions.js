export const userActions = {
    state: () => ({
        actDescription: {}
    }),
    getters: {
        getActDescription(satet) {
            return satet.actDescription;
        }
    },
    mutations: {
        setActDescription(state, obj) {
            state.actDescription = obj;
        }
    },
    actions: {
        HANDLER({ dispatch, state, rootGetters }) {
            switch (state.actDescription.action) {
                case 'add':
                    let find = rootGetters['cart/cart'].find(el => el.id_product === state.actDescription.data.id_product);
                    if (find) {
                        dispatch('cart/INCREMENT_ITEM', find, { root: true });
                        dispatch('api/PUT_JSON', {
                            url: state.actDescription.url,
                            id: state.actDescription.data.id_product,
                            data: { quantity: 1 }
                        }, { root: true });
                    } else {
                        dispatch('cart/ADD_TO_CART', state.actDescription.data, { root: true });
                        dispatch('api/POST_JSON', {
                            url: state.actDescription.url,
                            id: state.actDescription.data.id_product,
                            data: rootGetters['cart/cart'][rootGetters['cart/cart'].length - 1]
                        }, { root: true });
                    }
                    break;
                case 'delete':
                    dispatch('cart/DELETE_FROM_CART', state.actDescription.data, { root: true });
                    dispatch('api/DELETE_JSON', {
                        url: state.actDescription.url,
                        id: state.actDescription.data.id_product,
                    }, { root: true });
                    break;
                case 'remove':
                    if (state.actDescription.data.quantity > 1) {
                        dispatch('cart/DECREMENT_ITEM', state.actDescription.data, { root: true });
                        dispatch('api/PUT_JSON', {
                            url: state.actDescription.url,
                            id: state.actDescription.data.id_product,
                            data: { quantity: -1 }
                        }, { root: true });
                    } else {
                        dispatch('cart/DELETE_FROM_CART', state.actDescription.data, { root: true });
                        dispatch('api/DELETE_JSON', {
                            url: state.actDescription.url,
                            id: state.actDescription.data.id_product,
                        }, { root: true });
                    }
                    break;
                case 'clear':
                    dispatch('cart/CLEAR_CART', null, { root: true });
                    dispatch('api/CLEAR_JSON', { url: state.actDescription.url }, { root: true });
                    break;
                case 'submit':
                    dispatch('api/POST_JSON', {
                        url: state.actDescription.url,
                        data: state.actDescription.data
                    }, { root: true });
                    break
                default:
                    console.log("Действие не найдено")
            }
        },
        BUILD_ACT_DESC({ commit, dispatch }, obj) {
            commit('setActDescription', obj);
            dispatch('HANDLER');
        },
    },
    namespaced: true
}