import { createWebHistory, createRouter } from 'vue-router';
import Main from '../pages/Main.vue';
import Form from '../pages/Form.vue';
import Admin from '../pages/Admin.vue';
import CreateMetricForm from '../components/CreateMetricForm.vue';
import MetricsList from '../components/MetricsList.vue';
import MetricCard from '../components/MetricCard.vue';
import ObjectsGroupsList from '../components/ObjectsGroupsList.vue';
import ObjectsGroup from '../components/ObjectsGroup.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';
import Login from '../pages/Login.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/objects-groups/:id', component: Form },
  { path: '/login', component: Login },
  { path:
    '/admin',
    component: Admin,
    meta: {
      requiresAuth: true
    },
    children: [
    {
      path: 'metrics',
      children: [
        {
          path: '',
          component: MetricsList
        },
        {
          path: ':id',
          component: MetricCard
        }
      ]
    },
    {
      path: 'create-metric',
      component: CreateMetricForm
    },
    {
      path: 'objects-groups',
      children: [
        {
          path: '',
          component: ObjectsGroupsList
        },
        {
          path: ':id',
          component: ObjectsGroup
        },
      ]
    }
  ]},
  { path: '/:pathMatch(.*)*', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  matchOptions: {
    exact: false,
    strict: false
  }
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
})

export default router;