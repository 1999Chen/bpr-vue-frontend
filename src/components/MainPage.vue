<template>
  <el-container class="content-container" direction="vertical">
    <div class="top">
      <!-- 表单输入框开始 -->
      <el-form ref="ruleFormRef"  label-width="120px" class="input-form"
               status-icon>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="queryParms.name" />
        </el-form-item>


        <el-form-item label="商品编号" prop="receiveUser">
          <el-input v-model="queryParms.receiveUser" />
        </el-form-item>

        <el-form-item label="商品分类" prop="payTime">
          <el-select v-model="queryParms.payTime" placeholder="请选择分类">
            <el-option key="2" label="全部" :value="2"></el-option>
            <el-option key="1" label="是" :value="1"></el-option>
            <el-option key="0" label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否上架" prop="payTime">
          <el-select v-model="queryParms.payTime" placeholder="请选择是否上架">
            <el-option key="2" label="全部" :value="2"></el-option>
            <el-option key="1" label="是" :value="1"></el-option>
            <el-option key="0" label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否过期" prop="payTime">
          <el-select v-model="queryParms.payTime" placeholder="请选择是否过期">
            <el-option key="2" label="全部" :value="2"></el-option>
            <el-option key="1" label="是" :value="1"></el-option>
            <el-option key="0" label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 表单输入框结束 -->

      <!-- 表单按钮组开始 -->
      <div class="btns">
        <el-button type="primary">search</el-button>
        <el-button type="primary">remove all filters</el-button>
        <el-button type="primary">新增商品</el-button>
      </div>
      <!-- 表单按钮组结束 -->
    </div>

    <!-- 表格开始 -->
    <div class="table">
      <!-- 表格 -->
      <el-table ref="multipleTableRef" :data="orderList" style="width: 100%"
                @selection-change="handleSelectionChange" tooltip-effect="dark">
        <!-- 多选框 -->
        <el-table-column type="selection" width="55" />
        <!-- 商品 -->
        <el-table-column label="商品" prop="name" width="100">
          <template #default="scope">
            <div style="text-align:center;">
              <el-image :src="scope.row.img" style="width:60px;height:100px;"></el-image>
            </div>
            <div style="text-align:center;">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="price" prop="price" width="100"></el-table-column>
        <el-table-column label="sales" prop="saleCount" width="100"></el-table-column>
        <el-table-column label="Stock" prop="count" width="100"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="small" :type="scope.row.state?'success':'danger'">{{scope.row.state?"下架":"上架"}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="time"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="dataTotal" hide-on-single-page />
    </div>
    <!-- 表格结束 -->
  </el-container>

  <div v-if="onLoad">
    <el-row>
      <el-col :span="4" v-for="item in itemList" :key="item" :offset="1">
        <div class="img">

          <el-card class="el-card-define"
                   :body-style="{ padding: '0px' }"
                   @click="goToItemPage(item.name)"
          >

            <img v-bind:src="item.imageBase64" class="image" alt="err_load_image">

            <div style="padding: 14px;">
              <div class="description">
                <span>{{ item.name }}</span>
              </div>
              <div class="bottom clearfix">
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
  <li><input type="text" size="1" v-model="count"></li>
  <el-button type="text" class="button" @click="change">add items</el-button>
</template>

<script>
import {itemAPI} from "@/api/item";
import {useRouter} from "vue-router";
import {onMounted, reactive, ref, watch} from "vue";
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
export default {
  name: "MainPage",
  data() {
    return {}
  },
  setup() {

    let router = useRouter();
    // let itemList = ref([{ name: 'Foo',id:'1' },])
    let itemList = []
    let count = ref()
    const onLoad = ref(false)

    let items = []

   const queryParms = {
          name: "", // 商品名称
          username: "", // 用户名称
          receiveUser: "", // 收件人
          payTime: "", // 支付时间
          sendTime: "", // 发货时间
          phone: "", // 手机号
    }


    function goToItemPage(itemName) {
      let page_name = "/itempage";
      // let itemName = itemName;
      // goToA(page_name, itemName);
      console.log("goto item inging"+itemName)
      router.push({
        path: page_name,
        query: {
          itemName: itemName
        },
        // path: './ItemPage',
      });
    }

    const change = () => {

      router.push({
        path: "/additempage"
    })
    }
    const uploadItem = () => {
      console.log("you want to add?")

      let item = {
        name: 'uploadTest from web 2 ',
        description: 'you see it if passed',
        region: 'Horsens study room',
        imageBase64: 'data:image/png;base64,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',
        price: 12.5,
        status: 1,
        quantity: 1,
        id: null
      }
      // let str = JSON.stringify(item)
      // console.log("JSON string is "+str)
      itemAPI.uploadItem(item)
      console.log("okay dokay")
    }


    const request = () => {
      itemAPI.getAllItems().then(res => {

            for (let item of res.data) {
              console.log("pushing request" + item.name)

              itemList.push(item)
              console.log("pushing request" + itemList.length)
            }
            // itemList = res.data
          }
      )
    }

    watch(count, (val, old) => {
      console.log("watch 已触发",)
      onLoad.value = true;
      console.log("after watch size is" + itemList.length)
      console.log("after watch list is" + itemList.value)
      console.log("after watch list")
    })


    onMounted(async () => {

      // testList.push({name: 'test passed!!', id: '23'},)
      setTimeout(() => {
        count.value++  // 执行的方法
      }, 1000)  // 时间 1000毫秒 = 1秒

      console.log("before mounted size is" + itemList.length)
      console.log("before mounted is" + itemList.value)
      await request()
      console.log("after mounted size is" + itemList.length)
      console.log("after mounted is" + itemList.value)
      console.log("count is " + count.value)

      items.push({name: 'IDEA', id: '6'},)
      for (let item of Object.keys(itemList)) {
        console.log("pushing it to items--------- ")
        console.log("pushing it to items " + item.name)
        items.push(item)

      }

    });


    return {
      goToItemPage,
      itemList,
      items,
      count,
      onLoad,
      change,
      queryParms,
      uploadItem

    };
  }
}
</script>

<style scoped>

.el-card-define {
  /*min-height: 100%;*/
  height: 400px;
  width: 400px;
}

img {
  width: 300px;
  height: 300px;
  cursor: pointer;
}

description {
  cursor: pointer;
}
</style>
