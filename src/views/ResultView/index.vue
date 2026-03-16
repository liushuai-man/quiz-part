<template>
  <VModal :show="isModalOpen" @on-close="closeModal" class="max-w-md">
    <div class="flex flex-col items-center">
      <div class="relative w-32 h-32 rounded-full overflow-hidden border-3 border-blue-500">
        <img :src="character.image" :alt="character.name" class="absolute inset-0 w-full h-full object-cover" />
      </div>

      <span class="mt-8 text-xl font-bold text-gray-900">{{ character.name }}</span>

      <p class="mt-6 text-center text-gray-600">
        您成功获得了角色 <span class="font-bold text-gray-900">«{{ character.name }}»</span>！
        {{ character.summary }}
      </p>
    </div>

    <button
      class="w-full mt-12 px-8 py-3 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      @click="onCharacterSubmited"
    >
      接受角色
    </button>
  </VModal>

  <DefaultLayout class="flex min-h-screen items-center justify-center flex-col">
    <h1 class="text-2xl font-bold text-gray-900">结束了！</h1>
    <span class="mt-4 text-gray-600">恭喜！您在本次测验中获得了 {{ score }} 分！</span>

    <div class="mt-14 flex gap-4">
      <button
        class="px-6 py-3 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        @click="openModal"
      >
        查看结果
      </button>
      <RouterLink
        to="/quiz"
        class="px-6 py-3 font-bold text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
        >重试</RouterLink
      >
    </div>
  </DefaultLayout>
</template>

<script setup>
import VModal from '@/components/VModal/index.vue';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import characters from '@/assets/mock/characters.json';
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/use';

const score = ref(0);
const isModalOpen = ref(false);
const router = useRouter();
const userStore = useUserStore();
const character = computed(() => {
  return characters.find((c) => score.value >= c.minimumScore);
});
onBeforeMount(() => {
  if (localStorage.getItem('score')) {
    score.value = JSON.parse(localStorage.getItem('score'));
  }
});
const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};
const updateLeaderboard = (character) => {
  let leaderboard = [];

  if (localStorage.getItem('leaderboard')) {
    leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
  }
  leaderboard.push(character);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};
const onCharacterSubmited = () => {
  if (userStore.character === null || userStore.character.score <= score.value) {
    try {
      updateUserInfo({
        username: userStore.username,
        score: score.value,
        name: character.value.name,
        summary: character.value.summary,
        image: character.value.image,
      });
    } catch (error) {
      console.error('更新用户信息失败:', error);
    }
  }

  isModalOpen.value = false;
  router.push('/');
};
</script>

<style scoped>
/* 可以保留一些自定义样式，或者完全使用 Tailwind CSS */
</style>
