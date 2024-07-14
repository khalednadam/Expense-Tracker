<script setup>
definePageMeta({
  layout: "app",
  middleware: "auth",
});
</script>
<template>
  <NuxtLayout>
    <h1 class="text-3xl font-bold">Dashboard</h1>
  </NuxtLayout>
</template>
