import {createRouter, createWebHashHistory} from 'vue-router'
import HomePage from "@/components/HomePage";
import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage";
import ItemPage from "@/components/ItemPage";
import AddItemPage from "@/components/subComponents/AddItemPage";
import CartPage from "@/components/subComponents/CartPage";
import TestPage2 from "@/components/subComponents/TestPage2";
import ErrorAuth from "@/components/error/ErrorAuth"

import {store} from '@/store/store.js'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: HomePage,
            meta: {requiresAuth: true}
        },
        {
            path: "/homepage",
            component: HomePage,
            meta: {requiresAuth: true}
        },
        {
            path: "/mainpage",
            component: MainPage,
            meta: {requiresAuth: false}
        },
        {
            path: "/loginpage",
            component: LoginPage,
            meta: {requiresAuth: false}
        },
        {
            path: "/itempage",
            component: ItemPage,
            props: true,
            meta: {requiresAuth: true}
        },
        {
            path: "/additempage",
            component: AddItemPage,
            props: true,
            meta: {requiresAuth: true}
        },
        {
            path: "/cartpage",
            component: CartPage,
            props: true,
            meta: {requiresAuth: false}
        },
        {
            path: "/testpage2",
            component: TestPage2,
            props: true,
            meta: {requiresAuth: true}
        },
        {
            path: "/errorauth",
            component: ErrorAuth,
            props: true,
            meta: {requiresAuth: false}
        }
    ]
});

router.beforeEach((to, from, next) => {
// if (to.matched.some((record)=> record.meta.requiresAuth))
// {
//   if (getAuth().currentUser)
//
// }
    console.log("requires auth？" + to.meta.requiresAuth)
    if (to.meta.requiresAuth && store.role === 'guest') {
        console.log("store role is " + store.role + " and you're not allowed")
        next('/errorauth')

    } else {
        console.log("store role is " + store.role + " and you're allowed")
        next()
    }
})


export default router;
// export const router = createRouter({
//     history: createWebHistory(),
//     routes:[
//         {
//             path: '/', component:HelloWorld
//
//         }
//     ],
//
//
// });
