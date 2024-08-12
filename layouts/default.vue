<template>
  <section>
    <Hamburger v-if="mobile" class="navbar" />
    <Navbar v-else class="navbar" />
    <slot />
  </section>
</template>

<script setup lang="ts">
const mobile = window && window.innerWidth < 768;
</script>

<style scoped></style>
