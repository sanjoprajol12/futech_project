import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Login from '@/pages/login.vue'
import Register from '@/pages/Register.vue'
import CreateBlog from '@/pages/Createblog.vue'
import Profile from '@/pages/Profile.vue'
import ForgotAccount from '@/pages/ForgotAccount.vue'
import Blog from '@/pages/Blog.vue'
import TwoFactor from '@/pages/two_factor.vue'
import UpdatePassword from '@/pages/updatepassword.vue'
import ForgotPass from '@/pages/forgotpass.vue'
import BlogShow from '@/pages/BlogShow.vue'
import BlogDetail from '@/pages/BlogDetail.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/createblog', name: 'create-blog', component: CreateBlog },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/forgotaccount', name: 'forgot-account', component: ForgotAccount },
  { path: '/blog', name: 'blogs', component: Blog },
  { path: '/blogshow', name: 'blog-show', component: BlogShow },

  // 🔥 IMPORTANT ONE
  {
    path: '/blog/:id',
    name: 'blog-detail',
    component: BlogDetail,
    props: true, // allows id as prop
  },

  { path: '/two_factor', name: 'two-factor', component: TwoFactor },
  { path: '/updatepassword', name: 'update-password', component: UpdatePassword },
  { path: '/forgotpass', name: 'forgot-pass', component: ForgotPass },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
