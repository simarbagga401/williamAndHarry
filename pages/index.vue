<template>
  <main class="flex flex-col items-center h-screen w-screen">
    <Navbar v-if="!mobile"/>
    <Hamburger v-if="mobile"/>
    <section class="flex items-center w-full justify-center h-full px-10">
      <Carousel class="relative w-full max-w-sm">
        <CarouselContent>
          <CarouselItem>
            <div class="p-1">
              <Card>
                <CardContent
                  class="flex aspect-square items-center justify-center p-6"
                >
                  <img :src="suit.coatImage" />
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
                  <img :src="suit.pantImage" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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

const mobile = window.innerWidth < 768;

import whiteCoatImage from "~/assets/images/white-coat.jpeg";
import whitePantImage from "~/assets/images/white-pant.jpeg";
const suit = {
  name: "White Suit",
  description:
    " A classic blue jacket, often in shades like navy or royal blue. Coordinating trousers in the same shade of blue as the coat",
  coatImage: whiteCoatImage,
  pantImage: whitePantImage,
};
</script>

<style scoped>
</style>
