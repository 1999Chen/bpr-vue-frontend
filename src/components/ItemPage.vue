<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="500px">
        <img ref="imgShow" v-bind:src="item.imageBase64" alt="load error"
             class="hovImg"     />
      </el-aside>
      <el-container>
        <el-header>{{ item.name }}</el-header>
        <el-main>
          <ul>
            <li>name:  {{ item.name }}</li>
            <br>
            <li>description:  {{ item.description }}</li>
            <br>
<!--            <li>Net contents: 500ml(+-5ml)</li>-->
            <br>
            <li>Price(EURO): {{ item.price }}</li>
            <br>
            <li>Region: {{ item.region }}</li>
            <br>
            <li>In stock: {{ item.status }}</li>
            <br>
            <li>Another information: abababab:{{count}}</li>
            <br>
            <li><input type="text" v-model="count"></li>
            <br>

          </ul>
        </el-main>
        <el-footer>Footer</el-footer>
        <div class="box">
          <ul id="car">
            <li>宝贝数量：</li>
            <li>
              <button @click="sub">-</button>
            </li>
            <li><input type="text" size="1" v-model="count"></li>
            <li>
              <button style="margin-right:50px; " @click="add">+</button>
            </li>
            <li>
              <button @click="addToCart">Add to cart</button>
            </li>

          </ul>
        </div>
        <div v-if="onLoad">
          <a>see here</a>
        </div>
      </el-container>
    </el-container>
  </div>

  <input placeholder="ss">
  <img v-bind:src="viewImgData" alt="无法显示"/>

</template>

<script>

import {itemAPI} from "@/api/item";
import {useRoute} from "vue-router";

// import{getItemInfo} from "@/api/item";
// eslint-disable-next-line no-unused-vars
import {onMounted, reactive, toRefs,watch} from "vue";
import {ref} from "vue";

export default {
  name: "ItemPage",
  data() {
    const count1 = 0;

    return {
      viewImgData: "data:image/jpeg;base64,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",
      count1,
      isHeight: false,
    };
  },

  setup() {

    const onLoad=ref(false)
    const imgShow = ref(null)

    const route = useRoute();
    // const pageName ="nike air force 1 low off-white brooklyn"
    const pageName =route.query.itemName

    const getParams = () =>{
      return route.params;
    }

    let item = reactive({
      name: String,
      description: String,
      region: String,
      imageBase64: String,
      quantity: Number,
      price: Number,
      status: Boolean,
    })
    let newItem = toRefs(item)

    const datas = reactive({
      values: [],
    })

    const methods = {
      requestall() {
        // const data = {
        //   pageNum: 10,
        //   pageSize: 5,
        //   articieId: 100,
        // };
        // const nameparam = {
        //   name: "cocacola"
        // };
        console.log("pageName------------------------")

        console.log("pageName"+pageName)
        itemAPI.getItemInfo(pageName).then(res => {
              item.value = res.data
              item.name = res.data.name
              item.description = res.data.description
              item.region = res.data.region
              item.imageBase64 = res.data.imageBase64
              item.price = res.data.price
              item.status = res.data.status
              const cocacola1 = item.imageBase64

          console.log("res "+res)
          console.log("res.data "+res.data)
          console.log("item de name is "+item.name)
          console.log( "item.description"+ item.description)
              //
              // console.log(cocacola1)
              newItem = toRefs(item.value)
              datas.value = res
              console.log(res.data);
              console.log(res.data.name);
              console.log(res.data.description);
              console.log(newItem.name)

          console.log("imgshow is "+imgShow.value)
            }
        ).catch(err => {
          console.log(err)
        })

      }
    }
    const count = ref(0)
    onMounted(() => {
      methods.requestall()

      setInterval(() => {
         count.value++
      }, 1000)

      console.log("on mounted get query "+ route.query.itemName)
    });


    watch(count,(val,old)=>{
      console.log("watch 已触发",)
      onLoad.value = true;
    })


    const baby = ref('嘎嘎嘎')
    // 定义年龄
    const age = ref(28)

    const add = () => {
      console.log("oh,he is add " + baby.value + " and " + age.value + "years")

      count.value = count.value + 1;
      console.log("count is " + count.value);
    }

    const sub = () => {
      if (count.value <= 0) {
        alert('宝贝不能再减少啦')
        this.count.value = 0;
      }
      console.log("oh,he is sub " + baby.value + " and " + age.value + "years")
      count.value = count.value - 1;
      console.log("count is " + count.value);
    }

    const addToCart = () => {
      if (count.value <= 0) {
        alert('宝贝不能再减少啦')
        this.count.value = 0;
      }
      console.log("oh,he is sub " + baby.value + " and " + age.value + "years")
      count.value = count.value - 1;
      console.log("count is " + count.value);
    }


    return {
      add,
      sub,
      addToCart,
      imgShow,
      item,
      newItem,
      count,
      getParams,
      onLoad
    }
  }
}
</script>

<style scoped>
ul, li {
  list-style: none;
}

li {
  float: left;
}

input {
  text-align: center;
}

.hovImg{
  width: 100%;
  height: auto;
}
.verImg{
  width: auto;
  height: 100%;
}
</style>

