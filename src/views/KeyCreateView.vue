<template>
  <p align="center">
    <label for="bsID"> ID БС <input type="text" id="bsID" size="30" maxlength="4" v-model="bsID" /></label>
    <label for="nameBS"> Название БС <input type="text" id="nameBS" size="30" maxlength="50" v-model="nameBS" /></label>
    <label for="addressBS">
      Адрес <input type="text" id="addressBS" size="30" maxlength="255" v-model="addressBS"
    /></label>
  </p>
  <p v-if="errorMessage === 'invalid-bsID'" style="color: red">Не правильное БС ID!</p>
  <p v-if="errorMessage === 'invalid-nameBS'" style="color: red">Не правильное название БС!</p>
  <p v-if="errorMessage === 'invalid-addressBS'" style="color: red">Не правильное адрес БС!</p>
  <p v-if="errorMessage === 'key-exists'" style="color: red">Такой ключ существует!</p>

  <p align="center"><button @click="regKey()">Добавить</button></p>
  <p v-if="isOk === 'ok'" style="color: green">Ключ успешно добавлен!</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const bsID = ref('');
const nameBS = ref('');
const addressBS = ref('');
const isCreating = ref(true);
const isOk = ref('');
const errorMessage = ref('');

async function regKey() {
  const data = {
    bsID: bsID.value,
    nameBS: nameBS.value,
    addressBS: addressBS.value,
  };
  isCreating.value = true;
  errorMessage.value = '';
  isOk.value = '';
  try {
    const result = await axios.post('/api/key/create', data);
    isOk.value = result.data.message;
  } catch (error) {
    errorMessage.value = error.response.data.message;
    console.log(error.response.data.message);
  }

  // result.data;

  isCreating.value = false;
}
</script>
