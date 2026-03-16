<template>
  <Transition name="modal">
    <!-- 直接绑定点击背景关闭 -->
    <div
      v-if="show"
      class="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-gray-200 bg-opacity-10"
      @click.self="onClose"
    >
      <div class="rounded-2xl p-6 bg-white shadow-lg animate-fade-in">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// 1. 自动导入：Vue3 <script setup> 不需要 import 基础API
import { watch, onUnmounted } from 'vue';

// 2. 定义 props（Vue3 标准写法）
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

// 3. 定义 emit（Vue3 必须显式声明）
const emit = defineEmits<{
  (e: 'on-close'): void;
}>();

// 关闭方法
const onClose = () => {
  emit('on-close');
};

// 监听 ESC 关闭
const onEscapeKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') onClose();
};

// 监听 show 变化，添加/移除事件监听
watch(
  () => props.show,
  (val) => {
    if (val) {
      window.addEventListener('keyup', onEscapeKey);
    } else {
      window.removeEventListener('keyup', onEscapeKey);
    }
  },
  { immediate: true },
);

// 组件销毁时清理事件（重要！防止内存泄漏）
onUnmounted(() => {
  window.removeEventListener('keyup', onEscapeKey);
});
</script>

<style scoped>
/* 自定义动画样式 */
.modal-enter-active,
.modal-leave-active {
  transition: ease 0.3s all;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

@keyframes show {
  from {
    opacity: 0.7;
    margin-top: -160px;
  }

  to {
    opacity: 1;
    margin-top: 0;
  }
}

.animate-fade-in {
  animation: show 0.5s forwards;
}
</style>
