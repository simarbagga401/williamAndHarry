<template>
  <main class="flex flex-col items-center h-screen w-screen py-10 relative">
    <Toaster />
    <Card
      class="size-chart-conatiner absolute bg-white w-1/2 h-[450px] z-10 top-[300px] left-1/7 flex flex-col items-center justify-center"
      v-show="sizeChartOpen"
    >
      <Table>
        <TableCaption>Size Chart</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> Size </TableHead>
            <TableHead>Chest (in)</TableHead>
            <TableHead>Across Shoulder (in)</TableHead>
            <TableHead>Front Length (in)</TableHead>
            <TableHead>To Fit Waist (in)</TableHead>
            <TableHead>Inseam Length (in)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="font-bold">S</TableCell>
            <TableCell>38.0</TableCell>
            <TableCell>17.0</TableCell>
            <TableCell>27.0</TableCell>
            <TableCell>30.0</TableCell>
            <TableCell>34.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="font-bold">M</TableCell>
            <TableCell>40.0</TableCell>
            <TableCell>17.5</TableCell>
            <TableCell>27.5</TableCell>
            <TableCell>32.0</TableCell>
            <TableCell>34.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="font-bold">L</TableCell>
            <TableCell>42.0</TableCell>
            <TableCell>18.0</TableCell>
            <TableCell>28.0</TableCell>
            <TableCell>34.0</TableCell>
            <TableCell>34.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="font-bold">XL</TableCell>
            <TableCell>44.0</TableCell>
            <TableCell>18.5</TableCell>
            <TableCell>28.5</TableCell>
            <TableCell>36.0</TableCell>
            <TableCell>34.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="font-bold">XXL</TableCell>
            <TableCell>46.0</TableCell>
            <TableCell>19.0</TableCell>
            <TableCell>29.0</TableCell>
            <TableCell>38.0</TableCell>
            <TableCell>34.0</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        @click="sizeChartOpen = false"
        class="m-2 bg-red-500 hover:bg-red-400"
        >Close</Button
      >
    </Card>
    <section
      class="flex flex-col items-center w-full justify-evenly h-full px-20"
      :class="{ blur: sizeChartOpen }"
    >
      <h1 class="font-bold text-4xl text-[#07203F]">
        {{ suits[parseInt(id.toString()) - 1].name }}
      </h1>
      <div class="description-container h-25 flex items-center">
        <p>
          {{ suits[parseInt(id.toString()) - 1].description }}
        </p>
      </div>
      <div class="size-selection-container p-2">
        <header class="flex p-1 w-full justify-between">
          <p class="font-bold">Select Size:</p>
          <p
            class="text-green-400 cursor-pointer"
            @click="sizeChartOpen = true"
          >
            Open Size Chart
          </p>
        </header>
        <template v-for="(size, i) in sizes" :key="i">
          <button
            class="p-2 m-2 border border-[#07203F] rounded-md"
            @click="selectedSize = size"
            :class="{ 'bg-[#07203F] text-white': selectedSize === size }"
          >
            {{ size }}
          </button>
        </template>
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
      <footer class="flex items-center w-60 max-h-16 p-5 justify-between">
        <p class="font-bold">₹{{ suits[parseInt(id.toString()) - 1].price }}</p>
        <Button @click="handleAddToCart">Add to Cart</Button>
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserDetailsStore } from "~/store/store";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "vue-sonner";

import { suits } from "~/products";

const sizes = {
  1: "S",
  2: "M",
  3: "L",
  4: "XL",
  5: "XXL",
};

const sizeChartOpen = ref(false);
const selectedSize = ref("S");
watch(
  () => selectedSize.value,
  (value) => {
    console.log(value);
  }
);
let user = useCurrentUser();
const store = useUserDetailsStore();
const cart = store.cart;

const handleAddToCart = async () => {
  if (user.value == null) {
    navigateTo("/login");
  }

  const selectedItem = store.cart.find(
    (item) =>
      item.id == parseInt(id.toString()) && item.size == selectedSize.value
  );
  if (!selectedItem) {
    store.addToCart({
      id: suits[parseInt(id.toString()) - 1].id,
      name: suits[parseInt(id.toString()) - 1].name,
      price: suits[parseInt(id.toString()) - 1].price,
      coatImage: suits[parseInt(id.toString()) - 1].coatImage,
      quantity: 1,
      size: selectedSize.value,
    });
  } else {
    let index = store.cart.findIndex(
      (item) =>
        item.id == parseInt(id.toString()) && item.size === selectedSize.value
    );
    store.cart[index].quantity++;
  }

  toast("Item added to Cart");
};

const { id } = useRoute().params;
</script>

<style scoped>
.description-container {
  overflow: auto;
  padding: 10px;
}
p {
  text-align: center;
}
.blur {
  filter: blur(5px);
  background: rgb(227, 227, 227);
}
</style>
