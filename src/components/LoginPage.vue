<template>
  <br>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">Homeland market {{ store }}</h3>
      <el-form-item prop="username">
        <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            placeholder="username"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="password"
            v-on:keyup.enter="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <!--      <el-form-item prop="code" v-if="captchaEnabled">-->
      <!--        <el-input-->
      <!--          v-model="loginForm.code"-->
      <!--          auto-complete="off"-->
      <!--          placeholder="validation code maybe"-->
      <!--          style="width: 63%"-->
      <!--          @keyup.enter.native="handleLogin"-->
      <!--        >-->
      <!--          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
      <!--        </el-input>-->
      <!--        <div class="login-code">-->
      <!--          <img :src="codeUrl" @click="getCode" class="login-code-img"/>-->
      <!--        </div>-->
      <!--      </el-form-item>-->
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">keep the password for me
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            v-on:click="handleLogin"
        >

          <span v-if="!loading">Sign in</span>
          <span v-else>signing in...</span>
        </el-button>
        <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            v-on:click="handleLogin"
        >

          <span v-if="!loading">Sign in222222</span>
          <span v-else>signing in...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">????????????</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  ??????  -->
    <div class="el-login-footer">
      <span>Copyright ?? something something.</span>
    </div>
  </div>
</template>

<script>
// import { getCodeImg } from "@/api/login";
import {userAPI} from "@/api/user";
import {aqua as ruleFormRef} from "mockjs";
import {useStore} from 'vuex'
import {store} from '@/store/store.js'


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
      // ???????????????
      captchaEnabled: false,
      // ????????????
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      // getCodeImg().then(res => {
      //   this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
      //   if (this.captchaEnabled) {
      //     this.codeUrl = "data:image/gif;base64," + res.img;
      //     this.loginForm.uuid = res.uuid;
      //   }
      // });
    },
    getCookie() {
      // const username = Cookies.get("username");
      // const password = Cookies.get("password");
      // const rememberMe = Cookies.get('rememberMe')
      // this.loginForm = {
      //   username: username === undefined ? this.loginForm.username : username,
      //   password: password === undefined ? this.loginForm.password : decrypt(password),
      //   rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      // };
    },
    handleLogin() {
      userAPI.validateLogin('admin', '123').then(res => {
            console.log("the role is "+res.data)
            store.role = res.data
          }
      )
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true;
      //     this.loginForm.rememberMe = false;
      //     if (this.loginForm.rememberMe) {
      //       Cookies.set("username", this.loginForm.username, { expires: 30 });
      //       Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
      //       Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
      //     } else {
      //       Cookies.remove("username");
      //       Cookies.remove("password");
      //       Cookies.remove('rememberMe');
      //
      //
      //     }
      //     this.$store.dispatch("Login", this.loginForm).then(() => {
      //       this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
      //     }).catch(() => {
      //       this.loading = false;
      //       if (this.captchaEnabled) {
      //         this.getCode();
      //       }
      //     });
      //   }
      // });


      //   this.$refs.loginFormRef.validate(async valid => {
      //     if (!valid) return
      //     const { data: res } = await userAPI.validateLogin(this.loginForm.username,this.loginForm.password)
      //     if (res.meta.status !== 200) return this.$message.error('???????????????')
      //     console.log(res)
      //     // res.right?????????????????????????????????
      //     this.$store.commit('setRightList', res.rights)
      //     this.$message.success('????????????')
      //     this.$router.push('/home')
      //   })
      //
      //    const store = useStore()
      //    ruleFormRef.value?.validate((valid : boolean) =>{
      //   if(valid){
      //     store.dispatch('userModule/login',{...this.loginForm})
      //   }else{
      //     console.log('error submit!')
      //   }
      // })
      //

    }


  }
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
