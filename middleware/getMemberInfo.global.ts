import { checkUserIsLogin, getUser } from "@/api/instances/user.ts";

export default defineNuxtRouteMiddleware(async () => {
  const auth = useCookie("auth");
  if (auth.value) {
    const isSuccess = await checkUserIsLogin();
    if (isSuccess) {
      await getUser();
    }
  }
});
