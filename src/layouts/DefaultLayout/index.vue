<template>
  <main class="p-8 md:p-16 lg:p-32">
    <slot />
  </main>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>

<style scoped>
/* 可以保留一些自定义样式，或者完全使用 Tailwind CSS */
</style>
