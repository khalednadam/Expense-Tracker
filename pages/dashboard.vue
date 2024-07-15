<script setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "app",
  middleware: "auth",
});

const { getSession } = useAuth();
const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const session = ref();
const addExpenseDialog = ref(false);

const loading = ref(false);
const amount = ref(0);
const type = ref("");
const category = ref("");
const serviceName = ref("");
const description = ref("");
const expense = ref();

const addExpense = async () => {
  loading.value = true;
  try {
    expense.value = await $fetch("/api/expense", {
      method: "POST",
      body: {
        amount: amount.value,
        type: type.value,
        category: category.value,
        serviceName: serviceName.value,
        description: description.value,
      },
    });
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
    amount.value = 0;
    type.value = "";
    category.value = "";
    serviceName.value = "";
    description.value = "";
    addExpenseDialog.value = false;
  }
};

watchEffect(async () => {
  session.value = await getSession();
});

watch(expense, async () => {
  await authStore.getUser();
});
</script>
<template>
  <NuxtLayout>
    <h1 class="text-3xl font-bold">Dashboard</h1>
    <v-row class="my-5">
      <v-col cols="3" class="justify-center flex flex-col">
        <div>
          <p class="opacity-65">Total Balance</p>
          <h2 class="text-4xl font-bold" :key="expense">
            {{ user?.user.currency }} {{ user?.user.totalBalance }}
          </h2>
        </div>
      </v-col>
      <v-col cols="3" class="justify-start flex flex-col">
        <div>
          <p class="opacity-65">Most Common Category</p>
          <h2 class="text-4xl font-bold" :key="expense">Food</h2>
        </div>
      </v-col>

      <v-col cols="6" class="flex flex-col justify-center items-end">
        <v-btn color="primary" @click="() => (addExpenseDialog = true)">
          <Icon name="ph:plus" size="20" />
          Add expense
        </v-btn>
      </v-col>
    </v-row>
    <Suspense>
      <AppExpensesTable :key="expense" />
    </Suspense>
    <v-dialog v-model="addExpenseDialog" class="lg:max-w-[50vw]">
      <v-card>
        <v-card-title>Add expense</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="amount"
            type="number"
            label="Amount"
            placeholder="Enter the amount. 15 for example"
          >
            <template #prepend-inner>
              {{ session?.user.currency }}
            </template>
          </v-text-field>
          <v-select
            label="Type"
            v-model="type"
            :items="['withdrawal', 'deposit']"
          ></v-select>
          <v-autocomplete
            v-model="category"
            label="Category"
            :items="[
              'Food',
              'Clothing',
              'Housing',
              'Groceries',
              'Transportation',
              'Medical',
              'Bills',
              'Education',
              'Entertainment',
            ]"
          ></v-autocomplete>
          <v-text-field
            v-model="serviceName"
            label="Service name"
          ></v-text-field>
          <v-textarea label="Description" v-model="description"></v-textarea>
          <div class="w-full flex justify-end gap-2">
            <v-btn
              color="primary"
              variant="outlined"
              @click="() => (addExpenseDialog = false)"
              >Cancel</v-btn
            >
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="loading"
              @click="addExpense"
              >Add</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </NuxtLayout>
</template>
