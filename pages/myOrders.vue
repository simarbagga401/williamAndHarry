<template>
  <section class="flex flex-col items-center w-full h-screen">
    <h1 class="font-bold text-4xl p-10">My Orders</h1>
    <div class="flex items-center justify-evenly h-200px">
      <p class="font-medium text-2xl p-10">No Orders to Track</p>
      <Button @click="navigateTo('/')">Shop</Button>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
