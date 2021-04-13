import { createRouter, createWebHistory } from 'vue-router'
import Books from '../components/Books.vue'
import Categories from "../components/Categories";

const routes = [
    {
        path: '/',
        redirect: '/books'
    },
    {
        path: '/books',
        name: 'Books',
        component: Books
    },
    {
        path: '/categories',
        name: 'Categories',
        component: Categories
    },
    {
        path: '/**',
        redirect: '/books'
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router
