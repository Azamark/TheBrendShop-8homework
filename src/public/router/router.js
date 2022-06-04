import { createRouter, createWebHistory } from 'vue-router'
import Cart from '../pages/Cart.vue'
import Catalog from '../pages/Catalog.vue'
import ProductId from '../pages/ProductId.vue'

const routes = [
    {
        path: '/',
        component: Catalog
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/product/:id',
        component: ProductId
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;