import {createApp} from "vue";
import App from "./App.vue";
import globalUtil from "./util/plugins.js";
const app = createApp(App);
app.config.globalProperties.fun = (val)=>{
    console.log(val)
}
app.use(globalUtil).mount("#app");
