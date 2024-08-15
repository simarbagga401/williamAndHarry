<template>
  <section
    class="flex flex-col items-center justify-evenly p-2 py-10 absolute w-full h-full"
  >
    <Card class="w-1/2 p-5 min-w-[320px] max-w-2xl">
      <form @submit="handlePayment">
        <FormField name="name" v-slot="{ componentField }">
          <FormItem class="m-2">
            <FormLabel>Personal Details</FormLabel>
            <FormControl>
              <Input placeholder="Name*" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="mobileNo" v-slot="{ componentField }">
          <FormItem class="m-2">
            <FormControl>
              <Input placeholder="Mobile Number*" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="pincode" v-slot="{ componentField }">
          <FormItem class="m-2">
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input
                placeholder="Pincode*"
                v-bind="componentField"
                @change="getCityState"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="address" v-slot="{ componentField }">
          <FormItem class="m-2">
            <FormControl>
              <Input placeholder="Address*" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="town" v-slot="{ componentField }">
          <FormItem class="m-2">
            <FormControl>
              <Input placeholder="Locality / Town*" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="district" v-slot="{ componentField }">
          <FormItem class="m-2">
            <FormControl>
              <Input
                placeholder="City*"
                v-bind="componentField"
                disabled
                :value="district"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="state" v-slot="{ componentField }">
          <FormItem class="m-2">
            <FormControl>
              <Input
                placeholder="State*"
                v-bind="componentField"
                disabled
                :value="state"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="m-2">Pay</Button>
        <Button
          class="m-2 bg-red-500 hover:bg-red-400"
          @click="$emit('closeCheckoutForm')"
          >Close</Button
        >
      </form>
    </Card>
  </section>
</template>

<script setup lang="ts">
import axios from "axios";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import logo from "~/assets/images/logo.png";

import { db } from "~/firebase.js";
import { doc, collection, setDoc } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore"; // Import the DocumentData type

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import zipcodes from "zipcodes";
import { useUserDetailsStore } from "~/store/store";
const store = useUserDetailsStore();
const runtimeconfig = useRuntimeConfig();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    mobileNo: z.string().min(10).max(10),
    pincode: z.string().min(6).max(6),
    address: z.string().min(2).max(50),
    town: z.string().min(2).max(50),
    district: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
  })
);
const district = ref(null);
const state = ref(null);
const user = useCurrentUser();

const getCityState = async () => {
  const fetchCityState = (
    await fetch(`https://api.postalpincode.in/pincode/${form.values.pincode}`)
  ).json();
  const fetchedCity = await fetchCityState;

  district.value = fetchedCity[0].PostOffice[0].District;
  state.value = fetchedCity[0].PostOffice[0].State;
};

const form = useForm({
  validationSchema: formSchema,
});

const userDocument = useDocument(doc(collection(db, "users"), user.value?.uid));
let prevOrders = ref(null);
if (userDocument.data.value?.orders != null) {
  const { ...orders } = userDocument.data.value.orders;
  prevOrders.value = orders;
}

const handlePayment = async (e: any) => {
  e.preventDefault();
  if (
    !form.values.name ||
    !form.values.mobileNo ||
    !form.values.pincode ||
    !form.values.address ||
    !form.values.town ||
    state.value == null ||
    district.value == null
  ) {
    return alert("Some Order Details are missing!");
  }
  const data = {
    amount: store.totalAmount(),
    name: form.values.name,
    id: user.value?.uid,
    email: user.value?.email,
    mobileNo: form.values.mobileNo,
    pincode: form.values.pincode,
    address: form.values.address,
    town: form.values.town,
    district: district.value,
    state: state.value,
    products: store.cart.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      };
    }),
  };

  axios
    .post(
      "https://us-central1-williamandharry-9288e.cloudfunctions.net/api/createPayment",
      data
    )
    .then((res: any) => {
      console.log(res);
      let order = res.data.order;
      var options = {
        key: runtimeconfig.public.RAZORPAY_KEY_ID,
        amount: order.amount_due,
        name: "William and Harry",
        image: logo,
        currency: order.currency,
        description: "Thank you for shopping with us",
        order_id: order.id,
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.mobileNo,
        },
        theme: {
          color: "#000000", // Set your website theme color
        },
        handler: (response: any) => {
          setDoc(doc(db, "orders", order.id), {
            ...data,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            delivery: "Pending",
          });

          setDoc(doc(db, "users", user.value?.uid ?? ""), {
            orders: [
              prevOrders.value,
              {
                orderId: response.razorpay_order_id,
                products: data.products,
                delivery: "Pending",
              },
            ],
          });
          store.cart = [];
          navigateTo("/myOrders");
        },
      };

      console.log(options);
      var rzp = new Razorpay(options);
      rzp.open();
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<style scoped></style>
