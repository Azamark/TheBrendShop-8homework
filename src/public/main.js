import './styles/styles.scss';
import router from './router/router'
import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index.js';

const app = createApp(App);

app.use(store)
    .use(router)
    .mount('#app')