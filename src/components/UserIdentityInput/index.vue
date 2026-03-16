<template>
  <div class="flex gap-2">
    <input v-model="username" type="text" placeholder="请输入用户名" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <button @click="onSubmit" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">提交</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/use';

const username = ref('');
const emit = defineEmits(['submit']); 
const onSubmit = () => {
  if (username.value.trim()) {
    emit('submit', username.value);
  }
};
</script>

<style scoped>
/* 可以保留一些自定义样式，或者完全使用 Tailwind CSS */
</style>
