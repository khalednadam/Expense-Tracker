<script setup lang="ts">
import { useField, useForm } from "vee-validate";
definePageMeta({
  layout: "auth",
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard",
  },
});

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string) {
      if (value?.length >= 2) return true;

      return "Name needs to be at least 2 characters.";
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    password(value: string) {
      if (value?.length >= 2) {
        return true;
      } else {
        return "Please enter a valid password";
      }
    },
    confirmPassword(value: string) {
      if (value === password.value.value || value?.length < 2) {
        return true;
      } else {
        return "Passwords doesn't match";
      }
    },
  },
});
const email = useField("email");
const name = useField("name");
const password = useField("password");
const confirmPassword = useField("confirmPassword");
const submit = async () => {
  try {
    const stat = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        name: name.value.value,
        password: password.value.value,
        email: email.value.value,
      },
    });
    await navigateTo("/login");
  } catch (err: any) {}
};
</script>
<template>
  <NuxtLayout>
    <v-card>
      <v-card-title> <h1 class="text-3xl">Register</h1></v-card-title>
      <v-card-text>
        <form @submit.prevent="() => submit()">
          <v-text-field
            v-model="name.value.value"
            label="Name"
            placeholder="John Doe"
          >
          </v-text-field>
          <v-text-field
            label="Email"
            v-model="email.value.value"
            placeholder="john@example.com"
          >
          </v-text-field>
          <v-text-field
            v-model="password.value.value"
            type="password"
            label="Password"
            placeholder="Enter your password"
          >
          </v-text-field>
          <v-text-field
            v-model="confirmPassword.value.value"
            type="password"
            label="Password Confirmation"
            placeholder="Enter your password again"
          >
          </v-text-field>
          <v-btn type="submit">Register</v-btn>
        </form>
        <p class="text-center mt-4">
          Already have an account?
          <span class="underline">
            <NuxtLink to="/login"> Login </NuxtLink>
          </span>
        </p>
      </v-card-text>
    </v-card>
  </NuxtLayout>
</template>
