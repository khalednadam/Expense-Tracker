<script setup>
definePageMeta({
  layout: "app",
  middleware: "auth",
});

const { data } = useAuth();
</script>
<template>
  <NuxtLayout>
    <h1 class="text-3xl font-bold">
      Dashboard
    </h1>
  </NuxtLayout>
</template>
