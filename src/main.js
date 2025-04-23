import { createApp } from 'vue';
import './style.css';
import 'vue3-toastify/dist/index.css';
import App from './App.vue';
import router from './router/router';
import Button from './ui/Button.vue';
import Select from './ui/Select.vue';
import Label from './ui/Label.vue';
import Loading from './components/Loading.vue';
import Input from './ui/Input.vue';

createApp(App)
.use(router)
.component('Button', Button)
.component('Select', Select)
.component('Label', Label)
.component('Loading', Loading)
.component('Input', Input)
.mount('#app')
