import { createRouter, createWebHistory } from 'vue-router'
import Books from '../screens/Books.vue'

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
        path: '/**',
        redirect: '/books'
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router
