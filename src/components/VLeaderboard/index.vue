<template>
  <section id="leaderboard" class="p-6">
    <h2 class="text-2xl font-bold">排行榜</h2>

    <div v-if="userList.length > 0" class="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <template v-for="(leader, index) in sortedUserList" :key="index">
        <div
          class="flex flex-col items-center p-8 border-2 border-blue-500 rounded-2xl bg-white w-full max-w-xs h-[400px]"
        >
          <div class="relative w-32 h-32 rounded-full overflow-hidden border-3 border-blue-500">
            <img class="w-full h-full object-cover" :src="leader.character?.image" :alt="leader.username" />
          </div>
          <span class="mt-4 text-lg">{{ leader.username }}</span>
          <span class="mt-2 text-sm text-gray-600">({{ leader.character?.name }})</span>
          <span class="mt-4 text-sm text-gray-600">{{ leader.character?.summary }}</span>
          <span class="mt-4 text-lg font-bold">{{ leader.character?.score || 0 }} 分</span>
        </div>
      </template>
    </div>

    <div v-else class="mt-4">
      <span>暂无评分记录...</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserInfoList } from '@/api/userinfo';
import { sortByScore } from '@/utils/test/modules/sortUtils';

const props = defineProps({
  leaderboard: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const userList = ref([]);
const sortedUserList = ref([]);
const fetchUserList = async () => {
  try {
    const res = await getUserInfoList();
    userList.value = res.data;
    sortedUserList.value = sortByScore(userList.value, false);
  } catch (error) {
    console.error('获取用户列表失败:', error);
  }
};

onMounted(() => {
  fetchUserList();
});
</script>

<style scoped>
/* 可以保留一些自定义样式，或者完全使用 Tailwind CSS */
</style>
