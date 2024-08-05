import { useCookie, useRouter } from "nuxt/app";
import type { FetchError } from "ofetch";

import { fetchInstance } from "@/api/index.ts";
import { useUserStore } from "@/stores/user.ts";
import { AppRouteEnum } from "@/typing/enum/router.ts";
import { errorSweetAlert } from "@/utils/sweetAlert.ts";
import type { LoginPayload, PostLoginRes } from "@/typing/api/user.ts";
import type { CustomFetchError } from "@/typing/api/index.ts";

export async function postLogin(payload: LoginPayload) {
  const authCookie = useCookie("auth");
  const router = useRouter();
  const userStore = useUserStore();

  try {
    const res = await fetchInstance<PostLoginRes>("v1/user/login", {
      method: "POST",
      body: payload,
    });
    authCookie.value = res.token;
    userStore.updateUserInfo(res.result);
    router.push({ name: AppRouteEnum.INDEX });
  }
  catch (error) {
    const test = error as CustomFetchError | null;
    errorSweetAlert(`${test?.data?.message}`, () => {
      // if (data.message !== "此使用者不存在") {
      //   // 登入失敗需停留在登入頁
      //   router.push({
      //     path: "/",
      //   });
      // }
    });
  }
}

export async function getUser() {
  const router = useRouter();
  const userStore = useUserStore();
  const authCookie = useCookie("auth");

  try {
    const res = await fetchInstance<PostLoginRes>("v1/user/", {
      method: "GET",
    });

    authCookie.value = res.token;
    userStore.updateUserInfo(res.result);
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    router.push({ name: AppRouteEnum.LOGIN });
  }
}
