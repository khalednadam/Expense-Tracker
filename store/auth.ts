import type { User } from "~/types/types";

export const useAuthStore = defineStore("auth", () => {
  const user: Ref<User | null> = ref(null);
  async function getUser() {
    try {
      const { data }: any = await $fetch("/api/user");
      user.value = data as any;
    } catch (err) {
      console.log(err);
    }
  }

  return { user, getUser };
});
