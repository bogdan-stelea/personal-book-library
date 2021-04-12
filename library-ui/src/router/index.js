import { createRouter, createWebHistory } from 'vue-router'
import Books from '../components/Books.vue'
import Home from '../components/Home'
import Categories from "../components/Categories";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
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
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router
