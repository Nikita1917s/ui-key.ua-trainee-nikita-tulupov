import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/trello-page',
            // name: 'trello-page',
            component: Home,
            meta:{title: 'Dashboard'}
        },
        {
            component: Home,
            name: 'trello-page',
            path: '/trello-page',
            meta:{title: 'Dashboard'}
        },
        
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router