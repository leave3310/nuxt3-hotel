<script setup lang="ts">
import { UserRouteEnum } from "@/typing/enum/router.ts";

import UserBg from "@/assets/images/user/user_bg.jpg";

definePageMeta({
  layout: "black-header",
});

const userBgClass = computed(() => {
  return {
    "background-image": `url(${UserBg})`,
  };
});

const routeList = [
  {
    name: "個人資料",
    path: UserRouteEnum.INDEX,
  },
  {
    name: "我的訂單",
    path: UserRouteEnum.ORDERS,
  },
];
</script>

<template>
  <div class="bg-neutral-100">
    <div class="user-bg bg-cover bg-center bg-no-repeat px-5 py-10 xl:flex xl:items-center xl:py-[7.5rem] xl:pl-[19.5rem]">
      <img src="@/assets/images/user/user_icon.png" alt="" class="mb-4 size-[4.5rem] xl:mb-0 xl:mr-6 xl:size-36">
      <p class="h3 xl:h1 text-neutral-0">
        Hello，Jessica
      </p>
    </div>
    <div class="px-3 py-10 xl:mx-auto xl:max-w-[81.0625rem] xl:px-0 xl:pb-[7.5rem] xl:pt-20">
      <nav class="mb-10 xl:mb-20">
        <ul class="flex">
          <li
            v-for="item in routeList" :key="item.path"
          >
            <NuxtLink :to="{ name: item.path }" class="subtitle xl:title relative px-6 py-4 text-white after:absolute after:bottom-[0.13rem] after:left-1/2 after:h-1 after:w-8 after:-translate-x-1/2 after:rounded-[0.625rem] after:content-[''] hover:text-primary hover:after:bg-primary">
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <NuxtPage />
    </div>
    <div>
      <img src="@/assets/images/long_decorate.png" alt="" class="hidden w-full xl:flex">
      <img src="@/assets/images/short_decorate.png" alt="" class="w-full xl:hidden">
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.router-link-exact-active {
  @apply text-primary;
  @apply after:bg-primary;
}
.user-bg {
  background-image: url("@/assets/images/user/user_bg.jpg");
  @media (min-width: theme("screens.xl")) {
    background-image: url("@/assets/images/user/desktop_user_bg.png");
  }
}
</style>
