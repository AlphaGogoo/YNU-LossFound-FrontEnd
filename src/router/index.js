import {createRouter, createWebHashHistory} from 'vue-router'
// import Home from '../views/Home.vue'
import Lost from '../views/Lost.vue'
import Found from "../views/Found.vue";
import Post from "../views/Post.vue";
import PostFound from "@/components/PostFound";
import PostLoss from "@/components/PostLoss";
import Me from "../views/Me";
import Login from "@/views/Login";
import Register from "@/views/Register";
import MyInfo from "@/components/MyInfo";
import LogOut from "@/components/LogOut";
import EditPassword from "@/components/EditPassword";
import MyFounds from "@/components/MyFounds";
import MyLosses from "@/components/MyLosses";
import AboutMe from "@/components/AboutMe";

import {ElMessage} from "element-plus";

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            requireAuth: false
        },
        redirect: () => {
            return {path: '/Lost'}
        },
        component: Lost
    },
    {
        path: '/Lost',
        name: 'Lost',
        meta: {
            requireAuth: false
        },
        component: Lost
    },
    {
        path: '/Found',
        name: 'Found',
        meta: {
            requireAuth: false
        },
        component: Found
    },
    {
        path: '/Post',
        name: 'Post',
        children: [
            {
                path: '/Post/PostLoss',
                component: PostLoss,
            },
            {
                path: '/Post/PostFound',
                component: PostFound,
            }
        ],
        redirect: () => {
            return {path: '/Post/PostLoss'}
        },
        meta: {
            requireAuth: true
        },
        component: Post
    },
    {
        path: '/Me',
        name: 'Me',
        children: [
            {
                path: '/Me/MyInfo',
                component: MyInfo,
            },
            {
                path: '/Me/LogOut',
                component: LogOut,
            },
            {
                path: '/Me/EditPassword',
                component: EditPassword,
            },
            {
                path: '/Me/MyFounds',
                component: MyFounds,
            },
            {
                path: '/Me/MyLosses',
                component: MyLosses,
            },
            {
                path: '/Me/AboutMe',
                component: AboutMe,
            }
        ],
        redirect: () => {
            return {path: '/Me/MyInfo'}
        },
        meta: {
            requireAuth: true
        },
        component: Me
    },
    {
        path: '/Login',
        name: 'Login',
        meta: {
            requireAuth: false
        },
        component: Login
    },
    {
        path: '/Register',
        name: 'Register',
        meta: {
            requireAuth: false
        },
        component: Register
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/Login') {
        if (sessionStorage.getItem('token')) {
            ElMessage({
                message: '已登录，请勿重复登录',
                type: 'error',
                duration: 500
            })
            return false;
        }
    }
    if (to.meta.requireAuth) {//判断该路由是否需要登录权限。
        if (sessionStorage.getItem('token')) {
            //通过cookie获取当前的token是否存在。
            next();
        } else {
            ElMessage({
                message: '请先登录',
                type: 'error',
                duration: 500
            })
            next({
                path: '/Login',
                query: {redirect: to.fullPath}//将跳转的路由path作为参数，登陆成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})

export default router
