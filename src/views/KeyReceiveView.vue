<template>
  <p>ID BS: {{ bsId }}</p>
  <p v-if="isCameraOpen === true"><QrStream @decode="ondecode"></QrStream></p>
  <p><button @click="camera()">Camera</button></p>

  <p><button @click="receive()">Prinyat</button></p>
  <p v-if="okMessage === 'ok'" style="color: green">Ключь принят</p>
  <p v-if="isError === true" style="color: red">Ключь уже в кабинете</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import { QrStream } from 'vue3-qr-reader';

const bsId = ref('');
const isError = ref(false);
const isReceiving = ref(false);
const okMessage = ref('');
const isCameraOpen = ref(false);
function ondecode(value: string) {
  bsId.value = value;
  isCameraOpen.value = false;
}

function camera() {
  isCameraOpen.value = true;
  bsId.value = '';
}

async function receive() {
  const data = {
    bsId: bsId.value,
  };

  isReceiving.value = true;
  okMessage.value = '';
  isError.value = false;
  try {
    const result = await axios.post('/api/table/receiver', data);
    okMessage.value = result.data.message;
  } catch (error) {
    isError.value = true;
    // erMessage.value = error.response.data.message;
    // console.log('Oshibka', erMessage);
  }

  isReceiving.value = false;
}
</script>
