<template>
  <p>
    <label for="telNumber">
      Введите номер
      <input type="text" maxlength="12" id="telNumber" v-model="telNumber" v-on:keyup.enter="addNumber()" />
    </label>
    <button @click="addNumber()">Добавить номер</button>
  </p>

  <p v-if="errorMessage === 'number-exists'" style="color: red; font-size: 30px">Номер уже есть в списке</p>
  <p v-if="errorMessage === 'ok'" style="color: green; font-size: 30px">Номер добавлен в список</p>
  <table>
    <tr>
      <th>№№</th>
      <th>Номера для рассылки</th>
      <th>Удалить</th>
    </tr>
    <tr align="center" v-for="(num, index) in numberList" :key="num.id">
      <td>{{ index + 1 }}</td>
      <td>{{ num.tel_number }}</td>
      <td><button @click="delNumber(num.id)">Удалить</button></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue';
import axios from 'axios';
import { role } from '@/globals';

const telNumber = ref('');
const numberList = ref<any[]>([]);
const errorMessage = ref('');

async function getNumber() {
  try {
    const result = await axios.get('/api/smssender/list');
    numberList.value = result.data;
  } catch (error) {
    //
  }
}

async function addNumber() {
  const data = {
    telNumber: telNumber.value,
  };
  try {
    const result = await axios.post('/api/smssender', data);
    errorMessage.value = result.data.message;
  } catch (err) {
    errorMessage.value = err.response.data.message;
    console.log('errorMessage', errorMessage);
  }
  getNumber();
}
async function delNumber(id: number) {
  try {
    const result = await axios.post(`/api/number/${id}/delete`);
  } catch (error) {
    //
  }
  getNumber();
}
getNumber();
</script>
