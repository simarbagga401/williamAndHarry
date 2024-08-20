<template>
  <main class="flex flex-col items-center justify-between w-full pt-5">
    <section class="hero-section flex items-center justify-center w-full">
      <section class="block1"></section>
      <section class="block2"></section>
      <h1
        class="font-bold text-6xl text-white p-3 m-5 mx-16 bg-[#07203F] absolute top-1/3 heading"
      >
        Premium Suits
      </h1>
      <p
        class="text-2xl p-2 text-[#07203F] justify-self-center bg-slate-50 absolute top-1/2"
      >
        Choose from a wide range of suits for every occasion.
      </p>
    </section>
    <section class="suits-container h-full">
      <Card v-for="(suit, i) in suits" :key="i" class="m-10 card max-h-[600px]">
        <CardHeader>
          <CardTitle class="text-[#07203F]"> {{ suit.name }}</CardTitle>
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
    <section
      class="w-full p-20 flex flex-col items-center justify-center text-[#07203F]"
    >
      <h1 class="font-bold text-4xl p-10">Testimonials</h1>
      <Carousel class="w-full max-w-sm">
        <CarouselContent>
          <CarouselItem
            v-for="(testimonial, index) in testimonials"
            :key="index"
          >
            <div class="p-1">
              <Card>
                <CardHeader>
                  <CardTitle class="text-center text-[#07203F]">{{
                    testimonial.name
                  }}</CardTitle>
                </CardHeader>
                <CardContent
                  class="flex aspect-square items-center justify-center p-6"
                >
                  <img :src="testimonial.image" class="testimonial-image" />
                </CardContent>
                <CardFooter>
                  <CardDescription class="text-center text-xl">{{
                    testimonial.review
                  }}</CardDescription>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
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
        <img
          src="~/assets/images/envelope-solid.svg"
          class="social-media-link"
        />
        <img src="~/assets/images/phone-solid.svg" class="social-media-link" />
      </div>
    </footer>
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import face1 from "~/assets/images/face1.jpg";
import face2 from "~/assets/images/face2.jpg";
import face3 from "~/assets/images/face3.jpg";

const testimonials = [
  {
    name: "John Doe",
    review: "The suits are of great quality and fit perfectly.",
    image: face1,
  },
  {
    name: "Jane Doe",
    review: "I love the variety of suits available on the website.",
    image: face2,
  },
  {
    name: "Alice",
    review: "The suits are affordable and look great.",
    image: face3,
  },
];
</script>

<style scoped>
img {
  width: clamp(200px, 100%, 400px);
}
.card {
  width: clamp(200px, 80%, 600px);
}

.hero-section {
  height: 80vh;
  background: grey;
  position: relative;

  .block1 {
    height: 100%;
    width: 50%;
    background: url("~/assets/images/suit2.jpg") center;
    background-size: cover;
  }
  .block2 {
    width: 50%;
    height: 100%;
    background: url("~/assets/images/suit1.jpg") center;
    background-size: cover;
  }
}

.suits-container {
  width: clamp(400px, 80%, 1000px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-items: center;
  justify-content: center;
}
.testimonial-image {
  width: 200px;
  border-radius: 5px;
}

.social-media-link {
  width: 30px;
  padding: 5px;
  background-color: white;
  margin: 10px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  img {
    width: 100px;
  }
  .block1 {
    width: 100% !important;
  }
  .block2 {
    display: none;
  }
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

@media screen and (max-width: 570px) {
  .heading {
    top: 25%;
  }
}
</style>
