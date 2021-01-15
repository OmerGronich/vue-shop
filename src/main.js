import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";
// import Slider from "primevue/slider/Slider"; //icons

createApp(App)
  .use(router)
  .use(PrimeVue)
  .mount("#app");
// .component("Slider", Slider)
