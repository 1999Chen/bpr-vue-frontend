import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App).use(router);
app.config.globalProperties.$axios = axios
axios.defaults.baseURL = "http://localhost:8080" //后端地址

app.use(ElementPlus)


app.mount('#app')




