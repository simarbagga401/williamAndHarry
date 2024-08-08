<template>
  <main class="flex flex-col items-center h-screen w-screen">
    <nav class="w-full flex items-center justify-end">
      <img src="~/assets/images/logo.png" alt="logo" class="logo" />
      <NuxtLink class="p-4" to="/myOrder">My orders</NuxtLink>
      <NuxtLink class="p-4" to="/aboutUs" >About us</NuxtLink>
      <Button @click="handleSignOut" class="m-4">sign out</Button>
    </nav>
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
import { signOut } from "firebase/auth";
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

const auth = useFirebaseAuth();
const user = useCurrentUser();

import whiteCoatImage from "~/assets/images/white-coat.jpeg";
import whitePantImage from "~/assets/images/white-pant.jpeg";
const suit = {
  name: "White Suit",
  description:
    " A classic blue jacket, often in shades like navy or royal blue. Coordinating trousers in the same shade of blue as the coat",
  coatImage: whiteCoatImage,
  pantImage: whitePantImage,
};

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
