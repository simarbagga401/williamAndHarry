<template>
  <nav class="w-full flex items-center justify-end h-16 bg-whtie">
    <img src="~/assets/images/logo.png" alt="logo" class="logo" />
    <img :src="user?.photoURL ?? ''" class="w-10 ml-3 rounded-full" />
    <p class="mx-5">{{ user?.displayName }}</p>
    <NuxtLink to="/" class="mx-5">Shop</NuxtLink>
    <NuxtLink to="/myOrders" v-if="user" class="mx-5">My orders</NuxtLink>
    <NuxtLink to="/aboutUs" class="mx-5">About us</NuxtLink>
    <Button
      class="relative"
      variant="outline"
      @click="navigateTo('/cart')"
      v-if="user"
    >
      <img
        src="~/assets/images/cart-shopping-solid.svg"
        width="15px"
        class="mr-2"
      />
      My Cart
      <div
        class="cart-items-container w-5 h-5 bg-red-500 rounded-full absolute top-[-5px] right-[-5px] overflow-hidden flex items-center justify-center"
        v-show="store.cart.length > 0"
      >
        <p class="font-bold">{{ store.cart.length }}</p>
      </div>
    </Button>
    <Button @click="handleSignOut" class="mx-5" v-if="user">Sign out</Button>
    <Button @click="navigateTo('/login')" class="mx-5" v-else>Sign in</Button>
  </nav>
</template>

<script setup lang="ts">
const auth = useFirebaseAuth();
import { signOut } from "firebase/auth";
import { useUserDetailsStore } from "~/store/store";

const store = useUserDetailsStore();
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
