<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "landing",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard",
  },
});
</script>
<template>
  <NuxtLayout>
    <v-row class="h-full">
      <v-col
        cols="12"
        md="6"
        class="h-full justify-center items-start flex flex-col"
      >
        <h1 class="text-7xl font-bold italic text-primary">
          Welcome to this <span class="font-thin"> simple </span>
          expense tracker
        </h1>
        <div class="flex mt-20 gap-6">
          <NuxtLink to="/login" class="w-full">
            <v-btn size="x-large" variant="flat" color="primary"> Login </v-btn>
          </NuxtLink>
          <NuxtLink to="/register" class="w-full">
            <v-btn size="x-large" variant="outlined" color="primary">
              Register
            </v-btn>
          </NuxtLink>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="h-full relative" color="primary">
          <v-card-title> </v-card-title>
          <v-card-text class="absolute bottom-0 w-full text-center"
            >All rights reserver - Khaled Nadam</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </NuxtLayout>
</template>
