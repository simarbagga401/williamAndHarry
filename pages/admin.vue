<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "~/firebase.js";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, doc, setDoc } from "firebase/firestore";
import type { DocumentData } from "firebase-admin/firestore";

const input = ref();
const isAdmin = ref(false);
const runtimeConfig = useRuntimeConfig();
const adminPassword = runtimeConfig.public.ADMIN_PASSWORD;

const handleSubmit = () => {
  input.value == adminPassword
    ? (isAdmin.value = true)
    : (isAdmin.value = false);
};

const { data, promise } = useCollection(collection(db, "orders"));
const orders = ref([]);
promise.value.then((o: any) => {
  orders.value = o;
});


function getKeyByValue(
  object: { [key: string]: string | number },
  value: string | number
) {
  return Object.keys(object).find((key) => object[key] === value);
}

const changeOrderDeliveryStatus = (orderId: string) => {
  const { data, promise } = useDocument(
    doc(collection(db, "orders"), orderId)
  );

  promise.value.then((order: any) => {
    const { data, promise } = useDocument(doc(collection(db, "users"), order.userId));
    promise.value.then(user => {

      if (order.delivery == 'Pending') {
        setDoc(doc(collection(db, "orders"), orderId), {
          ...order,
          delivery: "Delivered",
        });
        const updatedOrders = user?.orders.map((o: any) => {
          if (o && o.orderId == orderId) {
            return {
              ...o,
              delivery: "Delivered",
            };
          }
          return o;
        });
        setDoc(doc(collection(db, "users"), order.userId), {
          ...user,
          orders: updatedOrders,
        });
      } else {
        const updatedOrders = user?.orders.map((o: any) => {
          if (o && o.orderId == orderId) {
            return {
              ...o,
              delivery: "Pending",
            };
          }
          return o;
        });
        setDoc(doc(collection(db, "orders"), orderId), {
          ...order,
          delivery: "Pending",
        });
        setDoc(doc(collection(db, "users"), order.userId), {
          ...user,
          orders: updatedOrders
        });
      }
    })

  });

};
</script>

<template>
  <section class="h-screen w-screen flex items-center justify-center">
    <Card v-if="!isAdmin">
      <CardHeader>
        <CardTitle>Enter Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex w-full max-w-sm items-center gap-1.5">
          <Input type="password" placeholder="Enter Password" v-model="input" />
          <Button type="submit" @click="handleSubmit"> Submit </Button>
        </div>
      </CardContent>
    </Card>
    <div v-else class="w-full h-full">
      <Card v-for="(order, i) in orders" :key="i" class="order-container flex p-10 m-10">
        <div class="values-container m-5">
          <p v-for="(el, j) in order" :key="j" class="m-2">
            {{ j }} :
            {{ el }}
          </p>
        </div>
        <Button @click="changeOrderDeliveryStatus(order.orderId)">{{
          order.delivery == "Pending"
            ? "Order Delivered"
            : "Order Not Delivered"
        }}</Button>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.order-container {
  width: clamp(300px, 100%, 1000px);
}
</style>
