<template>


  <el-form ref="itemInfo" v-model="item" :rules="loginRules" class="login-form">
    <h3 class="title">Homeland market</h3>
    <el-button @click="show">{{item.name}}</el-button>
    <el-form-item>

      <span>ite name</span>
      <span>{{item.name}}</span>
      <span>{{name1}}</span>

      <el-input
          v-model="item.name"
          type="text"
          auto-complete="off"
          placeholder="name"
          v-on:keyup.enter="handleLogin"
      >
        {{item.name}}
        <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
      </el-input>

    </el-form-item>
    <el-form-item >
      <span>description</span>
      <el-input
          v-model="item.description"
          type="text"
          auto-complete="off"
          placeholder="description"
      >
        <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="item.status" style="margin:0px 0px 25px 0px;"
                   :true-label=1  :false-label=0
      >
        in stock
      </el-checkbox>
    </el-form-item>
    <el-form-item prop="region">
      <span>region</span>
      <el-select v-model="item.region" placeholder="please pick one region">
        <el-option value="China">
          <span>China</span>
        </el-option>
        <el-option value="USA">
          <span>USA</span>
        </el-option>
        <el-option value="DK">
          <span>DK</span>
        </el-option>
        <el-option value="RO">
          <span>RO</span>
        </el-option>
      </el-select>

      <span>{{ region }}</span>

    </el-form-item>
    <el-form-item style="width:100%;">
      <span>price</span>
      <el-input v-model="item.price" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
      <span slot="suffix">/ Euro </span>

    </el-form-item>

    <el-form-item style="width:100%;">
      <span>quantity</span>
      <el-input-number v-model="item.quantity" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input-number>
      <span slot="suffix">/ Euro </span>

    </el-form-item>


    <el-form-item style="width:100%;">
      <el-upload
          ref="upload"
          class="upload"
          action=''

          :on-change="getFile"
          :limit="1"
          :auto-upload="false"
      >
        <el-button size="small" type="primary">upload image</el-button>
        <div slot="tip" class="el-upload__tip">只能上传一张</div>
      </el-upload>
      <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
      <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click="addItem()"
      >



        <span v-if="!loading">Add item</span>
        <span v-else>signing in...</span>
      </el-button>
      <div style="float: right;" v-if="register">
        <router-link class="link-type" :to="'/register'">立即注册</router-link>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import {onMounted, reactive, ref} from 'vue'
import {genFileId} from 'element-plus'
import {itemAPI} from "@/api/item";
import {cartAPI} from "@/api/cart";

const imageUrl = ref('')
const fd = new FileReader()

export default {

  name: "AddItemPage",
  data() {

    return {
      codeUrl: "",
      // item: {
      //   name: "a",
      //   description: "",
      //   region: "",
      //   status: 0,
      //   imageBase64: "",
      //   price: 0,
      //   quantity: 0
      // },
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          {required: true, trigger: "blur", message: "please input username"}
        ],
        password: [
          {required: true, trigger: "blur", message: "please input password"}
        ],

      },
      loading: false,
      captchaEnabled: false,
      register: false,
      redirect: undefined
    };
  },

  methods: {
    show() {
      console.log(this.item.name)
    },
    // addItem(){
    //   console.log("adding adding")
    //   itemAPI.uploadItem(this.item)
    // }

    getFile (file, fileList){
      console.log("the image getfile starts ")
      console.log(file.raw)
      this.getBase64(file.raw).then(res => {
        // console.log("the image getfile "+res)
        this.item.imageBase64 = res
        console.log("final one "+this.item.imageBase64)
        console.log("so item is "+this.item)
      });
    },

    getBase64  (file){
      console.log("get base 64 starts1")
      return new Promise(function (resolve, reject) {
        console.log("get base 64 starts2")
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
        console.log("get base 645")
      });
    }

  },


  setup() {

    const name1 = ref()

    const item = reactive({
      name: "",
      description: "",
      region: "",
      status: 0,
      imageBase64: "",
      price: 0,
      quantity: 0
    })



    const addItem = () => {
      console.log("adding adding")
      itemAPI.uploadItem(item)
    }




    return {
      item,
      name1,
      addItem
      // region,
      // imageBase64,
      // getFile,
      // getBase64,
      // // show,
      // item2
    }
  }


}
</script>

<style scoped>

</style>
