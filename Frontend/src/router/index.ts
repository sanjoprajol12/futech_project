import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Createblog from '../pages/Createblog.vue'
import Profile from '../pages/Profile.vue'
import ForgotAccount from '../pages/ForgotAccount.vue'



const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/createblog', component: Createblog },
    { path: '/profile', component: Profile },
    { path: '/forgotaccount', component: ForgotAccount },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
