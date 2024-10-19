import { defineStore } from "pinia";

import dayjs from "dayjs";
import type { BaseUserInfo } from "@/typing/base/user.ts";

export const useUserStore = defineStore("user", () => {
  const auth = useCookie("auth");

  const userInfo = ref<BaseUserInfo | null>(null);
  const updateUserInfo = (payload: BaseUserInfo) => userInfo.value = payload;
  const clearUserInfo = () => userInfo.value = null;
  const isLogin = computed(() => {
    return !!auth.value;
  });
  const birthYear = computed(() => dayjs(userInfo.value?.birthday).year());
  const birthMonth = computed(() => dayjs(userInfo.value?.birthday).month() + 1);
  const birthday = computed(() => dayjs(userInfo.value?.birthday).date());

  return {
    userInfo,
    updateUserInfo,
    clearUserInfo,
    isLogin,
    birthYear,
    birthMonth,
    birthday,

  };
});
