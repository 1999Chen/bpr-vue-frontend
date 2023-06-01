<template>
  <div class="hello">
    <router-link to="/Registerpage">Go Registerpage</router-link>
    <router-link to="/testpage2">GO orders page</router-link>
    <router-link to="/OrderPage">GO OrderPage</router-link>
    <router-link to="/HomePage">GO homepage</router-link>
    <router-link to="/MainPage">GO MainPage</router-link>
    <router-link to="/LoginPage">GO LoginPage</router-link>
    <router-link to="/ItemPage">GO item page</router-link>
    <router-link to="/AddItemPage">GO add item page</router-link>
    <router-link to="/CartPage">GO cart page</router-link>
    <router-link to="/TestPage2">GO Search page</router-link>
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
</style>
