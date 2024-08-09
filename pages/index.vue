<template>
  <main class="flex flex-col items-center h-screen w-screen">
    <Navbar v-if="!mobile" />
    <Hamburger v-if="mobile" />
    <section class="w-full h-full">
      <Card v-for="(suit, i) in suits" :key="i" class="m-10 card max-h-[600px]">
        <CardHeader>
          <CardTitle>{{ suit.name }}</CardTitle>
          <CardDescription>{{ suit.description }}</CardDescription>
        </CardHeader>
        <CardContent>
          <img :src="suit.coatImage" />
        </CardContent>
        <CardFooter class="flex justify-between">
          <p class="text-lg font-bold">₹{{ suit.price }}</p>
          <Button  @click="navigateTo(`/suits/${suit.id}`)"
            >Buy Now</Button
          >
        </CardFooter>
      </Card>
    </section>
  </main>
</template>

<script setup lang="ts">
const mobile = window.innerWidth < 768;
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
section {
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-items: center;
  justify-content: center;
}
</style>
