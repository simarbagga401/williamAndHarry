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
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import logo from "~/assets/images/logo.png";

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
import Razorpay from "razorpay";
const store = useUserDetailsStore();

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
const runtimeConfig = useRuntimeConfig();

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

const handlePayment = async (e: any) => {
  e.preventDefault();
  fetch(
    "https://us-central1-williamandharry-9288e.cloudfunctions.net/api/test",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: store.totalAmount }),
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

  // if (
  //   !form.values.name ||
  //   !form.values.mobileNo ||
  //   !form.values.pincode ||
  //   !form.values.address ||
  //   !form.values.town ||
  //   state.value == null ||
  //   district.value == null
  // ) {
  //   return alert("Some Order Details are missing!");
  // }
  // const data = {
  //   amount: store.totalAmount,
  //   name: form.values.name,
  //   email: user.value?.email,
  //   mobileNo: form.values.mobileNo,
  //   pincode: form.values.pincode,
  //   address: form.values.address,
  //   town: form.values.town,
  //   district: district.value,
  //   state: state.value,
  // };
  //  var options = {
  //       key: 'rzp_test_3oTGnK8huvIVkw',
  //       amount: '500',
  //       name: "William and Harry",
  //       image: logo,
  //       currency: "INR",
  //       description: "Thank you for shopping with us",
  //       prefill: {
  //         name: data.name,
  //         email: data.email,
  //         contact: data.mobileNo,
  //       },
  //       theme: {
  //         color: "#000000", // Set your website theme color
  //       },
  //       handler: (response: any) => {
  //         console.log("payment successful", response);
  //       },
  //     };
  //     var rzp = new Razorpay(options);
  //     rzp.open();

  // fetch(
  //   "https://us-central1-williamandharry-9288e.cloudfunctions.net/api/createPayment",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }
  // )
  //   .then((res: any) => {
  //     console.log(res);
  //     let order = res.data;
  //     var options = {
  //       key: process.env.RAZORPAY_KEY_ID,
  //       amount: order.amount_due,
  //       name: "William and Harry",
  //       image: logo,
  //       currency: order.currency,
  //       description: "Thank you for shopping with us",
  //       order_id: order.id,
  //       prefill: {
  //         name: data.name,
  //         email: data.email,
  //         contact: data.mobileNo,
  //       },
  //       theme: {
  //         color: "#000000", // Set your website theme color
  //       },
  //       handler: (response: any) => {
  //         console.log("payment successful", response);
  //       },
  //     };

  //     var rzp = new Razorpay(options);
  //     rzp.open();
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
};
</script>

<style scoped></style>
