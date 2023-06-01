import {request} from '@/utils/request'
import axios from "axios";


export const orderAPI = {

    BASE_URL: "order",
    async getOrderList() {
        return axios({
            url: this.BASE_URL + "/getAllOrders",
            method: 'get',
        });
    },


    async getOrder(orderId) {
        return axios({
            url: this.BASE_URL + "/getOrderById",
            method: 'get',
            params: {orderId: orderId}
        });
    },


    async getCartId(orderId) {
        return axios({
            url: this.BASE_URL + "/getOrderById",
            method: 'get',
            params: {orderId: orderId}
        });
    },


    async  addOrder(cartId,amount) {
        return axios({
            url: this.BASE_URL+"/generateAnOrder",
            method: 'post',
            params: {cartId: cartId,amount:amount}
        });
    },


}
