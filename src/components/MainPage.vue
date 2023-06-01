<template>
  <el-container class="content-container" direction="vertical"   style="background: beige;">
    <div class="top">
      <!-- 表单输入框开始 -->
      <el-form ref="ruleFormRef" label-width="120px" class="input-form"
               status-icon>
        <el-form-item label="item name" prop="name">
          <el-input v-model="queryParams.keyword" style="width: 300px"/>
        </el-form-item>


        <el-form-item label="item region" prop="payTime">
          <el-button
              v-model="checkAllRegion"
              @click="handlecheckAllRegion"
              class="checkbox"
          >Mark all regions
          </el-button>

          <el-checkbox
              v-for="(region, index) in regionList"
              :key="region.name"
              :label="region.name"
              v-model="region.checked"
              @click="goCheckRegion(region)"
          >
            {{ region.name }}
          </el-checkbox>
        </el-form-item>


        <el-form-item label="item region" prop="payTime">

          <el-button
              v-model="checkAllCategory"
              @click="handlecheckAllCategory"
              class="checkbox"
          >Mark all categories
          </el-button>

          <el-checkbox
              v-for="(category, index) in categoryList"
              :key="category.name"
              :label="category.name"
              v-model="category.checked"
              @click="goCheckRegion(region)"
          >
            {{ category.name }}
          </el-checkbox>
        </el-form-item>


      </el-form>
      <!-- 表单输入框结束 -->

      <!-- 表单按钮组开始 -->
      <div class="btns">
        <el-button type="primary" @click="search">search</el-button>
        <el-button type="primary" v-if="isAdmin">add a new item</el-button>
      </div>
      <!-- 表单按钮组结束 -->
    </div>


    <div class="table">
      <!-- 表格 -->
      <el-table ref="multipleTableRef" :data="state.tableData1" style="width: 100%"
                @selection-change="handleSelectionChange"
                tooltip-effect="dark">
        <!-- 多选框 -->

