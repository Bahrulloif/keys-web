<template>
  <p></p>
  <p></p>
  <p></p>
  <p></p>
  <router-link to="/employee/create">Новый работник</router-link>

  <!-- <p v-if="isError == true">Oshibka</p> -->

  <table border="1" width="1000" align="center" cellpadding="10" cellspacing="5">
    <tr>
      <th>Фамилия</th>
      <th>Имя</th>
      <th>Должность</th>
      <th>Логин</th>
      <th>Телефон</th>
      <th>Изменение</th>
    </tr>
    <tr align="center" v-for="employee in employees" :key="employee.id">
      <td>{{ employee.last_name }}</td>
      <td>{{ employee.first_name }}</td>
      <td>{{ employee.position }}</td>
      <td>{{ employee.login }}</td>
      <td>{{ employee.telephone }}</td>
      <td><button @click="delEmp(employee.id)">Удалить</button></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Employee {
  id: number;
  last_name: string;
  first_name: string;
  position: string;
  login: string;
  telephone: string;
}

const isDeleting = ref(true);
const isError = ref(false);
const employees = ref<Employee[]>([]);

async function getEmployee() {
  try {
    const result = await axios.get('/api/employee/list');
    employees.value = result.data;
  } catch (e) {
    //
  }
}

async function delEmp(empId: number) {
  console.log('empId', empId);
  isDeleting.value = true;
  isError.value = false;
  try {
    await axios.post(`/api/employee/${empId}/delete`);
    getEmployee();
  } catch (error) {
    isError.value = true;
  }
  isDeleting.value = false;
}
onMounted(() => {
  getEmployee();
});
</script>
