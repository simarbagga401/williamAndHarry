<template>
  <section class="flex flex-col items-center w-full h-screen">
    <h1 class="font-bold text-4xl p-10">My Orders</h1>
    <div class="flex items-center justify-evenly h-200px">
      <p class="font-medium text-2xl p-10" v-if="myOrders == null">
        No Orders to Track
      </p>
      <section v-else>
        <div v-for="(order, i) in myOrders.orders" :key="i">
          <div>
            <Card class="m-2">
              <CardHeader>
                <CardTitle>Order ID: {{ order.orderId }}</CardTitle>
              </CardHeader>
              <CardContent>
                <template v-for="(product, i) in order.products" :key="i">
                  <p>
                    {{ product.name }} x {{ product.quantity }} x
                    {{ product.coatSize }} x {{ product.pantSize }}
                  </p>
                  <p>₹{{ product.price }}</p>
                </template>
              </CardContent>
              <CardFooter>
                <p>
                  Delivery Status:
                  <span
                    :class="
                      order.delivery == 'Pending' ? 'Pending' : 'Delivered'
                    "
                    >{{ order.delivery }}</span
                  >
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <Button @click="navigateTo('/')" v-if="myOrders == null">Shop</Button>
    </div>
      <Button disabled v-if="loading">
        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
        Please wait
      </Button>
  </section>
</template>

<script setup lang="ts">
import { collection, doc, getDoc } from "firebase/firestore";
import { Loader2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
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
const loading = ref(true);

setTimeout(() => {
  const { data, promise } = useDocument(
    doc(collection(db, "users"), user.value?.uid)
  );
  promise.value
    .then((user: any) => {
      myOrders.value = user;
    })
    .catch((error: any) => {
      console.log("error firebase", error);
    });
    loading.value = false;
}, 4000);
</script>

<style scoped>
span.Pending {
  color: #ef4444;
}
span.Delivered {
  color: green;
}
</style>
