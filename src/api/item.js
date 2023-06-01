import {request} from '@/utils/request'
import axios from "axios";
import {isThenable} from "@babel/core/lib/gensync-utils/async";

export const itemAPI = {
    BASE_URL: "item",

    getItemsByFilters: function (queryParams) {
        return axios({
            url: this.BASE_URL+"/getItemsByFilters",
            method: "get",
            params: {
                keyword: queryParams.keyword,
                region: queryParams.regions,
                category: queryParams.categories
            }
        })
    },


    getItemInfo: function (name) {
        return axios({
            url: "item/getItemByName",
            method: 'get',
            params: {name: name}
        })
    },

    updateItemInfo: function (item) {
        return axios({
            url:"item/updateItem",
            method:'post',
            data:item
            // params:{jsonParam: item},
            // config
        })
    },




    getAllItems: async function () {
        return await axios({
            url: "item/getAllItems",
            method: 'get',
        })

    },

    uploadItem: function (item) {
        console.log("item adding"+item.name)
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




    removeItem: function (itemName) {
        let config = {
            headers: {'Content-Type': "multipart/json, charset=UTF-8"}
        }
        // return this.$axios
        //     .post('/api/file/testconttype', item, config);
        console.log("remove API---------"+itemName)
        return axios({
            url:"item/removeItem",
            method:'delete',
            params: {itemName: itemName}
            // params:{jsonParam: item},

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

