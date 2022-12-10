import {createRouter,createWebHashHistory} from 'vue-router'
import HomePage from "@/components/HomePage";
import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage";
import ItemPage from "@/components/ItemPage";
import AddItemPage from "@/components/subComponents/AddItemPage";
import CartPage from "@/components/subComponents/CartPage";
import TestPage2 from "@/components/subComponents/TestPage2";

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:"/",
            component:HomePage
        },
        {
            path:"/homepage",
            component:HomePage
        },
        {
            path:"/mainpage",
            component:MainPage
        },
        {
            path:"/loginpage",
            component:LoginPage
        },
        {
            path:"/itempage",
            component:ItemPage,
            props: true
        },
        {
            path:"/additempage",
            component:AddItemPage,
            props: true
        },
        {
            path:"/cartpage",
            component:CartPage,
            props: true
        },
        {
            path:"/testpage2",
            component:TestPage2,
            props: true
        }
    ]
});
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
