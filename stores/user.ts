import { defineStore } from "pinia";

import type { BaseUserInfo } from "@/typing/base/user.ts";

export const useUserStore = defineStore("user", () => {
  const auth = useCookie("auth");

  const userInfo = ref<BaseUserInfo | null>(null);
  const updateUserInfo = (payload: BaseUserInfo) => userInfo.value = payload;
  const clearUserInfo = () => userInfo.value = null;
  const isLogin = computed(() => {
    return !!auth.value;
  });

  return {
    userInfo,
    updateUserInfo,
    clearUserInfo,
    isLogin,

  };
});
