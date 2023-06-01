<template>
  <div class="shoppingTrolley">
    <div class="content">
      <div class="major">
        <table>
          <thead>
          <tr>
            <td>Item</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Amount</td>
          </tr>
          </thead>
          <tbody ref="tbody">
          <tr v-for="(item,index) in cartList" :key="index">

            <td>
              <div class="imgbox">
                <img v-bind:src="item.imageBase64" alt="图片走丢了">
              </div>
              <p>{{ item.itemName }}</p>
            </td>
            <td>{{ item.price }}</td>
            <td>
              {{ item.quantity }}
            </td>
            <td style="color: orangered;font-size: 20px">€{{ item.price * item.quantity }}</td>

          </tr>
          </tbody>
        </table>
      </div>
      <div class="settlement" ref="drag">
       Total amount(€): {{data.totalprice}}
      </div>
    </div>
  </div>



</template>

<script>
import {reactive, toRefs, watch, computed, ref, onMounted} from "vue";
import {cartAPI} from "@/api/cart";
import {orderAPI} from "@/api/order";
import {itemAPI} from "@/api/item";
import { ElMessageBox } from 'element-plus'
import {useRoute} from "vue-router";

export default {
  name: "OrderPage",
  setup() {

    const route = useRoute();
    const pageName = route.query.orderId
    const cartId = ref();
    let data = reactive({
      totalprice: 0,

      handleChange(value) {
        console.log(value)
      }
    })

    let cartList = reactive([])

    data.totalprice = computed(() => {
      let totalprice = 0

      cartList.forEach((item) => {

          totalprice += parseInt(item.price) * item.quantity
          console.log("total price is " + totalprice)

      })
      return totalprice
    })


    const methods = {


      async getCartItems(cartId) {

        console.log("cart ID IS " + cartId.value)
        cartAPI.getAllItemsByCart(cartId.value).then(resOfGetAllItemsByCart => {
          cartList.length = 0
          for (let itemQuantity of resOfGetAllItemsByCart.data) {
            console.log("data.quantity" + resOfGetAllItemsByCart.data.quantity)
            itemAPI.getItemInfo(itemQuantity.itemName).then(resOfGetItemInfo => {
              itemQuantity.imageBase64 = resOfGetItemInfo.data.imageBase64
              itemQuantity.price = resOfGetItemInfo.data.price
              itemQuantity.checked = ''

              cartList.push(itemQuantity)
            })

          }
        })
        console.log("cartList" + cartList)
        cartList.length = 0
        console.log("cartList" + cartList)
      },

    }

    onMounted(async () => {
      console.log("pageName is "+pageName)


      await orderAPI.getCartId(pageName).then(async res => {
            cartId.value = res.data.cartId
            console.log("cart id is " + cartId.value)
            await methods.getCartItems(cartId)
          }
      )


    })

    return {
      data,
      cartId,
      pageName,
      cartList,
      methods,

    }

  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.shoppingTrolley {

}

.shoppingTrolley .content {
  width: 1250px;
  margin: 0 auto;
  min-height: 700px;
  box-sizing: border-box;
}

.shoppingTrolley .content .major {
  border: 1px solid skyblue;
  border-radius: 10px 10px 0 0;
}

table {
  width: 100%;
}

table thead {

}

table thead tr {
  box-shadow: #fcdcdc 15px 15px 0px;
  border-bottom: 1px solid #cbc5c5;
  background: #ebebeb;
  border-radius: 10px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

table thead tr td {
  border-right: 1px solid rosybrown;
  flex: 1;
}

table thead tr td:nth-of-type(2) {
  flex: 3;
}

tbody .imgbox {
  width: 80px;
  overflow: hidden;
}

tbody .imgbox img {
  height: 80px;
  width: 100%;
}

table tbody tr {
  padding: 20px 10px;
  border-bottom: 1px solid rosybrown;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

table tbody tr td {
  flex: 1;
}

table tbody tr td:nth-of-type(2) {
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.settlement {
  display: flex;
  height: 80px;
  align-items: center;
  border-radius: 0 0 10px 10px;
  border: 1px solid rebeccapurple;
  justify-content: space-around;
  background: #f5f8fa;
}

.settlement div:last-of-type button {
  border: 0;
  display: inline-block;
  width: 70px;
  height: 40px;
  border-radius: 10px;
  background: antiquewhite;
  color: white;
  font-weight: bolder;
  cursor: pointer;
}
</style>


