<template>
  <br>
  <div class="register">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form">
      <h3 class="title">Homeland market {{ store }}</h3>
      <el-form-item prop="username">
        <el-input
            v-model="registerParams.username"
            type="text"
            auto-complete="off"
            placeholder="username"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>

      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="registerParams.password"
            type="password"
            auto-complete="off"
            placeholder="password"

        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>

      <el-form-item prop="username">
        <el-select
            v-model="registerParams.gender"
            type="text"
            auto-complete="off"
            placeholder="gender"
        >
          <el-option>Male</el-option>
          <el-option>Female</el-option>
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-select>

      </el-form-item>
      <el-form-item prop="username">
        <el-input
            v-model="registerParams.age"
            type="text"
            auto-complete="off"
            placeholder="age"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>

      </el-form-item>
      <el-form-item prop="region">
        <el-select
            v-model="registerParams.region"
            type="text"
            auto-complete="off"
            placeholder="region"
        >
          <el-option>China</el-option>
          <el-option>Denmark</el-option>
          <el-option>USA</el-option>
          <el-option>Germany</el-option>
          <el-option>Korea</el-option>
          <el-option>Japan</el-option>
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-select>

      </el-form-item>
      <el-form-item prop="username">
        <el-input
            v-model="registerParams.phone"
            type="text"
            auto-complete="off"
            placeholder="phone"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>

      </el-form-item>
      <el-form-item prop="address">
        <el-input
            v-model="registerParams.address"
            type="text"
            auto-complete="off"
            placeholder="address"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>

      </el-form-item>

      <el-form-item prop="address">
        <el-input
            v-model="registerParams.email"
            type="text"
            auto-complete="off"
            placeholder="email"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>

      </el-form-item>

      <el-form-item style="width:100%;">
        <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            @click="methods.registerUser()"
        >

          <span >Sign up</span>

        </el-button>
        <span v-if="isSigned" @click="methods.goToLoginPage()"> done! go to login page now  </span>

      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-register-footer">
      <span>Copyright © something something.</span>
    </div>
  </div>
</template>

<script>

import {userAPI} from "@/api/user";
import {cartAPI} from "@/api/cart";

import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";



export default {
  name: "registerPage",
  data() {
    return {

      authData: "",
      codeUrl: "",
      // registerForm: {
      //   username: "admin",
      //   password: "admin123",
      //   rememberMe: false,
      //   code: "",
      //   uuid: ""
      // },
      registerRules: {
        username: [
          {required: true, trigger: "blur", message: "please input username"}
        ],
        password: [
          {required: true, trigger: "blur", message: "please input password"}
        ],

      },
      loading: false,
      // 验证码开关
      captchaEnabled: false,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },


  setup(){

    let isSigned = ref(false);
    let router = useRouter();
    const registerParams = reactive({
      username: "",
      password: "",
      gender:"",
      region:"",
      age:"",
      email:"",
      phone:"",
      address:""
    })

    const methods  ={
      async handleregister() {

        await userAPI.validateregister(registerParams.username, registerParams.password).then(async res => {

          if (res.data === 1) {

            await methods.validateUserRole(registerParams.username)
            methods.goToMainPage()

          }
        })
      },

      async validateUserRole() {

        await userAPI.validateRole(registerParams.username).then(res => {
          sessionStorage.setItem('role',res.data);
          console.log('now validate page the role is '+sessionStorage.getItem('role'))
        })
      },

      async registerUser() {

        await userAPI.registerUser(registerParams.username,registerParams.password).then(async res => {
          if (res.data === 1) {
            await userAPI.getUserInfo(registerParams.username).then(async res1 => {
              await cartAPI.generateNewCart(res1.data.userId)
              isSigned.value = true;
            })
          }
        })
      },


      goToLoginPage(){
        let page_name = "/loginpage";

        router.push({
          path: page_name,

        });
      }
    }

    onMounted(async () => {

      console.log(" session storage  is "+sessionStorage.getItem('role'))
    })

    return {
      isSigned,
      registerParams,
      methods
    }
  },



};
</script>

<style rel="stylesheet/scss" lang="scss">
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.register-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-register-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.register-code-img {
  height: 38px;
}
</style>
