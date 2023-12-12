import { ref } from 'vue';

export const firstName = ref(localStorage.getItem('firstName'));
export const lastName = ref(localStorage.getItem('lastName'));
export const role = ref(localStorage.getItem('role'));
