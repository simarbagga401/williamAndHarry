<template>
  <main class="flex flex-col items-center justify-center w-full py-10">
    <section class="hero-section flex flex-col items-center justify-center w-full">
      <h1 class="font-bold text-4xl text-white">Premium Suits</h1>
      <p class="text-lg text-center text-slate-50">
        Choose from a wide range of suits for every occasion.
      </p>
    </section>
    <section class="suits-container h-full">
      <Card v-for="(suit, i) in suits" :key="i" class="m-10 card max-h-[600px]">
        <CardHeader>
          <CardTitle class="text-[#07203F]">{{ suit.name }}</CardTitle>
          <CardDescription>{{ suit.description }}</CardDescription>
        </CardHeader>
        <CardContent>
          <img :src="suit.coatImage" />
        </CardContent>
        <CardFooter class="flex justify-between">
          <p class="text-lg font-bold">₹{{ suit.price }}</p>
          <Button @click="navigateTo(`/suits/${suit.id}`)">Buy Now</Button>
        </CardFooter>
      </Card>
    </section>
  </main>
</template>

<script setup lang="ts">
import { suits } from "~/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
</script>

<style scoped>
img {
  width: clamp(200px, 100%, 400px);
}
.card {
  width: clamp(200px, 80%, 600px);
}

.hero-section{
  height: 80vh;
  background-image: url('~/assets/images/hero-bg.jpg');
  background-size: cover;
}

.suits-container {
  width: clamp(400px, 80%, 1000px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  img {
    width: 100px;
  }
}
</style>
