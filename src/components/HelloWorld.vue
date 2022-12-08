<template>
  <div class="hello">
    <a>this is hello world</a>
    <router-link to="/">Go home</router-link><br>
    <router-link to="/about">GO there</router-link><br>
    <router-link to="/HomePage">GO homepage</router-link><br>
    <router-link to="/MainPage">GO MainPage</router-link><br>
    <router-link to="/LoginPage">GO LoginPage</router-link><br>
    <router-link to="/ItemPage">GO item page</router-link><br>
    <router-link to="/AddItemPage">GO add item page</router-link><br>
    <router-link to="/TestPage">GO test page</router-link><br>
    <router-link to="/TestPage2">GO test2 page</router-link><br>
    <el-button @click="goToB">Go to LoginPage</el-button>
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
</style>
