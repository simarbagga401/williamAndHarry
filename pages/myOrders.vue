<template>
  <div>
    <Navbar v-if="!mobile"/>
    <Hamburger v-if="mobile"/>
    <h1 class="font-bold text-4xl">My Orders</h1>
  </div>
</template>

<script setup lang="ts">
const mobile = window && window.innerWidth < 768;

</script>

<style scoped></style>
