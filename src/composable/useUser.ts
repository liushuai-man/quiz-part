import { useUserStore } from '@/store/modules/use.ts'; 
import { getUserInfoByUsername } from '@/api/userinfo';
import { onMounted } from 'vue';

const useStore = useUserStore();
async function loadUserInfo() {
  try {
    const userInfo = await getUserInfoByUsername(useStore.username);
    useStore.username = userInfo.username;
    useStore.character = userInfo.character;
  } catch (error) {
    console.error('Error loading user info:', error);
  }
}


onMounted(() => {
  loadUserInfo();
});