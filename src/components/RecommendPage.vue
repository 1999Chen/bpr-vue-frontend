<template>

  <div>
    <br>
    <br>
    <span class="top"> New recommendations for you based on big data</span>
    <br>
    <br>
  </div>
  <div v-if="onLoad">
    <br>
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

</template>

<script>
import {itemAPI} from "@/api/item";
import {useRouter} from "vue-router";
import {onMounted, reactive, ref, watch} from "vue";
import {options} from "axios";
import {store} from '@/store/store.js'
import {userAPI} from "@/api/user";

export default {
  name: "RecommendPage",
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
          age: 0,
          gender: 0,
          region: ''
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


      await userAPI.getUserInfo(sessionStorage.getItem('username')).then(res =>{
        console.log("now user region is "+res.data.region)
        console.log("now user age is "+res.data.age)
        console.log("now user gender is "+res.data.gender)
        queryParams.age=res.data.age
        queryParams.gender=res.data.gender
        queryParams.region=res.data.region
      })

      await userAPI.getPrediction(queryParams).then(res => {
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
      // userAPI.getPrediction('22','222')
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

.top{
  border-top:1px solid #000;
  font-family: Comic Sans MS,sans-serif;
  font-style:italic;
  font-size:150%;
  border-bottom:2px dashed #F00
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