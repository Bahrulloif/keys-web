import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import jwtDecode from 'jwt-decode';
import LoginView from '@/views/LoginView.vue';
import TableView from '@/views/TableView.vue';
import ManagerListView from '@/views/ManagerListView.vue';
import ManagerCreateView from '@/views/ManagerCreateView.vue';
import EmployeeListView from '@/views/EmployeeListView.vue';
import EmployeeCreateView from '@/views/EmployeeCreateView.vue';
import KeyBorrowView from '@/views/KeyBorrowView.vue';
import KeyListView from '@/views/KeyListView.vue';
import KeyCreateView from '@/views/KeyCreateView.vue';
import KeyReceiveView from '@/views/KeyReceiveView.vue';
import ProfileView from '@/views/ProfileView.vue';
import SMSsenderView from '@/views/SMSsenderView.vue';
import { role } from '@/globals';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: () => '/table',
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/table',
    component: TableView,
  },
  {
    path: '/profile',
    component: ProfileView,
  },
  {
    path: '/manager/list',
    component: ManagerListView,
    beforeEnter: (to, from, next) => {
      if (role.value === 'ADMIN') next();
      else next('/table');
    },
  },

  {
    path: '/manager/create',
    component: ManagerCreateView,
    beforeEnter: (to, from, next) => {
      if (role.value === 'ADMIN') next();
      else next('/table');
    },
  },
  {
    path: '/employee/list',
    component: EmployeeListView,
    beforeEnter: (to, from, next) => {
      if (role.value === 'ADMIN' || role.value === 'MANAGER') next();
      else next('/table');
    },
  },

  {
    path: '/employee/create',
    component: EmployeeCreateView,
    beforeEnter: (to, from, next) => {
      if (role.value === 'ADMIN' || role.value === 'MANAGER') next();
      else next('/table');
    },
  },

  {
    path: '/table/borrow',
    component: KeyBorrowView,
  },
  {
    path: '/key/list',
    component: KeyListView,
    beforeEnter: (to, from, next) => {
      if (role.value === 'ADMIN' || role.value === 'MANAGER') next();
      else next('/table');
    },
  },
  {
    path: '/key/create',
    component: KeyCreateView,
    beforeEnter: (to, from, next) => {
      if (role.value === 'ADMIN' || role.value === 'MANAGER') next();
      else next('/table');
    },
  },

  {
    path: '/key/receive',
    component: KeyReceiveView,
    beforeEnter: (to, from, next) => {
      if (role.value === 'ADMIN' || role.value === 'MANAGER') next();
      else next('/table');
    },
  },
  {
    path: '/table/SMSsender',
    component: SMSsenderView,
    beforeEnter: (to, from, next) => {
      if (role.value === 'ADMIN' || role.value === 'MANAGER') next();
      else next('/table');
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function checkIsAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  if (token == null) return false;

  const jwtData = jwtDecode<{ exp: number }>(token);

  if (jwtData.exp * 1000 - Date.now() <= 0) {
    localStorage.clear();
    return false;
  }
  return true;
}

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkIsAuthenticated();
  if (isAuthenticated) {
    if (to.path === '/login') next('/table');
    else next();
  } else if (to.path === '/login') {
    next();
  } else {
    next('/login');
  }
});

export default router;
