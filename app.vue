<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const user = useCurrentUser();
const router = useRouter();
onMounted(() => {
  watch(user, (currentUser, prevUser) => {
    if (!currentUser && prevUser) {
      return router.replace("/login");
    }
  });
});
</script>

<style>
body {
  overflow: hidden;
}
</style>
