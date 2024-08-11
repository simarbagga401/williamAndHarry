<template>
  <section class="flex flex-col items-center w-full h-screen">
    <Navbar v-if="!mobile" class="navbar" />
    <Hamburger v-if="mobile" class="navbar" />
    <main class="p-10 flex flex-col items-center justify-center w-full h-full">
      <h1 class="font-bold text-4xl p-10">My Cart</h1>
      <div class="cart-items-container">
        <template v-for="(item, i) in cart" :key="i">
          {{ item }}
        </template>
      </div>
      <footer>
        <p>price</p>
        <Button>Checkout</Button>
      </footer>
    </main>
  </section>
</template>

<script setup lang="ts">
import { db } from "~/firebase.js";
import { doc, collection } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore"; // Import the DocumentData type
import { useUserDetailsStore } from "~/store/store";

const mobile = window && window.innerWidth < 768;
const user = useCurrentUser();
const store = useUserDetailsStore();
const cart = store.cart;
// const fetchedUser =
</script>
