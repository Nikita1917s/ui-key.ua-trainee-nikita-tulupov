import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Authorisation from './views/Authorisation';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/Authorisation',
            component: Home,
            meta: { title: 'Dashboard' }
        },
        {
            component: Home,
            name: 'trello-page',
            //redirect: authPage,
            path: '/trello-page',
            meta: { title: 'Dashboard' }
        },
        {
            component: Authorisation,
            name: 'Authorisation',
            path: '/Authorisation',
            meta: { title: 'Authorisation' }
        },
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router