<template>
  <section class="flex flex-col items-center w-full h-screen">
    <h1 class="font-bold text-4xl p-10">My Orders</h1>
    <div class="flex items-center justify-evenly h-200px">
      <p class="font-medium text-2xl p-10" v-if="myOrders == null">
        No Orders to Track
      </p>
      <Card v-else>
        <div v-for="(order, i) in myOrders" :key="i">
          <div v-if="order">
            <CardHeader>
            <CardTitle>Order ID: {{ order.orderId }}</CardTitle>
          </CardHeader>
          <CardContent>
            <template v-for="(product, i) in order.products" :key="i">
              <p>{{ product.name }} x {{ product.quantity }}</p>
              <p>₹{{ product.price }}</p>
            </template>
          </CardContent>
          <CardFooter>
            <p>Delivery Status: {{ order.delivery }}</p>
          </CardFooter>
          </div>
         
        </div>
      </Card>
      <Button @click="navigateTo('/')" v-if="myOrders == null">Shop</Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { collection, doc } from "firebase/firestore";
import { db } from "~/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const user = useCurrentUser();
const myOrders = ref(null);

setTimeout(() => {
  const { data, promise } = useDocument(
    doc(collection(db, "users"), user.value?.uid)
  );

  promise.value.then((user: any) => {
    myOrders.value = user.orders
    console.log(myOrders.value)
  });
},500)
</script>

<style scoped></style>
