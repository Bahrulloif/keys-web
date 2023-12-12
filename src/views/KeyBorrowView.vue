<template>
  <p>
    <label for="prichina">
      Причина
      <select id="prichina" v-model="prichina">
        <option></option>
        <option value="1">1.Добавление/Удаление TRX</option>
        <option value="2">2.Замена/Добавление АКБ</option>
        <option value="3">3.Запуск стойки/Расширение</option>
        <option value="4">4.Измерение оптического кросса</option>
        <option value="5">5.Инвентаризация</option>
        <option value="6">6.Монтаж 2G/3G/4G</option>
        <option value="7">7.Общий сайт</option>
        <option value="8">8.Плановый осмотр сайта</option>
        <option value="9">9.Подключение потоков</option>
        <option value="10">10.Работы по заявке</option>
        <option value="11">11.Работы подрядчиков</option>
      </select>
    </label>
  </p>

  <p v-if="isError === 'required string'" style="color: red">Обязательная строка</p>
  <p>
    <label for="search">
      Название или ID БС <input type="text" size="10" id="search" maxlength="100" v-model="search" />
    </label>
  </p>
  <button v-if="isSearching === false" @click="searchBS()">Найти</button>
  <p v-if="isSearching === true">Идёт поиск...</p>
  <p></p>
  <table border="1" width="1000" align="center" cellpadding="10" cellspacing="5">
    <tr>
      <th>ID БС</th>
      <th>Название БС</th>
      <th></th>
    </tr>
    <tr align="center" v-for="key in resultSearch" :key="key.id">
      <td>{{ key.bs_id }}</td>
      <td>{{ key.bs_name }}</td>
      <td><button v-if="key.borrow === 0" @click="borrow(key.bs_id)">Взять</button></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const prichina = ref('');
const isBorrowing = ref(true);
const isError = ref('');
const search = ref('');
const isSearching = ref(false);
const resultSearch = ref<any[]>([]);

async function searchBS() {
  const data = {
    search: search.value,
  };
  isSearching.value = true;
  try {
    const result = await axios.post('/api/keys/search', data);
    resultSearch.value = result.data;
  } catch (error) {
    //
  }
  isSearching.value = false;
}

async function borrow(bs_id: string) {
  isError.value = '';
  const data = {
    bs_id,
    // name: name.value,
    /*  adres: adres.value, */
    prichina: prichina.value,
  };

  isBorrowing.value = true;
  try {
    await axios.post('/api/table/borrow', data);
  } catch (error) {
    isError.value = error.response.data.message;
  }
  searchBS();
  isBorrowing.value = false;
}
</script>
