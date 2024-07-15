import type { User } from "~/types/types";

export const useAuthStore = defineStore("auth", () => {
  const user: Ref<User | null> = ref(null);
  async function getUser() {
    user.value = await $fetch("/api/user/");
  }

  return { user, getUser };
});
