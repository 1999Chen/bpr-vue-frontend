import {request} from '@/utils/request'
import axios from "axios";
import {isThenable} from "@babel/core/lib/gensync-utils/async";

export const userAPI = {

    async validateLogin(username,password) {
        return await axios({
            url: "user/validateLogin",
            method: 'get',
            params: {username: username, password:password}
        })

    },

    async getUserInfo(username) {
        return await axios({
            url: "user/getUserInfo",
            method: 'get',
            params: {username: username}
        })

    },



    async validateRole(username) {
        return await axios({
            url: "user/validateRole",
            method: 'get',
            params: {username: username}
        })

    },

    async updateUserInfo(user) {
        return await axios({
            url: "user/updateUserInfo",
            method: 'post',
            data: user
        })

    },


    async registerUser(username,password) {
        return await axios({
            url: "user/registerUser",
            method: 'get',
            params: {username: username,password:password}
        })

    },

}
