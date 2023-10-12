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
import OrderPage from "@/components/subComponents/OrderPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import RecommendPage from "@/components/RecommendPage.vue";
import userPage from "@/components/UserPage.vue";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: LoginPage,
            meta: {requiresAuth: false}
        },
        {
            path: "/homepage",
            component: HomePage,
            meta: {requiresAuth: true}
        },
        {
            path: "/mainpage",
            component: MainPage,
            meta: {requiresAuth: true}
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
            meta: {requiresAuth: false, requiredAdmin: false}
        },
        {
            path: "/additempage",
            component: AddItemPage,
            props: true,
            meta: {requiresAuth: false, requiredAdmin: true}
        },
        {
            path: "/cartpage",
            component: CartPage,
            props: true,
            meta: {requiresAuth: true, requiredAdmin: false}
        },
        {
            path: "/orderpage",
            component: OrderPage,
            props: true,
            meta: {requiresAuth: true, requiredAdmin: true}
        },
        {
            path: "/testpage2",
            component: TestPage2,
            props: true,
            meta: {requiresAuth: true, requiredAdmin: true}
        },

        {
            path: "/Registerpage",
            component: RegisterPage,
            props: true,
            meta: {requiresAuth: false}
        },


        {
            path: "/errorauth",
            component: ErrorAuth,
            props: true,
            meta: {requiresAuth: false}
        },


        {
            path: "/RecommendPage",
            component: RecommendPage,
            props: true,
            meta: {requiresAuth: true}
        }
        ,


        {
            path: "/userPage",
            component: userPage,
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
    console.log('now the role is '+sessionStorage.getItem('role'))
    if (!to.meta.requiresAuth) {
        next()
    } else if (!to.meta.requiredAdmin) {
        if (sessionStorage.getItem('role')!=null) {
            console.log('now the role is '+sessionStorage.getItem('role'))
            next()
        } else next('/errorauth')
    } else {
        if (sessionStorage.getItem('role') === 'admin') {
            next()
        } else next('/errorauth')
    }

    // if (to.meta.requiresAuth && sessionStorage.getItem('role') === 'admin') {
    //     next('/errorauth')
    // } else {
    //
    // }
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
