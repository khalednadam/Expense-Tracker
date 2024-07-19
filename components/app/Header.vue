<script setup>
const { data, signOut } = useAuth();
</script>
<template>
  <v-app-bar elevation="0">
    <v-container>
      <v-row class="flex items-center">
        <v-col cols="6">
          <p class="font-bold text-xl">Khaled's Expense Tracker</p>
        </v-col>
        <!-- <v-col cols="8" class="mx-auto flex flex-col">
          <v-list nav class="flex items-center space-x-4 mx-auto">
            <NuxtLink to="/dashboard">
              <v-list-item :active="$route.name === 'dashboard'" @click="">
                Dashboard
              </v-list-item>
            </NuxtLink>
          </v-list>
        </v-col> -->
        <v-col cols="6" class="justify-end flex">
          <v-list>
            <v-list-item class="w-max" @click="signOut" base-color="error">
              Sign out
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
