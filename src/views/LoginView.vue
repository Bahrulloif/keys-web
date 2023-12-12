<template>
  <p align="center">
    <label for="login">
      Логин
      <input id="login" type="text" size="30" maxlength="50" v-model="login" />
    </label>
  </p>
  <p align="center">
    <label for="password">
      Пароль
      <input id="password" type="password" size="30" maxlength="50" v-model="password" v-on:keyup.enter="submit" />
    </label>
  </p>

  <p v-if="isError" style="color: red">Wrong login or password!</p>
  <p align="center">
    <button v-if="sending === false" @click="submit()">Войти</button>
    <span v-else>Sending...</span>
  </p>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { firstName, lastName, role } from '@/globals';

const router = useRouter();

const login = ref('');
const password = ref('');
const sending = ref(false);
const isError = ref(false);

async function submit() {
  console.log('login', login.value);
  console.log('password', password.value);

  sending.value = true;
  isError.value = false;

  const data = {
    login: login.value,
    password: password.value,
  };

  try {
    const result = await axios.post('/api/auth/login', data);
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('firstName', result.data.firstName);
    localStorage.setItem('lastName', result.data.lastName);
    localStorage.setItem('role', result.data.role);

    firstName.value = result.data.firstName;
    lastName.value = result.data.lastName;
    role.value = result.data.role;

    router.push('/table');
  } catch (e) {
    isError.value = true;
  }
  sending.value = false;
}
</script>
