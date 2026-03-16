<template>
  <DefaultLayout>
    <header class="flex p-6 items-center justify-between border-b border-gray-200">
      <span class="font-bold text-gray-900">准备好来一场小测验了吗？</span>
      <div class="flex items-center gap-4">
        <span class="cursor-pointer" @click="openUserName">
          {{ userStore.username }}
        </span>
        <UserIdentityInput v-if="isUserNameVisible" @submit="onSubmitName" />
        <RouterLink
          to="/quiz"
          class="px-6 py-3 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >开始新测验</RouterLink
        >
      </div>
    </header>

    <VLeaderboard :leaderboard="leaderboard" class="mt-8" />
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import VLeaderboard from '@/components/VLeaderboard/index.vue';
import UserIdentityInput from '@/components/UserIdentityInput/index.vue';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store/modules/use';

const userStore = useUserStore();
const isUserNameVisible = ref(false);
const onSubmitName = (name) => {
  userStore.setUsername(name);
  isUserNameVisible.value = false;
};
const openUserName = () => {
  isUserNameVisible.value = true;
};

const leaderboard = ref([]);
leaderboard.value = localStorage.getItem('leaderboard') ? JSON.parse(localStorage.getItem('leaderboard')) : [];
</script>

<style scoped>
/* 可以保留一些自定义样式，或者完全使用 Tailwind CSS */
</style>
