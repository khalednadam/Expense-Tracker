<template>
  <div
    class="h-screen bg-primary flex flex-col justify-center items-center mx-auto"
  >
    <v-container class="w-full h-full flex justify-center items-center">
      <div class="w-1/2">
        <slot />
      </div>
    </v-container>
  </div>
</template>