<!--        <el-table-column type="selection" width="55"/>-->
        <!-- 商品 -->
        <el-table-column label="name" prop="name" width="222" >
          <template #default="scope" >
            <div class ="item" style="text-align:center;" @click="goToItemPage(scope.row.name)"  >
              <el-image :src="scope.row.imageBase64" style="width:80px;height:100px;"  ></el-image>
            </div>
            <div class ="item"  style="text-align:center;"  @click="goToItemPage(scope.row.name)"  >
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="price(Euro)" prop="itemPrice" width="144"
                         style="background: #fcdcdc;"
        >
          <template #default="scope">
            <div style="text-align:center;">

            </div>
            <div style="text-align:center;">
              {{ scope.row.price }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="region" prop="region" width="155">
          <template #default="scope">
            <div style="text-align:center;">
              {{ scope.row.region }}
            </div>
          </template>
        </el-table-column>    <el-table-column label="category" prop="in stock" width="155">
        <template #default="scope">
          <div style="text-align:center;">
            {{ scope.row.category }}
          </div>
        </template>
      </el-table-column>
        <el-table-column label="in stock" prop="in stock" width="155">
          <template #default="scope">
            <div style="text-align:center;">
              {{ scope.row.quantity }}
            </div>
          </template>
        </el-table-column>

        <el-table-column v-if="isAdmin" label="operation" width="100">
          <template #default="scope">
            <el-button size="small" v-if="isAdmin" @click="deleteItem(scope.row.name)">remove
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页 -->
      <el-pagination background layout="total, jumper , prev, pager, next, sizes"
                     @size-change="handlehSizeChange"
                     @current-change="handlehCurrentChange"
                     :current-page="state.currentPage"
                     :page-sizes="[8, 16, 24, 32, 40]"
                     :page-size="state.PageSize"
                     :total="state.Total" hide-on-single-page/>
    </div>


    <div class="top">
      <!-- 表单输入框开始 -->
      <el-form ref="ruleFormRef" label-width="120px" class="input-form"
               status-icon>
        <el-form-item label="item name" prop="name">
          <el-input v-model="queryParams.keyword"/>
        </el-form-item>


        <el-form-item label="item region" prop="payTime">
          <el-button
              v-model="checkAllRegion"
              @click="handlecheckAllRegion"
              class="checkbox"
          >Mark all regions
          </el-button>

          <el-checkbox
              v-for="(region, index) in regionList"
              :key="region.name"
              :label="region.name"
              v-model="region.checked"
              @click="goCheckRegion(region)"
          >
            {{ region.name }}
          </el-checkbox>
        </el-form-item>


        <el-form-item label="item region" prop="payTime">

          <el-button
              v-model="checkAllCategory"
              @click="handlecheckAllCategory"
              class="checkbox"
          >Mark all categories
          </el-button>

          <el-checkbox
              v-for="(category, index) in categoryList"
              :key="category.name"
              :label="category.name"
              v-model="category.checked"
              @click="goCheckRegion(region)"
          >
            {{ category.name }}
          </el-checkbox>
        </el-form-item>


      </el-form>
      <!-- 表单输入框结束 -->

      <!-- 表单按钮组开始 -->
      <div class="btns">
        <el-button type="primary" @click="search">search</el-button>
        <el-button type="primary">remove all filters</el-button>
        <el-button type="primary" v-if="isAdmin">add a new item</el-button>
      </div>
      <!-- 表单按钮组结束 -->
    </div>

    <!-- 表格开始 -->
    <div class="table">
      <!-- 表格 -->
      <el-table ref="multipleTableRef" :data="orderList" style="width: 100%"
                @selection-change="handleSelectionChange" tooltip-effect="dark">
        <!-- 多选框 -->
        <el-table-column type="selection" width="55"/>
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
            <el-button size="small" :type="scope.row.state?'success':'danger'">{{ scope.row.state ? "下架" : "上架" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="time"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="dataTotal" hide-on-single-page/>
    </div>
    <!-- 表格结束 -->
  </el-container>

  <div v-if="onLoad">
    <el-row>
      <el-col :span="4" v-for="item in itemList" :key="item" :offset="1">
        <div class="img">

          <el-card class="el-card-define"
                   :body-style="{ padding: '0px' }"

          >

            <img v-bind:src="item.imageBase64" class="image" alt="err_load_image"
                 @click="goToItemPage(item.name)"
            >

            <div style="padding: 14px;">
              <div class="description">
                <span>{{ item.name }}</span>
              </div>
              <div class="bottom clearfix">
                <el-button type="text" class="button" v-if="isAdmin" @click="deleteItem(item.name)">Delete</el-button>
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
import {options} from "axios";
import {store} from '@/store/store.js'

export default {
  name: "MainPage",
  methods: {options},

  setup() {

    const state = reactive({
      tableLoading: false,
      currentPage: 1,
      PageSize: 8,
      Total: 0,
      TotalList: [],
      tableData1: [],
    });


    let isAdmin = ref(false)
    let checkAllRegion = ref(false)
    let checkAllCategory = ref(false)
    let checkFlag = ref(false)


    let queryParams = reactive(
        {
          keyword: '',
          regions: '',
          categories: ''
        })

    let regionList = reactive([
      {name: 'China', value: 'China', checked: true},
      {name: 'Denmark', value: 'Denmark', checked: true},
      {name: 'USA', value: 'USA', checked: true},
      {name: 'Japan', value: 'Japan', checked: true},
      {name: 'Korea', value: 'Korea', checked: true},
      {name: 'Germany', value: 'Germany', checked: true}])

    let categoryList = reactive([
      {name: 'healthcare', checked: true},
      {name: 'snack', value: 'Denmark', checked: true},
      {name: 'clothing', value: 'USA', checked: true},
      {name: 'entertainment', value: 'Japan', checked: true},
      {name: 'cosmetic', value: 'Korea', checked: true},
    ])
    let router = useRouter();
    let itemList = reactive([])
    const itemLength = ref(0);
    itemLength.value = itemList.length

    console.log("first , itemList")
    let count = ref()
    const onLoad = ref(false)

    let items = []

    const queryParms = reactive({
      itemName: "",
      itemRegion: "",
      itemCategory: ""
    })


    function handlehSizeChange() {
      state.PageSize = 8;
      state.currentPage = 1;
      const end = state.currentPage * 8;
      const data = state.TotalList.slice(
          state.TotalList.length > 8 ? end - 8 : 0,
          end
      );
      state.tableData1 = data;
    }

    function handlehCurrentChange(val) {
      state.currentPage = Math.ceil(val);
      const end = Math.ceil(val) * state.PageSize;
      const data = state.TotalList.slice(end - state.PageSize, end);
      console.log("handle current page is "+val)
      console.log(data, 'data')
      state.tableData1 = data;
    }


    function goToItemPage(itemName) {
      let page_name = "/itempage";
      console.log("goto item inging" + itemName)
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
    const deleteItem = async (itemName) => {
          console.log('now page is '+state.currentPage)
          await itemAPI.removeItem(itemName),
          await request()
          queryTableData()
          handlehCurrentChange(state.currentPage)
          console.log('now page is '+state.currentPage)

    }

    const request = async () => {
      // let itemList = []
      itemList.length = 0

      await itemAPI.getAllItems().then(res => {
            for (let item of res.data) {
              itemList.push(item)
            }
          }
      )
      onLoad.value = true;
    }


    const goCheckRegion = (region) => {

    }


    const handlecheckAllRegion = () => {

      checkAllRegion.value = !checkAllRegion.value
      console.log('handle checkAllRegion is now ' + checkAllRegion.value)
      if (checkAllRegion.value === true) {
        regionList.forEach((a) => {
          a.checked = false
        })
      } else {
        regionList.forEach((a) => {
          a.checked = true
        })
      }
    }

    const handlecheckAllCategory = () => {

      checkAllCategory.value = !checkAllCategory.value
      console.log('handle checkAllRegion is now ' + checkAllCategory.value)
      if (checkAllCategory.value === true) {
        categoryList.forEach((a) => {
          a.checked = false
        })
      } else {
        categoryList.forEach((a) => {
          a.checked = true
        })
      }
    }


    const search = async () => {

      queryParams.regions = ''
      regionList.forEach((i) => {
        if (i.checked === true) {
          queryParams.regions += '@' + i.name

        }

      })
      queryParams.regions = queryParams.regions.substring(1);

      queryParams.categories = ''
      categoryList.forEach((i) => {
        if (i.checked === true) {
          queryParams.categories += '@' + i.name
        }
      })
      queryParams.categories = queryParams.categories.substring(1);

      itemList.length = 0
      await itemAPI.getItemsByFilters(queryParams).then(res => {
        for (let item of res.data) {
          itemList.push(item)
        }
      })
    }


    watch(checkAllRegion, async (val, old) => {
      console.log("watch checkAllRegion 已触发 old is  " + old)
    })

    watch(onLoad, async (val, old) => {
      console.log("watch 已触发 " + itemList.length)
      // await request()
      console.log("after watch size is" + itemList.length)
    })


    function queryTableData() {
      state.TotalList = itemList; //TableDataJSON.tableData 表格数据
      state.Total = itemList.length;

      if (itemList.length > 8) {
        console.log('item list now is '+itemList.length)
        console.log('iPageSize'+state.PageSize)
        console.log('current page is  '+state.currentPage)
        state.tableData1 = state.TotalList.slice(
            0,
            state.PageSize
        );
        console.log('table data1 now is'+state.tableData1[0].name)
      } else {
        state.tableData1 = itemList;
      }
    }


    onMounted(async () => {

      // // testList.push({name: 'test passed!!', id: '23'},)
      // setTimeout(async () => {
      //   console.log('time out ing')
      //   // checkAllRegion.value = true
      //   count.value++  // 执行的方法
      //   // await request()
      // }, 1000)  // 时间 1000毫秒 = 1秒
      console.log(" main page session storage  is " + sessionStorage.getItem('role'))
      if (sessionStorage.getItem('role') === "admin") {
        console.log("store role is " + sessionStorage.getItem('role'))
        isAdmin.value = true
      }

      state.currentPage = 1;
      await request()
      queryTableData()


    });



    return {

      state,
      isAdmin,
      queryParams,
      checkFlag,
      checkAllRegion,
      checkAllCategory,
      regionList,
      categoryList,
      search,
      goToItemPage,
      itemList,
      items,
      count,
      onLoad,
      change,
      queryParms,
      deleteItem,
      goCheckRegion,
      handlecheckAllRegion,
      handlecheckAllCategory,
      handlehSizeChange,
      handlehCurrentChange,
      queryTableData

    };
  }
}
</script>

<style scoped>

.table {
  color: #fcdcdc;
}

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

.item{
  cursor: pointer;
}

description {
  cursor: pointer;
}
</style>
