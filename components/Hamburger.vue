<template>
  <nav class="w-full flex items-center justify-end h-16">
    <img src="~/assets/images/logo.png" alt="logo" class="logo" />
    <DropdownMenu class="dropDownMenu">
      <DropdownMenuTrigger>
        <img src="~/assets/images/bars-solid.svg" alt="" class="w-7 mx-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel class="flex items-center">
          <img :src="user?.photoURL ?? ''" class="w-10 ml-3 rounded-full" />
          <p class="mx-5">{{ user?.displayName }}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="navigateTo('/')">Shop</DropdownMenuItem>
        <DropdownMenuItem @click="navigateTo('/myOrders')" v-if="user">
          My orders
        </DropdownMenuItem>
        <DropdownMenuItem @click="navigateTo('/aboutUs')">
          About Us
        </DropdownMenuItem>
        <DropdownMenuItem @click="navigateTo('/cart')" v-if="user"
          >My Cart</DropdownMenuItem
        >
        <DropdownMenuItem @click="handleSignOut" v-if="user">
          Sign out
        </DropdownMenuItem>
        <DropdownMenuItem @click="navigateTo('/login')" v-else>
          Sign in
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const auth = useFirebaseAuth();
import { signOut } from "firebase/auth";
const user = useCurrentUser();

const handleSignOut = () => {
  if (auth) signOut(auth);
};
</script>

<style scoped>
/* @media screen and (max-width: 768px) {
  .dropDownMenu {
    display: none;
  }
} */

.logo {
  width: 60px;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
