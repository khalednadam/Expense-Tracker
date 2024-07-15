<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

// access the `store` variable anywhere in the component ✨
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.getUser();
});
</script>
<template>
  <v-app>
    <AppHeader />
    <v-container class="h-full mt-20">
      <slot />
    </v-container>
  </v-app>
</template>
