import { createWebHistory, createRouter } from 'vue-router';
import Main from '../pages/Main.vue';
import Form from '../pages/Form.vue';
import Admin from '../pages/Admin.vue';
import CreateMetricForm from '../components/CreateMetricForm.vue';
import MetricsList from '../components/MetricsList.vue';
import MetricCard from '../components/MetricCard.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/objects-groups/:id', component: Form },
  { path: '/admin', component: Admin, children: [
    {
      path: 'metrics',
      component: MetricsList
    },
    {
      path: 'metrics/:id',
      component: MetricCard
    },
    {
      path: 'create-metric',
      component: CreateMetricForm
    }
  ]},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;