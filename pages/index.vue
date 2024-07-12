<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard",
  },
});
</script>
<template>
  <NuxtLayout>
    <v-card class="w-1/2">
      <v-card-title> Welcome</v-card-title>
      <v-card-text
        class="flex flex-col w-full justify-center items-center mx-auto p-10"
      >
        <div class="w-full flex flex-col space-y-4 justify-center items-center">
          <NuxtLink to="/register" class="w-full">
            <v-btn class="w-full"> Register </v-btn>
          </NuxtLink>
          <NuxtLink to="/login" class="w-full">
            <v-btn class="w-full">Login</v-btn>
          </NuxtLink>
        </div>
      </v-card-text>
    </v-card>
  </NuxtLayout>
</template>
