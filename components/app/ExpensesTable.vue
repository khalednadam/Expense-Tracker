<script setup lang="ts">
import type { Expense } from "~/types/types";
const expenses: Ref<Expense[] | undefined | readonly any[]> = ref(undefined);

onMounted(async () => {
  watchEffect(async () => {
    expenses.value = (await $fetch(`/api/expense/expenses`))
      .expenses as Expense[];
  });
});

const search = ref("");

// CONST
const fullDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const headers = [
  {
    key: "createdAt",
    title: "Date",
  },
  {
    key: "amount",
    title: "Amount",
  },
  {
    key: "type",
    title: "Type",
  },
  {
    key: "category",
    title: "Category",
  },
  {
    key: "serviceName",
    title: "Service Name",
  },
  {
    key: "description",
    title: "Description",
  },
  { title: "Actions", key: "actions", sortable: false },
];

const deleteItem = async (item: Expense) => {
  try {
    await $fetch(`/api/expense/${item._id}`, {
      method: "delete" as any,
    });
    if (expenses.value) {
      expenses.value = expenses.value?.filter(
        (expense: Expense) => expense._id !== item._id
      );
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <v-card title="Expenses" variant="outlined">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>
    <v-data-table
      density="comfortable"
      :sort-by="[{ key: 'createdAt', order: 'desc' }]"
      :headers="headers"
      :items="expenses"
      :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="console.log(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.createdAt="{ item }">
        <div class="text-start">
          <p>
            {{
              new Date(item.createdAt).toLocaleString("en-GB", fullDateOptions)
            }}
          </p>
        </div>
      </template>
      <template v-slot:item.type="{ item }">
        <div class="text-start">
          <v-chip
            :color="item.type === 'deposit' ? 'green' : 'red'"
            :text="item.type === 'deposit' ? 'Deposit' : 'Withdrawal'"
            class="text-uppercase"
            label
          ></v-chip>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>
