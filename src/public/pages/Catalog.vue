<template>
    <section class="catalog">
        <header class="catalog__header">
            <div class="catalog__header--flex container">
                <h1>Каталог</h1>
            </div>
        </header>
        <div class="filters filters--flex container">
            <my-filter
                :catigories="filter"
                @selectCategories="ADD_CATEGORIES"
            />
        </div>
        <product-list
            :products="searchProduct"
        />
    </section>
</template>

<script>
import MyInput from '../components/UI/MyInput.vue'
import MyFilter from '../components/MyFilter.vue'
import ProductList from '../components/ProductList.vue'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    components: {
        ProductList,
        MyInput,
        MyFilter
    },
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions({
            ADD_CATEGORIES: 'catalog/ADD_CATEGORIES',
        }),
    },
    computed: {
        ...mapState({
            isProducstLoading: state => state.catalog.isProducstLoading,
            filter: state => state.catalog.filter,
        }),
        ...mapGetters({
            searchProduct: 'catalog/searchProduct',
        })
    }
};
</script>