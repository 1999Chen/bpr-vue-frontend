<template>

    <span class="text">you dont have the authority to come here!</span>

</template>

<script>
import {reactive,ref, onBeforeUnmount, onMounted} from 'vue'
import {useRouter} from "vue-router";
export default {
  name: "ErrorAuth",

  setup(){
    let router = useRouter
    const count = ref(5)
    function countDown(count = 5) {
      let state = reactive({
        count: 0,
        timer: null
      })

      /**
       * 开始倒计时
       */
      function start() {
        clear()
        console.log("state.count")
        state.count = count
        state.timer = setInterval(() => {
          console.log(state.count)
          state.count--

          if (state.count <= 0) {
            clear()
          }
        }, 1000)
      }

      /**
       * 清除倒计时
       */
      function clear() {
        if (state.timer) {
          clearInterval(state.timer)
        }
      }

      // onBeforeUnmount(() => {
      //   clear()
      // })
  }

    onMounted( () => {
      setInterval(() => {
        console.log(count.value);
        count.value--
        if (count.value===0)
          router.push({
            path: "/additempage"
          })

      }, 1000)

    })

  return{
    router,
    countDown

  }
}

  }


</script>

<style scoped>

</style>
