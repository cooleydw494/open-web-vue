import { createApp } from 'vue'
import "@/scss/main.scss"
import App from './App.vue'
import globalMixins from "@/globalMixins"

createApp(App).mixin(globalMixins).mount('#app')
