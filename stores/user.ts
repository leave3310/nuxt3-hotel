import { defineStore } from "pinia";

import type { BaseUserInfo } from "@/typing/base/user.ts";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<BaseUserInfo | null>(null);
  const updateUserInfo = (payload: BaseUserInfo) => userInfo.value = payload;

  return {
    userInfo,
    updateUserInfo,
  };
});
