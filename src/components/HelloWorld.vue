<template>
  <div class="hello">
    <router-link class="head" to="/Registerpage">Register      </router-link>
    <router-link class="head" to="/testpage2"> Orders    </router-link>
    <router-link class="head" to="/MainPage"> MainPage     </router-link>

<!--    <router-link to="/AddItemPage">GO add item page</router-link>-->
    <router-link class="head" to="/CartPage"> Cart </router-link>
<!--    <router-link to="/TestPage2">GO Search page</router-link>-->
    <router-link class="head" to="/RecommendPage">Recommend</router-link>
    <router-link class="head" to="/userPage">User profile</router-link>
    <router-link class="login" to="/LoginPage"> Login</router-link>

<br>
    <br>
    <br>
    <br>

    <router-view></router-view>


  </div>
</template>

<script>
import {useRouter} from "vue-router";


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  setup() {
    const router = useRouter();
    const goToB = () => {
      console.log("gotob inginging")
      router.push({
        path: './LoginPage',
      });
    };
    //也可以这样写
    // function goToB() {
    //   router.push({
    //     name: "B",
    //   });
    // }
    return {
      goToB,
    };


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
  background: antiquewhite;
}
.login{
  float:right;
  background: #6b778c;
}
.head{
  border-right: 10px;
  margin-right: 60px;
  font-family: Calibri;


}
</style>
