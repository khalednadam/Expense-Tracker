<script setup>
definePageMeta({
  layout: "app",
  middleware: "auth",
});

const { getSession } = useAuth();
const session = ref();
onMounted(async () => {
  session.value = await getSession();
});
</script>
<template>
  <NuxtLayout>
    <h1 class="text-3xl font-bold">Dashboard</h1>
    <v-row class="my-5">
      <v-col cols="12">
        <div>
          <p class="opacity-65">total balance</p>
          <h2 class="text-4xl font-bold">
            {{ session?.user.currency }} {{ session?.user.totalBalance }}
          </h2>
        </div>
      </v-col>
    </v-row>
    <Suspense>
      <AppExpensesTable />
    </Suspense>
  </NuxtLayout>
</template>
