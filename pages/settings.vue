<template>
  <NuxtLayout>
    <div>settings</div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "app",
  middleware: "auth",
});
</script>
