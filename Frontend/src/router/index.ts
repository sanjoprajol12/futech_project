import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import login from '@/pages/login.vue'
import Register from '../pages/Register.vue'
import Createblog from '../pages/Createblog.vue'
import Profile from '../pages/Profile.vue'
import ForgotAccount from '../pages/ForgotAccount.vue'
import Blog from '../pages/Blog.vue'
import two_factor from '../pages/two_factor.vue'
import updatepassword from '../pages/updatepassword.vue'
import forgotpass from '../pages/forgotpass.vue'





const routes = [
    { path: '/', component: Home },
    { path: '/login', component: login },
    { path: '/register', component: Register },
    { path: '/createblog', component: Createblog },
    { path: '/profile', component: Profile },
    { path: '/forgotaccount', component: ForgotAccount },
    { path: '/blog', component: Blog },
    { path: '/two_factor', component: two_factor },
    {path: '/updatepassword', component: updatepassword},
    {path: '/forgotpass', component: forgotpass}
    


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
