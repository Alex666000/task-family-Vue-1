import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/form' // Перенаправление на страницу формы по умолчанию
    },
    {
        path: '/form',
        name: 'form',
        component: () => import('@/views/Form.vue'), // Загружаем компонент формы по требованию
        props: true,
    },
    {
        path: '/preview',
        name: 'preview',
        component: () => import('@/views/Preview.vue'), // Загружаем компонент формы по требованию,
        props: true,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
