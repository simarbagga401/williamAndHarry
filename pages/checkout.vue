<template>
  <section class="flex flex-col items-center justify-evenly p-2 py-10">
    <Card class="w-1/2 p-5 min-w-[320px] max-w-2xl">
      <form>
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
      </form>
    </Card>
  </section>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

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
const district = ref("");
const state = ref("");

const getCityState = async () => {
  const fetchCity = (
    await fetch(`https://api.postalpincode.in/pincode/${form.values.pincode}`)
  ).json();
  const fetchedCity = await fetchCity;

  district.value = fetchedCity[0].PostOffice[0].District;
  state.value = fetchedCity[0].PostOffice[0].State;
};

const form = useForm({
  validationSchema: formSchema,
});
</script>

<style scoped></style>
