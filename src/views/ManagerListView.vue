<template>
  <p></p>
  <p></p>
  <p></p>
  <p></p>
  <router-link to="/manager/create">Новый менеджер</router-link>

  <table border="1" width="1000" align="center" cellpadding="10" cellspacing="5">
    <tr>
      <th>Фамилия</th>
      <th>Имя</th>
      <th>Должность</th>
      <th>Логин</th>
      <th>Телефон</th>
      <th>Изменение</th>
    </tr>
    <tr align="center" v-for="manager in managers" :key="manager.id">
      <td>{{ manager.last_name }}</td>
      <td>{{ manager.first_name }}</td>
      <td>{{ manager.position }}</td>
      <td>{{ manager.login }}</td>
      <td>{{ manager.telephone }}</td>
      <td><button @click="delManag(manager.id)">Удалить</button></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const managers = ref<any[]>([]);
const isDeleting = ref(true);

async function getManagers() {
  try {
    const result = await axios.get('/api/manager/list');
    managers.value = result.data;
  } catch (e) {
    // print error
  }
}

async function delManag(managId: number) {
  console.log('managId', managId);
  isDeleting.value = true;

  await axios.post(`/api/manager/${managId}/delete`);
  await getManagers();
  // result.data;

  isDeleting.value = false;
}

onMounted(() => {
  getManagers();
});
</script>
