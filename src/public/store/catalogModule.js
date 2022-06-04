export const catalogModule = {
    state: () => ({
        products: [],
        product: {},
        searchQuery: '',
        filtredCategory: [],
        filter: ['Men', 'Women', 'Kids']
    }),
    getters: {
        products(state) {
            return state.products;
        },
        product(state) {
            return state.product;
        },
        selectCategories(state) {
            let data = [];
            if (state.filtredCategory.length) {
                data = state.products.filter(el => {
                    return state.filtredCategory.indexOf(el.category.toString()) != -1
                });
            } else {
                data = state.products;
            }
            return data
        },
        searchProduct(state, getters) {
            return getters.selectCategories.filter(product => {
                return product.product_name.toLowerCase().includes(state.searchQuery.toLowerCase())
            });
        }
    },
    mutations: {
        setProduct(state, product) {
            state.product = product
        },
        setProducts(state, products) {
            state.products = products;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setfiltredCategory(state, category) {
            state.filtredCategory = category;
        }
    },
    actions: {
        GET_PRODUCT({ commit }, product) {
            commit('setProduct', product);
        },
        GET_PRODUCTS({ commit }, products) {
            commit('setProducts', products);
        },
        ADD_CATEGORIES({ commit }, category) {
            commit('setfiltredCategory', category);
        }
    },
    namespaced: true
}