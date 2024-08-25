<template>
  <footer class="w-full h-[100px] bg-[#07203F] flex">
    <div
      class="footer-links-container h-full flex w-1/2 justify-center items-center"
    >
      <NuxtLink to="/" class="text-white p-5">Shop</NuxtLink>
      <NuxtLink to="/aboutUs" class="text-white p-5">About Us</NuxtLink>
      <NuxtLink to="/login" class="text-white p-5">Sign In</NuxtLink>
    </div>
    <div
      class="footer-social-media-container h-full flex w-1/2 justify-center items-center"
    >
      <img
        src="~/assets/images/instagram-brands-solid.svg"
        class="social-media-link"
      />
      <img src="~/assets/images/envelope-solid.svg" class="social-media-link" />
      <img src="~/assets/images/phone-solid.svg" class="social-media-link" />
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.social-media-link {
  width: 30px;
  padding: 5px;
  background-color: white;
  margin: 10px;
  border-radius: 4px;
}
@media (max-width: 768px) {
  footer {
    flex-direction: column;
    height: 200px;
    align-items: center;
  }
  .footer-links-container {
    width: 100%;
  }
  .footer-social-media-container {
    width: 100%;
  }
}
</style>
