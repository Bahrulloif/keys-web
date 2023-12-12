<template>
  <p align="center">
    <label for="family"> Фамилия <input type="text" id="family" size="30" maxlength="50" v-model="family" /></label>
  </p>
  <p v-if="errorMessage === 'invalid-family'" align="center" style="color: red">Обязательное поле</p>
  <p align="center">
    <label for="name"> Имя <input type="text" id="name" size="30" maxlength="50" v-model="name" /></label>
  </p>
  <p v-if="errorMessage === 'invalid-name'" align="center" style="color: red">Обязательное поле</p>

  <p align="center">
    <label for="position">
      Должность <input type="text" id="position" size="30" maxlength="50" v-model="position"
    /></label>
  </p>
  <p v-if="errorMessage === 'invalid-position'" align="center" style="color: red">Обязательное поле</p>

  <p align="center">
    <label for="login"> Логин <input type="text" id="login" size="30" maxlength="50" v-model="login" /></label>
  </p>
  <p v-if="errorMessage === 'invalid-login'" align="center" style="color: red">Обязательное поле</p>

  <p align="center">
    <label for="password">
      Пароль <input type="password" id="password" size="30" maxlength="50" v-model="password"
    /></label>
  </p>
  <p v-if="errorMessage === 'invalid-password'" align="center" style="color: red">Обязательное поле</p>

  <p align="center">
    <label for="telefon">
      Телефон <input type="telefon" id="telefon" size="30" maxlength="13" v-model="telefon"
    /></label>
  </p>
  <p v-if="errorMessage === 'invalid-telefon'" align="center" style="color: red">Обязательное поле</p>

  <p align="center">
    <button @click="managerReg()">Регистрация</button>
  </p>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const family = ref('');
const name = ref('');
const position = ref('');
const login = ref('');
const telefon = ref('');
const password = ref('');
const isCreating = ref('true');
const errorMessage = ref('');

async function managerReg() {
  const data = {
    family: family.value,
    name: name.value,
    position: position.value,
    login: login.value,
    password: password.value,
    telefon: telefon.value,
  };
  isCreating.value = true;
  errorMessage.value = '';

  try {
    await axios.post('/api/manager/create', data);
    router.replace('/manager/list');
  } catch (e) {
    errorMessage.value = e.response.data.message;
  }

  isCreating.value = false;
}
</script>
