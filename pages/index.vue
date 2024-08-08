<template>
  <main class="flex flex-col items-center h-sc">
    <nav class="w-screen flex items-center justify-end">
      <img src="~/assets/images/logo.png" alt="logo" class="logo" />
      <p>{{ user?.displayName }}</p>
      <img :src="user?.photoURL ?? ''" class="w-10 ml-3 rounded-full" />
      <Button @click="handleSignOut" class="m-4">sign out</Button>
    </nav>
    <section class="flex items-center w-full justify-center h-full">
      <Carousel>
        <CarouselContent class="relative w-full max-w-xs">
          <CarouselItem v-for="(suit, i) in suits" :key="i">
            <Card class="w-4/5">
              <CardHeader>
                <CardTitle>{{ suit.name }}</CardTitle>
                <CardDescription>{{ suit.description }}</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel>
                  <CarouselContent>
                    <CarouselItem>
                      <!-- <img src="~/assets/images/white-coat.jpeg" width="200px"> -->
                      a
                    </CarouselItem>
                    <CarouselItem>
                      <!-- <img src="~/assets/images/white-pant.jpeg" width="200px"> -->
                      b
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
              <CardFooter> Card Footer </CardFooter>
            </Card>
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

const suits = [{ name: 'White Suit', description: ' A classic blue jacket, often in shades like navy or royal blue. Coordinating trousers in the same shade of blue as the coat', coatImage: '~/assets/images/white-coat.jpeg', pantImage: '~/assets/images/white-pant.jpeg' }, { name: 'Blue Suit', description: ' A classic blue jacket, often in shades like navy or royal blue. Coordinating trousers in the same shade of blue as the coat', coatImage: '~/assets/images/white-coat.jpeg', pantImage: '~/assets/images/white-pant.jpeg' }]

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
