import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";
import type { UseFetchOptions } from "nuxt/app";

export function fetchInstance<T, DefaultR extends NitroFetchRequest = NitroFetchRequest, R extends NitroFetchRequest = DefaultR, O extends NitroFetchOptions<R> = NitroFetchOptions<R>>(url: string, options?: O) {
  const config = useRuntimeConfig();
  const authCookie = useCookie("auth");

  return $fetch<T>(url, {
    baseURL: config.public.apiURL,
    headers: {
      Authorization: authCookie.value ? `${authCookie.value}` : "",
    },
    ...options,
  });
}

export function useFetchInstance<T>(
  url: string | (() => string),
  options?: Omit<UseFetchOptions<T>, "default"> & { default: () => T | Ref<T> },
) {
  const config = useRuntimeConfig();
  const authCookie = useCookie("auth");

  return useFetch(url, {
    baseURL: config.public.apiURL,
    headers: {
      Authorization: authCookie.value ? `${authCookie.value}` : "",
    },
    ...options,
  });
}
