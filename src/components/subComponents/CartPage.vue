<template>
  <div class="shoppingTrolley">
    <div class="content">
      <div class="major">
        <table>
          <thead>
          <tr>
            <td>
              <el-checkbox v-model="checkAll" @click="methods.goCheckAll()" label="全选" size="large"/>
              <!--                <input type="checkbox" v-model="checkAll" @click="goCheckAll()"> 全选-->
            </td>
            <td>Item</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Amount</td>
            <td>Operation</td>
          </tr>
          </thead>
          <tbody ref="tbody">
          <tr v-for="(item,index) in cartList" :key="index">
            <td>
              <el-checkbox @click="methods.goCheck(item)" v-model="item.checked" size="large"/>
              <!--                <input type="checkbox" @click="goCheck(item)" v-model="item.checked"> 选中-->
            </td>
            <td>
              <div class="imgbox">
                <img v-bind:src="item.imageBase64" alt="图片走丢了">
              </div>
              <p>{{ item.itemName }}</p>
            </td>
            <td>{{ item.price }}</td>
            <td>
              <el-input-number v-model="item.quantity" :min="1" :max="99" @change="handleChange"/>
            </td>
            <td style="color: orangered;font-size: 20px">${{ item.price * item.quantity }}</td>
            <td>删除</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="settlement" ref="drag">
        <div>
          <el-checkbox v-model="checkAll" @click="methods.goCheckAll()" label="全选" size="large"/>
        </div>
        <el-button @click="methods.removeFromCart()">
          Remove
        </el-button>
        <div>已选商品{{ totalnum }}</div>
        <div>
          合计 <span style="color: orangered;font-size: 20px">${{ totalprice }}</span>
        </div>
        <div>
          <el-button @click="dialogVisible = true">check out</el-button>

          <el-dialog
              title="Check out"
              v-model="dialogVisible"
              width="30%"
              :before-close="handleClose">
            <span>total price is ${{ totalprice }}</span>
            <br>
            <span>ready to pay?</span>
            <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">Not yet</el-button>
      <el-button type="primary" @click="dialogVisible = false">Yes</el-button>
    </span>
            </template>
          </el-dialog>

        </div>
      </div>
    </div>
  </div>



</template>

<script>
import {reactive, toRefs, watch, computed, ref, onMounted} from "vue";
import {cartAPI} from "@/api/cart";
import {itemAPI} from "@/api/item";
import { ElMessageBox } from 'element-plus'

export default {
  name: "CartPage",
  setup() {
    const dialogVisible = ref(false)
    let data = reactive({
      //是否全选
      checkAll: false,
      //总合计价格
      totalprice: 0,
      //总数量
      totalnum: 0,
      handleChange(value) {
        console.log(value)
      }
    })

    //购物车数据 此处数据应来自服务器接口
    let cartList = reactive([])
    const methods = {

      getCartInfo(cartId) {
        cartAPI.getAllItemsByCart(cartId).then(resOfGetAllItemsByCart => {
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


      goCheck(item) {
        //数值是点击之前的值 所以要取反
        //定义一个长度
        let length = 1
        cartList.forEach((i) => {
          if (i.checked) {
            length++
          }
        })

        if (length === cartList.length) {
          data.checkAll = true
        } else {
          data.checkAll = false
        }

      },

      goCheckAll() {
        //数值是点击之前的值 所以要取反
        if (!data.checkAll) {
          cartList.forEach((item) => {
            item.checked = true
          })
        } else {
          cartList.forEach((item) => {
            item.checked = false
          })
        }
      },

      removeFromCart() {
        console.log("removeFromCart")
        let removeList = ''
        cartList.forEach((item) => {
          if (item.checked) {
            if (removeList.length===0) {
              removeList += item.itemName
            } else {
              removeList += '@' + item.itemName
            }
          }
        })
        cartAPI.removeItemsFromCart(1, removeList)
        console.log("removeList" + removeList)
        this.getCartInfo(1)
      },

      checkOut() {
        let checkOutList = []
        cartList.forEach((item) => {
          if (item.checked){
            checkOutList.push(item)
          }
        })
      },



    }
    //计算属性
    data.totalprice = computed(() => {
      let totalprice = 0

      cartList.forEach((item) => {
        if (item.checked) {
          totalprice += parseInt(item.price) * item.quantity
          console.log("total price is " + totalprice)
        }
      })
      return totalprice
    })

    data.totalnum = computed(() => {
      let totalnum = 0

      cartList.forEach((item) => {
        if (item.checked) {
          totalnum++
        }
      })
      return totalnum
    })

    const drag = ref(null)

    const tbody = ref(null)

    let numValue = ref(0)

    onMounted(() => {

      methods.getCartInfo(1)
      numValue = tbody.value.offsetHeight + tbody.value.offsetTop
      //获取滚动条的高度
      // window.addEventListener('scroll',handleScroll,true)
    })

    /*
    function handleScroll(){
      let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)
      if(top < (numValue - 132)){
        drag.value.style = 'position: fixed;\n' +
              '    bottom: 0;\n' +
              '    z-index: 10;\n' +
              '    width: 1250px;'
        }else {
        drag.value.style = ' '
      }
    }*/

    return {
      ...toRefs(data),
      cartList,
      dialogVisible,
      methods,
      drag,
      tbody
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
