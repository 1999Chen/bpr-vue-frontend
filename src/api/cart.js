import {request} from '@/utils/request'
import axios from "axios";
import {isThenable} from "@babel/core/lib/gensync-utils/async";

export const cartAPI = {
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

    async getAllItemsByCart(cartId) {
        return await axios({
            url: "cart/getAllItemsByCart",
            method: 'get',
            params: {cartId: cartId}
        })

    },

    async removeItemsFromCart (cartId, itemNames) {
        return await  axios({
            url: "cart/removeItemsFromCart",
            method: 'delete',
            params: {cartId: cartId, itemNames: itemNames}
        })

    },
}
