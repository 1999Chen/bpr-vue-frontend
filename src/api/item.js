import {request} from '@/utils/request'
import axios from "axios";
import {isThenable} from "@babel/core/lib/gensync-utils/async";

export const itemAPI = {
    BASE_URL: "item",

    getItemTest: function () {
        return request({
            url: this.BASE_URL + "/test1",
            method: "get"

        })
    },


    getItem: function (name) {
        return request({
            url: this.BASE_URL + "/test1",
            method: "get",
            data: {name: name}
        })
    },


    alldata: function (data) {
        return axios({
            url: "item/test1",
            method: 'get',
            data
        })
    },

    getItemInfo: function (name) {
        return axios({
            url: "item/getItemByName",
            method: 'get',
            params: {name: name}
        })
    },

    getAllItems: async function () {
        return await axios({
            url: "item/getAllItems",
            method: 'get',
        })

    },

    uploadItem: function (item) {
        let config = {
            headers: {'Content-Type': "multipart/json, charset=UTF-8"}
        }
        // return this.$axios
        //     .post('/api/file/testconttype', item, config);
        return axios({
            url:"item/uploadItem",
            method:'post',
            data:item
            // params:{jsonParam: item},
            // config
        })
    },
// export const alldata=(data)=>{
//     return axios({
//         url:"item/test1",
//         method:'get',
//         data
//     })
// }

}

