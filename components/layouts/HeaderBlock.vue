<script setup lang="ts">
import { ref } from "vue";

import { AppRouteEnum } from "@/typing/enum/router.ts";

import LogoIcon from "@/assets/icons/logo.svg";
import MobileLogoIcon from "@/assets/icons/mobile-logo.svg";
import MenuIcon from "@/assets/icons/ic-menu.svg";
import CloseIcon from "@/assets/icons/ic-close.svg";

interface NavList {
  name: string;
  link: string;
};
const navList: NavList[] = [
  {
    name: "客房旅宿",
    link: AppRouteEnum.LOGIN,
  },
  {
    name: "會員登入",
    link: AppRouteEnum.LOGIN,
  },
];

const isShowMobileNav = ref(false);

const toggleMobileNav = (isShow: boolean) => (isShowMobileNav.value = isShow);

const mobileNavClass = () => (isShowMobileNav.value ? "flex" : "hidden");
</script>

<template>
  <header class="sticky inset-x-0 top-0 bg-black px-3 py-4 xl:px-20 xl:py-6">
    <div class="flex items-center justify-between">
      <div>
        <LogoIcon class="hidden w-[12.25rem] xl:flex" />
        <MobileLogoIcon class="w-[6.86001rem] xl:hidden" />
      </div>

      <div>
        <div class="xl:hidden">
          <MenuIcon
            class="size-10 cursor-pointer fill-neutral-0 p-0.5"
            @click="toggleMobileNav(!isShowMobileNav)"
          />
        </div>
        <div
          class="fixed inset-0 min-w-container flex-col items-center bg-neutral-100 xl:static xl:flex xl:bg-transparent"
          :class="mobileNavClass()"
        >
          <div class="flex w-full justify-end px-5 pt-5 xl:hidden">
            <CloseIcon
              class="size-16 cursor-pointer fill-neutral-0 p-2"
              @click="toggleMobileNav(!isShowMobileNav)"
            />
          </div>
          <div class="flex w-full flex-1 flex-col justify-center px-5 xl:flex-row xl:px-0">
            <ul class="flex flex-col items-center xl:flex-row">
              <li v-for="item in navList" :key="item.name" class="mr-0 w-full xl:mr-4">
                <NuxtLink :to="{ name: item.link }" class="mb-4 flex justify-center p-4 text-base font-bold tracking-[0.02rem] text-neutral-0 xl:mb-0">
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
            <button
              type="button"
              class="rounded-lg bg-primary px-8 py-4 text-base font-bold tracking-[0.02rem] text-neutral-0"
            >
              立即訂房
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
