import { getUser } from "@/api/instances/user.ts";

export default defineNuxtRouteMiddleware(async () => {
  const auth = useCookie("auth");
  if (auth.value) {
    await getUser();
  }
});
