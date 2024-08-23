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
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, doc, setDoc } from "firebase/firestore";
import type { DocumentData } from "firebase-admin/firestore";

const input = ref();
const isAdmin: Ref<any> = ref(false);

const handleSubmit = async () => {
  const axiosReq = await axios.post(
    "https://us-central1-williamandharry-9288e.cloudfunctions.net/api/checkIfAdmin",
    {
      adminPassword: input.value,
    }
  );
  isAdmin.value = axiosReq.data;
};

const orders = ref([]);
setTimeout(() => {
  const { data, promise } = useCollection(collection(db, "users"));
  promise.value.then((users: any) => {
    orders.value = users;
  });
}, 2000);

const changeOrderDeliveryStatus = (userId: string, orderId: string) => {
  const { data, promise } = useDocument(doc(collection(db, "users"), userId));

  promise.value.then((user: any) => {
    const order = user.orders.find((o: any) => o.orderId == orderId);
    if (order.delivery == "Pending") {
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
      setDoc(doc(collection(db, "users"), order.userId), {
        ...user,
        orders: updatedOrders,
      });
    }
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
      <Card
        v-for="(order, i) in orders.map((o) => o.orders)"
        :key="i"
        class="order-container flex p-10 m-10"
      >
        <template v-for="(o, m) in order" :key="m">
          <div class="values-container m-5">
            <p v-for="(el, j) in o" :key="j" class="m-2">
              {{ j }} :
              {{ el }}
            </p>
          </div>
          <Button @click="changeOrderDeliveryStatus(o.userId, o.orderId)">{{
            o.delivery == "Pending" ? "Order Delivered" : "Order Not Delivered"
          }}</Button>
        </template>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.order-container {
  width: clamp(300px, 100%, 1000px);
}
</style>
