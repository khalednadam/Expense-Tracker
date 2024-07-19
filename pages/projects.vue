<template>
  <NuxtLayout>
    <div>projects</div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "app",
  middleware: "auth",
});
</script>
