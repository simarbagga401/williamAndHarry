<template>
  <main class="flex flex-col items-center h-screen w-screen p-10 relative">
    <Toaster />
    <Card
      class="size-chart-conatiner min-w-72 absolute bg-white w-1/2 h-[450px] z-10 top-[100px] left-1/7 flex flex-col items-center justify-center"
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
      class="flex items-center w-full justify-evenly h-full main-container"
      :class="{ blur: sizeChartOpen }"
    >
      <header
        class="flex flex-col justify-center items-center h-full w-1/2 main-header"
      >
        <h1 class="font-bold text-4xl text-[#07203F] m-5">
          {{ suits[parseInt(id.toString()) - 1].name }}
        </h1>
        <p class="w-72 m-5">
          {{ suits[parseInt(id.toString()) - 1].description }}
        </p>
        <Carousel class="relative w-full max-w-sm carousel">
          <CarouselContent class="bg-white p-0">
            <CarouselItem>
              <div>
                <CardContent
                  class="flex aspect-square items-center justify-center p-0"
                >
                  <img :src="suits[parseInt(id.toString()) - 1].coatImage" />
                </CardContent>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div >
                <CardContent
                  class="flex aspect-square items-center justify-center p-0"
                >
                  <img :src="suits[parseInt(id.toString()) - 1].pantImage" />
                </CardContent>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="carousel-prv" />
          <CarouselNext class="carousel-next" />
        </Carousel>
      </header>
      <footer
        class="flex flex-col items-center justify-center h-full w-1/2 main-footer m-5"
      >
        <div
          class="size-selection-container p-2 h-1/3 flex flex-col justify-evenly"
        >
          <header class="flex p-1 w-full justify-between">
            <p class="font-bold mr-3">Select Specifications</p>
            <p
              class="text-green-400 cursor-pointer"
              @click="sizeChartOpen = true"
            >
              Open Size Chart
            </p>
          </header>
          <section>
            <div class="m-2">
              <p class="m-1">2 Piece or 3 Piece :</p>
              <select
                class="rounded-[3px] p-3 text-[#07203F] w-80 bg-white border-[#07203F] border-solid border"
                v-model="selectedPiece"
              >
                <option value="2 Piece">2 Piece</option>
                <option value="3 Piece">3 Piece</option>
              </select>
            </div>
            <div class="m-2">
              <p class="m-1">Blazer Size :</p>
              <select
                class="rounded-[3px] p-3 text-[#07203F] w-80 bg-white border-[#07203F] border-solid border"
                v-model="selectedCoatSize"
              >
                <option v-for="(size, i) in coatSizes" :key="i">
                  {{ size }}
                </option>
              </select>
            </div>
            <div class="m-2">
              <p class="m-1">Trouser Size :</p>
              <select
                class="rounded-[3px] p-3 text-[#07203F] w-80 bg-white border-[#07203F] border-solid border"
                v-model="selectedPantSize"
              >
                <option v-for="(size, i) in trouserSizes" :key="i">
                  {{ size }}
                </option>
              </select>
            </div>
          </section>
        </div>
        <footer class="flex items-center w-60 max-h-16 p-5 justify-between">
          <p class="font-bold">
            ₹{{
              selectedPiece == "2 Piece"
                ? suits[parseInt(id.toString()) - 1].twoPiecePrice
                : suits[parseInt(id.toString()) - 1].threePiecePrice
            }}
          </p>
          <Button @click="handleAddToCart">Add to Cart</Button>
        </footer>
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

const coatSizes = {
  1: "S",
  2: "M",
  3: "L",
  4: "XL",
  5: "XXL",
};

const trouserSizes = {
  1: "28",
  2: "30",
  3: "32",
  4: "34",
  5: "36",
};

const selectedPiece = ref("3 Piece");

const sizeChartOpen = ref(false);
const selectedCoatSize = ref("S");
const selectedPantSize = ref("28");
let user = useCurrentUser();
const store = useUserDetailsStore();
const cart = store.cart;

const handleAddToCart = async () => {
  if (user.value == null) {
    navigateTo("/login");
  }

  const selectedItem = store.cart.find(
    (item) =>
      item.id == parseInt(id.toString()) &&
      item.coatSize == selectedCoatSize.value &&
      item.piece == selectedPiece.value &&
      item.pantSize == selectedPantSize.value
  );
  if (!selectedItem) {
    store.addToCart({
      id: suits[parseInt(id.toString()) - 1].id,
      name: suits[parseInt(id.toString()) - 1].name,
      price:
        selectedPiece.value == "2 Piece"
          ? suits[parseInt(id.toString()) - 1].twoPiecePrice
          : suits[parseInt(id.toString()) - 1].threePiecePrice,
      coatImage: suits[parseInt(id.toString()) - 1].coatImage,
      quantity: 1,
      coatSize: selectedCoatSize.value,
      pantSize: selectedPantSize.value,
      piece: selectedPiece.value,
    });
  } else {
    let index = store.cart.findIndex(
      (item) =>
        item.id == parseInt(id.toString()) &&
        item.coatSize == selectedCoatSize.value &&
        item.piece == selectedPiece.value &&
        item.pantSize == selectedPantSize.value
    );
    store.cart[index].quantity++;
  }

  toast("Item added to Cart");
};

const { id } = useRoute().params;
</script>

<style scoped>
.blur {
  filter: blur(5px);
  background: rgb(227, 227, 227);
}
@media screen and (max-width: 1000px) {
  .main-container {
    flex-direction: column;
  }
  .main-footer {
    width: 100%;
  }
  .main-header {
    width: 100%;
  }
  .carousel-prv {
    display: none;
  }
  .carousel-next {
    display: none;
  }
  main {
    height: auto;
  }
  .carousel {
    width: 100vw;
  }
}
</style>
