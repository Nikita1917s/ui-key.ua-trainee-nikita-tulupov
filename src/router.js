import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/trello-page',
            name: 'trello-page',
            component: Home
            
        },
        {
            component: Home,
            name: 'trello-page',
            path: '/trello-page'
        },
        
    ]
})