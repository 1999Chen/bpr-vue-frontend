<template>
  <el-container class="content-container" direction="vertical">
    <div class="table">
      <!-- 表格 -->
      <el-table ref="multipleTableRef" :data="orderList" style="width: 100%"
                @selection-change="handleSelectionChange" tooltip-effect="dark">

        <!-- 商品 -->
        <el-table-column label="order id" prop="name" width="100"   >
          <template #default="scope" >
            <div class ="item" style="text-align:center;"  @click="methods.goToOrderPage(scope.row.orderId)" >
            {{scope.row.orderId}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="cart id" prop="name" width="100"   >
          <template #default="scope" >
            <div class ="item" style="text-align:center;"  @click="methods.goToOrderPage(scope.row.orderId)" >
              {{scope.row.cartId}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="user id" prop="price" width="100">
          <template #default="scope" >
            <div class ="item" style="text-align:center;"  @click="methods.goToOrderPage(scope.row.orderId)" >
              {{scope.row.userId}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="amount" prop="saleCount" width="100" >
          <template #default="scope" >
            <div class ="item" style="text-align:center;"  @click="methods.goToOrderPage(scope.row.orderId)" >
              {{scope.row.amount}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="date" prop="saleCount" width="250">
          <template #default="scope" >
            <div class ="item" style="text-align:center;"   >
              {{scope.row.date}}
            </div>
          </template>
        </el-table-column>


      </el-table>

      <!-- 分页 -->
      <el-pagination background  :total="dataTotal" hide-on-single-page
                     @size-change="handlehSizeChange"
                     @current-change="handlehCurrentChange"
                     :current-page="CurrentPage"
                     :page-sizes="[20, 40, 60, 80, 100]"
                     :page-size="PageSize"
                     layout="total, jumper , prev, pager, next, sizes"

                     popper-class="label-popper"
      />
    </div>
    <!-- 表格结束 -->
  </el-container>
</template>

<script>
import {itemAPI} from "@/api/item";
import {orderAPI} from "@/api/order";
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
// import Mock from "@/tool/Mock"
export default {

  name: "TestPage2",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Delete, Edit, Search, Share, Upload
  },
  data() {
    return {
      // 查询表单

    }
  },

  setup(){

    let router = useRouter();
    const orderList = reactive([])
    const itemList = reactive([])
    const queryParms=reactive({
      name: "", // 商品名称
          username: "", // 用户名称
          receiveUser: "", // 收件人
          payTime: "", // 支付时间
          sendTime: "", // 发货时间
          phone: "", // 手机号
    })
    // 表单校验
    const rules=reactive({
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ]
    })
    // tab选中的内容
    const activeName = ref("all")
        // 数据总数
    const dataTotal = ref(5)

    const onLoad = ref(false)


    const methods = {

      beforeRouteUpdate(to) {
        let pageSize = window.innerHeight > 800 ? 5 : 3;
        // this.orderList = Mock.getGoods(to.params.type, pageSize)
      },

      goToOrderPage(orderId){
        let page_name = "/orderpage";
        console.log("goto item inging" + orderId)
        router.push({
          path: page_name,
          query: {
            orderId: orderId
          },
          // path: './ItemPage',
        });

      },

      async request() {
        // let itemList = []
        itemList.length = 0

        await itemAPI.getAllItems().then(res => {
              for (let item of res.data) {
                itemList.push(item)
              }
            }
        )
        onLoad.value = true;
      },

       async requestOrders() {
         // let itemList = []
         console.log("request orders ")
         await orderAPI.getOrderList().then(res => {
               for (let order of res.data) {
                 orderList.push(order)
                 console.log("order id is "+order.orderId)
                 console.log("order amount is "+order.amount)
                 console.log("order date is "+order.date)
               }
             }
         )
         onLoad.value = true;
       },
    }

    onMounted(async () => {

      await methods.request()
      let pageSize = window.innerHeight > 800 ? 5 : 3;

      await methods.requestOrders()

    });


        return{
          orderList,
          itemList,
          onLoad,
          queryParms,
          rules,
          activeName,
          dataTotal,
          methods
        }

  }




}
</script>

<style scoped lang="scss">
.content-container {
  width: 100%;

  .top {
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 3px 1px rgb(223, 217, 217);
    padding: 10px 0;
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // 输入表单
    .input-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      vertical-align: middle;
    }

    // 按钮组
    .btns {
      display: flex;
      padding: 0 10px;
      margin-left: 40px;
    }
  }


  // 表格
  .table {
    width: 100%;
    flex: 8;
    border: 1px solid #ccc;
    box-shadow: 3px 1px rgb(223, 217, 217);
    padding: 10px 0;
    margin-top: 10px;

    // tab
    .demo-tabs {
      margin-left: 10px;

      .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
      }
    }

    // 表格
    .el-table {
      padding: 5px;
    }

    // 分页
    .el-pagination {
      margin-top: 20px;
    }
  }
}
</style>
