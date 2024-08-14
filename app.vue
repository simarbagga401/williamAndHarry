<template>
  <section>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </section>
</template>

<script setup lang="ts">
</script>

<style>
body {
  overflow-x: hidden;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
