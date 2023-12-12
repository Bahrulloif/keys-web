<template>
  <p>
    <label for="name">
      ФИО инженера
      <input type="text" id="name" size="30" maxlength="50" v-model="name" v-on:keyup.enter="getTable()" />
    </label>
  </p>
  <p>
    <label for="bsId">
      БС <input type="text" id="bsId" size="30" maxlength="100" v-model="bsId" v-on:keyup.enter="getTable()"
    /></label>
  </p>
  <p>
    <label for="begindate"> Дата с <input type="date" id="begindate" maxlength="8" v-model="begindate" /></label>
    <label for="begintime"> время <input type="time" required id="begintime" v-model="begintime" /></label>
  </p>
  <p>
    <label for="enddate"> по дата <input type="date" id="enddate" v-model="enddate" /></label>
    <label for="endtime"> время <input type="time" required id="endtime" v-model="endtime" /></label>
  </p>
  <p>
    <label for="keyBool">Не сданные<input type="checkbox" id="keyBool" name="keyBool" v-model="keyBool" /></label>
  </p>
  <p></p>
  <p><button @click="reset()">Сброс</button></p>
  <p><button @click="getTable()">Поиск</button></p>
  <span id="status" hidden>Sending...</span>
  <span id="error" hidden style="color: red">Wrong login or password!</span>

  <p v-if="role === 'ADMIN' || role === 'MANAGER'" align="right">
    <button class="button" @click="exportReportToExcel()">Export</button>
  </p>
  <table border="1" width="1000" align="center" cellpadding="5" cellspacing="1" style="margin-top: 100px">
    <tr>
      <th>№№</th>
      <th>Дата получения</th>
      <th>Инженер</th>
      <th>Цель визита</th>
      <th>БС ID</th>
      <th>Название БС</th>
      <th>Дата сдачи</th>
      <th>Кем принят</th>
    </tr>
    <tr align="center" v-for="key in table" :key="key.id" :class="{ 'red-row': !key.return_date }">
      <td>{{ key.id }}</td>
      <td>{{ key.borrow_date }}</td>
      <td>{{ key.fio }}</td>
      <td>{{ key.prichina }}</td>
      <td>{{ key.bs_id }}</td>
      <td>{{ key.bs_name }}</td>
      <td>{{ key.return_date }}</td>
      <td>{{ key.fio_receiver }}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue';
import axios from 'axios';
import exportFromJSON from 'export-from-json';
import { role } from '@/globals';

const prichinaMap: any = {
  '1': '1.Добавление/Удаление TRX',
  '2': '2.Замена/Добавление АКБ',
  '3': '3.Запуск стойки/Расширение',
  '4': '4.Измерение оптического кросса',
  '5': '5.Инвентаризация',
  '6': '6.Монтаж 2G/3G/4G',
  '7': '7.Общий сайт',
  '8': '8.Плановый осмотр сайта',
  '9': '9.Подключение потоков',
  '10': '10.Работы по заявке',
  '11': '11.Работы подрядчиков',
};

// async function searchTable() {
//   const data = {
//     name: name.value,
//     bsId: bsId.value,
//     begintime: begintime.value,
//     begindate: begindate.value,
//     endtime: endtime.value,
//     enddate: enddate.value,
//   };

//   isSearching.value = true;
//   try {
//     const result = await axios.post('/api/table/search', data);
//     const search = result.data;
//   } catch (error) {
//     //
//   }
// }

const name = ref('');
const bsId = ref('');
const begindate = ref('');
const begintime = ref('00:00');
const enddate = ref('');
const endtime = ref('23:59');
const isSearching = ref(false);
const table = ref<any[]>([]);
const keyBool = ref(true);

function reset() {
  name.value = '';
  bsId.value = '';
  begindate.value = '';
  begintime.value = '00:00';
  enddate.value = '';
  endtime.value = '23:59';
}

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

function exportReportToExcel() {
  const fileName = 'download';
  const exportType = exportFromJSON.types.xls;

  exportFromJSON({
    data: toRaw(table).value,
    fileName,
    exportType,
    fields: {
      id: '№№',
      borrow_date: 'Дата получения',
      fio: 'ФИО получателя',
      prichina: 'Цель визита',
      bs_id: 'БС ID',
      bs_name: 'Название БС',
      return_date: 'Дата сдачи',
      fio_receiver: 'Кем принят',
    },
  });
}

async function getTable() {
  const data = {
    name: name.value,
    bsId: bsId.value,
    keyBool: keyBool.value,
    beginDateTime: new Date(`${begindate.value} ${begintime.value}`),
    endDateTime: new Date(`${enddate.value} ${endtime.value}`),
  };

  try {
    const result = await axios.post('/api/table', data);
    table.value = result.data.map((e: any) => {
      return {
        ...e,
        prichina: prichinaMap[e.prichina],
        borrow_date: new Date(e.borrow_date).toLocaleDateString(['tj-TJ', 'ru-RU', 'en-US'], options),
        return_date: e.return_date
          ? new Date(e.return_date).toLocaleDateString(['tj-TJ', 'ru-RU', 'en-US'], options)
          : undefined,
      };
    });
    console.log('ReSult', result.data);
  } catch (error) {
    //
  }
}
getTable();
</script>
<style>
.red-row {
  background-color: blueviolet;
}
.red-row td {
  color: white !important;
}
</style>
