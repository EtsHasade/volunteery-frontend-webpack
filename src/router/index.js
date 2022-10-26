import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '../views/home-page';
import eventiApp from '../views/eventi-app';
import orgApp from '../views/org-app';
import orgEdit from '../views/org-edit';
import eventiEdit from '../views/eventi-edit';
import login from '../views/login';
import eventiDetails from '../views/eventi-details';
import orgDetails from '../views/org-details';
import userDetails from '../views/user-details';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: homePage
    },
    {
        path: '/eventi-app',
        name: 'eventiApp',
        component: eventiApp
    },
    {
        path: '/org-app',
        name: 'orgApp',
        component: orgApp
    },
    {
        path: '/org-edit/:orgId?',
        name: 'orgEdit',
        component: orgEdit
    },
    {
        path: '/eventi-edit/:_id?',
        name: 'eventiEdit',
        component: eventiEdit
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/eventi-details/:eventiId',
        name: 'eventiDetails',
        component: eventiDetails
    },
    {
        path: '/org-details/:orgId',
        name: 'orgDetails',
        component: orgDetails
    },
    {
        path: '/user-details/:userId',
        name: 'userDetails',
        component: userDetails
    },

]

const router = new VueRouter({
    routes
})

export default router