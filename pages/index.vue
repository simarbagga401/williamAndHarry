<template>
  <div>
    <button @click="handleSignOut">sign out</button>
    <h1>{{ user?.displayName }}</h1>
  </div>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";
const auth = useFirebaseAuth();
const user = useCurrentUser();

const handleSignOut = () => {
  if (auth) signOut(auth);
};
</script>

<style scoped></style>
