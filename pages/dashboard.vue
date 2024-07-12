<script setup>
definePageMeta({
  layout: "app",
  middleware: "auth",
});

const { data } = useAuth();
</script>
<template>
  <NuxtLayout>
    <h1 class="text-3xl">
      Welcome, <span class="font-bold">{{ data.user.name }}</span>
    </h1>
  </NuxtLayout>
</template>
