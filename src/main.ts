import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import './assets/styles/global.css';

import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
    components: {
        ...components,
        ...labsComponents,
    },
    directives,
})
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).use(vuetify).mount('#app')
