<script setup lang="ts">
import { useField, useForm } from "vee-validate";

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
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
  },
});
const email = useField("email");
const password = useField("password");
const { signIn } = useAuth();

async function handleLogin() {
  try {
    await signIn("credentials", {
      email: email.value.value,
      password: password.value.value,
      callbackUrl: "/",
    });
  } catch (e) {
    console.log(e);
  }
}
</script>
<template>
  <NuxtLayout>
    <v-card class="w-1/2">
      <v-card-title> Login</v-card-title>

      <v-card-text>
        <p>Email: {{ email.value.value }}</p>
        <p>password: {{ password.value.value }}</p>
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
        <v-btn @click.prevent="() => handleLogin()">Login</v-btn>

        <p class="text-center mt-4">
          Don't have an account?
          <span class="underline">
            <NuxtLink to="/register"> Register</NuxtLink>
          </span>
        </p>
      </v-card-text>
    </v-card>
  </NuxtLayout>
</template>
