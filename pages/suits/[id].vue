<template>
  <main class="flex flex-col items-center h-screen w-screen">
    <Navbar v-if="!mobile" />
    <Hamburger v-if="mobile" />
    <section
      class="flex flex-col items-center w-full justify-evenly h-full px-20"
    >
      <h1 class="font-bold text-4xl">
        {{ suits[parseInt(id.toString()) - 1].name }}
      </h1>
      <div class="description-container h-20">
        <p>
          {{ suits[parseInt(id.toString()) - 1].description }}
        </p>
      </div>
      <Carousel class="relative w-full max-w-sm">
        <CarouselContent>
          <CarouselItem>
            <div class="p-1">
              <Card>
                <CardContent
                  class="flex aspect-square items-center justify-center p-6"
                >
                  <img :src="suits[parseInt(id.toString()) - 1].coatImage" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="p-1">
              <Card>
                <CardContent
                  class="flex aspect-square items-center justify-center p-6"
                >
                  <img :src="suits[parseInt(id.toString()) - 1].pantImage" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <footer class="flex items-center max-h-16 p-5">
        <p class="font-bold">₹{{ suits[parseInt(id.toString()) - 1].price }}</p>
        <Button class="mx-10">Buy Now</Button>
      </footer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { suits } from "~/products";

const mobile = window.innerWidth < 768;

const { id } = useRoute().params;
</script>

<style scoped>
.description-container {
  overflow: auto;
  padding:10px;
}
p{
  text-align: center;
}
</style>
