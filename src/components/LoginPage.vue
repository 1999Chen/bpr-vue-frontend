<template>
  <br>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">Homeland market {{ store }}</h3>
      <el-form-item prop="username">
        <el-input
            v-model="loginParams.username"
            type="text"
            auto-complete="off"
            placeholder="username"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>

      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="loginParams.password"
            type="password"
            auto-complete="off"
            placeholder="password"
            v-on:keyup.enter="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>


      <el-form-item style="width:100%;">
        <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            @click="methods.handleLogin()"
        >

          <span >Sign in</span>

        </el-button>

        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">Sign up now!</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © something something.</span>
    </div>
  </div>
</template>

<script>

import {userAPI} from "@/api/user";
import {cartAPI} from "@/api/cart";

import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";



export default {
  name: "LoginPage",
  data() {
    return {

      authData: "",
      codeUrl: "",
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
      // 验证码开关
      captchaEnabled: false,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },


  setup(){

    let router = useRouter();
    const loginParams = reactive({
      username: "",
      password: ""
    })

    const methods  ={
      async handleLogin() {

          await userAPI.validateLogin(loginParams.username, loginParams.password).then(async res => {

            if (res.data === 1) {

              await methods.validateUserRole(loginParams.username)
              methods.goToMainPage()

            }
          })
      },

      async validateUserRole() {
        await userAPI.validateRole(loginParams.username).then(res => {
          sessionStorage.setItem('role',res.data);
        })
      },

      async registerUser() {

          await userAPI.registerUser(loginParams.username,loginParams.password).then(async res => {
            if (res.data === 1) {
              await userAPI.getUserInfo(loginParams.username).then(async res1 => {
                await cartAPI.generateNewCart(res1.data.userId)
              })
            }
          })
      },


      goToMainPage(){
        let page_name = "/mainpage";

        router.push({
          path: page_name,

        });
      }
    }

    onMounted(async () => {
      console.log(" session storage  is "+sessionStorage.getItem('role'))
    })

    return {
      loginParams,
      methods
    }
  },



};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
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

.login-form {
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

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
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

.login-code-img {
  height: 38px;
}
</style>
