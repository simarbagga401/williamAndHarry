<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const input = ref();
const isAdmin = ref(false)
const runtimeConfig = useRuntimeConfig();
const adminPassword = runtimeConfig.public.ADMIN_PASSWORD

const handleSubmit = () => {
  input.value == adminPassword ? isAdmin.value = true : isAdmin.value = false;
}
</script>

<template>
  <section class="h-screen w-screen flex items-center justify-center">
    <Card v-if="!isAdmin" >
      <CardHeader>
        <CardTitle>Enter Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex w-full max-w-sm items-center gap-1.5">
          <Input  type="password" placeholder="Enter Password" v-model="input"/>
          <Button type="submit" @click="handleSubmit">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
    <div v-else>
      <h1>welcome to admin page</h1>
    </div>
  </section>

</template>

<style scoped></style>