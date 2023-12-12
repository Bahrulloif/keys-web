import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');
  const headers = request.headers ?? {};
  if (token !== null) {
    headers.Authorization = token;
  }
  Object.assign(request, headers);
  return request;
});

createApp(App).use(router).mount('#app');
