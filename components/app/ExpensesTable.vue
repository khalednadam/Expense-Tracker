<script setup lang="ts">
const expenses = ref();
onMounted(async () => {
  expenses.value = (await $fetch(`/api/expense/expenses`)).expenses;
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
];
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
      density="compact"
      :headers="headers"
      :items="expenses"
      :search="search"
    >
      <template v-slot:item.createdAt="{ item }: any">
        <div class="text-start">
          <p>
            {{
              new Date(item.createdAt).toLocaleString("en-GB", fullDateOptions)
            }}
          </p>
        </div>
      </template>
      <template v-slot:item.type="{ item }: any">
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
