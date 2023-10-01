import {createRouter, createWebHistory} from 'vue-router'
import Preview from '@/views/Preview.vue' // Обратите внимание на путь здесь

const routes = [
    {
        path: '/',
        redirect: '/form' // Перенаправление на страницу формы по умолчанию
    },
    {
        path: '/form',
        component: () => import('@/views/Form.vue'), // Загружаем компонент формы по требованию
        props: true,
    },
    {
        path: '/preview',
        component: () => import('./views/Preview.vue'),
        props: true, // Добавьте это свойство
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
