<template>
  <section class="flex flex-col items-center w-full h-screen">
    <Navbar v-if="!mobile" class="navbar" />
    <Hamburger v-if="mobile" class="navbar" />
    <main class="p-10 flex flex-col items-center justify-center w-full h-full">
      <h1 class="font-bold text-4xl p-10">My Cart</h1>
      <div class="cart-items-container">

      </div>
      <footer>
        <p>price</p>
        <Button>Checkout</Button>
      </footer>
    </main>
  </section>
</template>

<script setup lang="ts">
const mobile = window && window.innerWidth < 768;

</script>

<style scoped></style>
