<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = useFirebaseAuth();
const router = useRouter();

const signInwithGoogle = () => {
  if (auth)
    signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
      router.replace("/");
    });
};
</script>

<template>
  <div
    class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] grid-container"
  >
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <img src="~/assets/images/logo.png" alt="logo" class="logo mx-auto" />
          <h1 class="text-3xl font-bold">Join</h1>
          <p class="text-balance text-muted-foreground">
            Buy premium Quality Coats
          </p>
        </div>
        <div class="grid gap-4">
          <Button variant="outline" class="w-full" @click="signInwithGoogle()"
            >Join with Google
          </Button>
        </div>
      </div>
    </div>
    <div class="bg-muted lg:block image-container">
      <img
        src="~/assets/images/placeholder.jpg"
        alt="Image"
        height="100vh"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale image"
      />
    </div>
  </div>
</template>

<style scoped>
.image {
  height: 100vh;
}
.logo {
  width: 60px;
  position: absolute;
  top: 10px;
  left: 10px;
}

@media screen and (max-width: 1023px) {
  .image {
    height: 75.6vh;
  }
  .logo {
    position: inherit;
    margin-top: -30px;
    margin-bottom: 30px;
  }
}
</style>
