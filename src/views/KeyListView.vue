<template>
  <router-link to="/key/create">Новый ключ</router-link>
  <p v-if="isOk === 'ok'" style="color: green">Ключ успешно удалён!</p>
  <p></p>
  <p></p>
  <p></p>
  <p></p>
  <table border="1" width="1000" align="center" cellpadding="10" cellspacing="5">
    <tr>
      <th>ID БС</th>
      <th>Название БС</th>
      <th>Адрес БС</th>
      <th>Изменение</th>
    </tr>
    <tr align="center" v-for="key in keys" :key="key.id">
      <td>{{ key.bs_id }}</td>
      <td>{{ key.bs_name }}</td>
      <td>{{ key.bs_address }}</td>
      <td><button @click="delKey(key.bs_id)">Удалить</button></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const isDeleting = ref(true);
const isError = ref(false);
const keys = ref<any[]>([]);
const isOk = ref('');

async function getKeys() {
  try {
    const result = await axios.get('/api/key/list');
    keys.value = result.data;
    console.log(result.data);
  } catch (e) {
    //
  }
}

async function delKey(bsID: string) {
  isDeleting.value = true;
  isError.value = false;
  isOk.value = '';
  try {
    const result = await axios.post(`/api/key/${bsID}/delete`);
    isOk.value = result.data.message;
    getKeys();
  } catch (error) {
    isError.value = true;
  }
  isDeleting.value = false;
}
getKeys();
</script>
