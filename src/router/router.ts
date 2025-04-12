import { createWebHistory, createRouter } from 'vue-router';
import Main from '../pages/Main.vue';
import Form from '../pages/Form.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/objects-groups/:id', component: Form },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router