<template>
  <main class="flex flex-col items-center h-screen w-screen">
    <nav class="w-full flex items-center justify-end">
      <img src="~/assets/images/logo.png" alt="logo" class="logo" />
      <p>{{ user?.displayName }}</p>
      <img :src="user?.photoURL ?? ''" class="w-10 ml-3 rounded-full" />
      <Button @click="handleSignOut" class="m-4">sign out</Button>
    </nav>
    <section class="flex items-center w-full justify-center h-full px-10">
      <Carousel class="relative w-full max-w-xl">
    <CarouselContent>
      <CarouselItem v-for="(_, index) in 5" :key="index">
        <div class="p-1">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-4xl font-semibold">{{ index + 1 }}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <!-- <CarouselPrevious />
    <CarouselNext /> -->
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
