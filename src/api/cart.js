import {request} from '@/utils/request'
import axios from "axios";
import {isThenable} from "@babel/core/lib/gensync-utils/async";

export const cartAPI = {
        BASE_URL: "cart",

    generateNewCart: async function (userId) {
        return await axios({
            url: this.BASE_URL+"/addNewCart",
            method: 'post',
            params: {userId:userId}
        })
    },



    addToCart: function (itemQuantity) {
        let config = {
            headers: {'Content-Type': "multipart/json, charset=UTF-8"}
        }
        // return this.$axios
        //     .post('/api/file/testconttype', item, config);
        return axios({
            url:"cart/addToCart",
            method:'post',
            data:itemQuantity
            // params:{jsonParam: item},
            // config
        })
    },

    async getCartId(userId) {
        return axios({
            url: "cart/getCartByUser",
            method: 'get',
            params: {userId: userId}
        });

    },


    async getAllItemsByCart(cartId) {
        console.log("cart api starts")
        let a = await axios({
            url: "cart/getItemsByCart",
            method: 'get',
            params: {cartId: cartId}
        })
        console.log("cart api is "+a)
        return a

    },

    async removeItemsFromCart (cartId, itemNames) {
        return await  axios({
            url: "cart/removeItemsFromCart",
            method: 'delete',
            params: {cartId: cartId, itemNames: itemNames}
        })

    },

    async checkOut (cartId) {
        return await  axios({
            url: "cart/checkOut",
            method: 'delete',
            params: {cartId: cartId}
        })
    },

}
