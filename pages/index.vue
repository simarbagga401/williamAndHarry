<template>
  <main class="flex flex-col items-center">
    <nav class="w-screen flex items-center justify-end">
      <img src="~/assets/images/logo.png" alt="logo" class="logo" />
      <p>{{ user?.displayName }}</p>
      <img :src="user.photoURL" class="w-10 ml-3 rounded-full" />
      <Button @click="handleSignOut" class="m-4">sign out</Button>
    </nav>
    <Card class="w-4/5">
      <CardHeader>
        <CardTitle>Blue Suit</CardTitle>
        <CardDescription
          >A classic blue jacket, often in shades like navy or royal blue.
          Coordinating trousers in the same shade of blue as the
          coat</CardDescription
        >
      </CardHeader>
      <CardContent>
        <!-- <Carousel>
          <CarouselContent>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> -->
        card content
      </CardContent>
      <CardFooter> Card Footer </CardFooter>
    </Card>
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
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

const auth = useFirebaseAuth();
const user = useCurrentUser();

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
