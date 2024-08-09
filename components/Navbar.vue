<template>
  <nav class="w-full flex items-center justify-end h-16">
    <img src="~/assets/images/logo.png" alt="logo" class="logo" />
    <NuxtLink to="/" class="mx-5">Shop</NuxtLink>
    <NuxtLink to="/myOrders" class="mx-5">My orders</NuxtLink>
    <NuxtLink to="aboutUs" class="mx-5">About us</NuxtLink>
    <img :src="user?.photoURL ?? ''" class="w-10 ml-3 rounded-full" />
    <p class="mx-5">{{ user?.displayName }}</p>
    <Button @click="handleSignOut" class="mx-5">Sign out</Button>
  </nav>
</template>

<script setup lang="ts">
const auth = useFirebaseAuth();
import { signOut } from "firebase/auth";

const user = useCurrentUser();
const handleSignOut = () => {
  if (auth) signOut(auth);
};
</script>

<style scoped>
.logo {
  width: 60px;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
