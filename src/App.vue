<template>
  <nav v-if="route.path != '/login'">
    <router-link to="/table">Таблица</router-link> | <router-link to="/table/borrow">Получение ключа</router-link> |

    <template v-if="role === 'ADMIN' || role === 'MANAGER'">
      <router-link to="/key/receive">Cдача ключа</router-link> |

      <router-link to="/key/list">Список ключей</router-link> |

      <router-link to="/employee/list">Список работников</router-link> |
      <router-link to="/table/SMSsender">SMSsender</router-link> |
    </template>

    <template v-if="role === 'ADMIN'"> <router-link to="/manager/list">Список менеджеров</router-link> | </template>
    <router-link to="/profile">
      <b>{{ firstName }} {{ lastName }}</b>
    </router-link>
    <button @click="logout()" style="margin-left: 10px">Exit</button>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { firstName, lastName, role } from '@/globals';

const route = useRoute();
const router = useRouter();

function logout() {
  localStorage.clear();
  router.push('/login');
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  font-family: Arial, sans-serif;
}

nav {
  padding: 30px;
  font-size: 30px;
}

nav a {
  font-weight: bold;
  color: rgb(127 127 127);
}

nav a.router-link-exact-active {
  color: #00b956;
}
button {
  padding: 4px 32px;
  background-color: #00b956;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 400;
  font-size: 30px;
}
th {
  background-color: #00b956;
  color: white;
  border: 1px solid rgb(127 127 127);
}
tr {
  border: none;
  border: 1px solid rgb(127 127 127);
  color: #00b956;
}
td {
  border: none;
  border: 1px solid rgb(127 127 127);
  color: rgb(127 127 127);
}
table {
  border: none;
  border: 1px solid rgb(127 127 127);
}
label {
  border: none;
  border-radius: 30px;
  color: rgb(127 127 127);
}
option {
  color: #00b956;
}
input {
  border: none;
  border-radius: 30px;
  border: 1px solid rgb(127 127 127);
  font-size: 30px;
}
select {
  border-radius: 30px;
  color: #00b956;
  border-color: rgb(127 127 127);
}
button:hover {
  color: black;
}
</style>
