<template>
  <section class="flex flex-col items-center w-full h-screen">
    <main
      class="p-10 flex flex-col items-center justify-evenly w-full h-full"
      :class="{ blur: openCheckoutForm }"
    >
      <h1 class="font-bold text-4xl p-10 text-[#07203F]">My Cart</h1>
      <div class="cart-items-container h-1/2">
        <template v-for="(item, i) in cart" :key="i" v-if="cart.length != 0">
          <Card class="flex m-5 card justify-between">
            <CardHeader>
              <img :src="item.coatImage" width="80px" />
            </CardHeader>
            <CardContent class="p-10 flex flex-col items-start justify-evenly">
              <CardTitle>{{ item.name }}</CardTitle>
              <CardDescription class="font-bold"
                >₹{{ item.price }} X {{ item.quantity }}
                <span class="font-bold text-[#07203F] ml-5">
                  {{ item.size }}
                </span>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button @click="store.deleteFromCart(item.id)">Delete</Button>
            </CardFooter>
          </Card>
        </template>
        <div class="flex items-center justify-evenly h-200px" v-else>
          <p class="font-medium text-2xl p-10">Your Cart is Empty</p>
          <Button @click="navigateTo('/')">Shop</Button>
        </div>
      </div>
      <Card class="footer-container">
        <footer
          v-if="cart.length != 0"
          class="flex items-center justify-between p-3"
        >
          <p class="font-bold">Total : ₹{{ totalAmount() }}</p>
          <Button @click="openCheckoutForm = true">Checkout</Button>
        </footer>
      </Card>
    </main>
    <CheckoutForm
      v-if="openCheckoutForm"
      @closeCheckoutForm="openCheckoutForm = false"
    />
  </section>
</template>

<script setup lang="ts">
import { useUserDetailsStore } from "~/store/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const openCheckoutForm = ref(false);
const user = useCurrentUser();
const store = useUserDetailsStore();
const cart = store.cart;
const totalAmount = store.totalAmount;
</script>

<style>
.footer-container {
  width: clamp(250px, 50%, 500px);
}

.cart-items-container {
  overflow: auto;
}

.blur {
  filter: blur(5px);
  background: rgb(227, 227, 227);
}

@media (max-width: 768px) {
  .card {
    flex-direction: column;
    height: 350px;
  }
}
</style>
