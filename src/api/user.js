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


}
