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

const expenseToUpdate: Ref<Expense | null> = ref(null);
const updateExpenseDialog = ref(false);
const loading = ref(false);
const setExpenseToUpdateId = (expense: Expense) => {
  updateExpenseDialog.value = true;
  expenseToUpdate.value = expense;
};
const updateExpense = async () => {
  loading.value = true;
  try {
    await $fetch(`/api/expense/${expenseToUpdate.value?._id}`, {
      body: expenseToUpdate.value,
      method: "put",
    } as any);
    updateExpenseDialog.value = false;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};
watch(updateExpenseDialog, () => {
  if (!updateExpenseDialog.value) {
    expenseToUpdate.value = null;
  }
});
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
        <v-icon class="me-2" size="small" @click="setExpenseToUpdateId(item)">
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
  <v-dialog
    v-model="updateExpenseDialog"
    v-if="expenseToUpdate"
    class="lg:max-w-[50vw]"
  >
    <v-card>
      <v-card-title>Edit expense</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="expenseToUpdate.amount"
          type="number"
          label="Amount"
          placeholder="Enter the amount. 15 for example"
        >
        </v-text-field>
        <v-select
          label="Type"
          v-model="expenseToUpdate.type"
          :items="['withdrawal', 'deposit']"
        ></v-select>
        <v-autocomplete
          v-if="expenseToUpdate.type && expenseToUpdate.type === 'withdrawal'"
          v-model="expenseToUpdate.category"
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
            'Dept',
          ]"
        ></v-autocomplete>
        <v-autocomplete
          v-else-if="expenseToUpdate.type && expenseToUpdate.type === 'deposit'"
          v-model="expenseToUpdate.category"
          label="Category"
          :items="['Dept', 'Side Hustle', 'Salary']"
        ></v-autocomplete>
        <v-text-field
          v-model="expenseToUpdate.serviceName"
          label="Service name"
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="expenseToUpdate.description"
        ></v-textarea>
        <div class="w-full flex justify-end gap-2">
          <v-btn
            color="primary"
            variant="outlined"
            @click="() => (updateExpenseDialog = false)"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="updateExpense"
            >Edit</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
