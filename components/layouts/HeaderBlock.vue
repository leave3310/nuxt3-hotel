<script setup lang="ts">
import { ref } from "vue";
import { useWindowScroll } from "@vueuse/core";

import { AppRouteEnum } from "@/typing/enum/router.ts";

import LogoIcon from "@/assets/icons/logo.svg";
import MobileLogoIcon from "@/assets/icons/mobile-logo.svg";
import MenuIcon from "@/assets/icons/ic-menu.svg";
import CloseIcon from "@/assets/icons/ic-close.svg";

const { y } = useWindowScroll();
const isShowBlackBg = ref(false);
watch(() => y.value, (newV) => {
  if (newV > 0) {
    isShowBlackBg.value = true;
  }
  else {
    isShowBlackBg.value = false;
  }
});
const showBlackBgClass = computed(() => isShowBlackBg.value ? "bg-neutral-100" : "bg-transparent");

interface NavList {
  name: string;
  link: string;
};
const navList: NavList[] = [
  {
    name: "客房旅宿",
    link: AppRouteEnum.ROOMS_LIST,
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
  <header class="fixed inset-x-0 top-0 z-50 px-3 py-4 transition-colors duration-200 xl:px-20 xl:py-6" :class="showBlackBgClass">
    <div class="flex items-center justify-between">
      <NuxtLink :to="{ name: AppRouteEnum.INDEX }">
        <LogoIcon class="hidden w-[12.25rem] xl:flex" />
        <MobileLogoIcon class="w-[6.86001rem] xl:hidden" />
      </NuxtLink>

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
                <NuxtLink :to="{ name: item.link }" class="mb-4 flex justify-center p-4 text-base font-bold tracking-[0.02rem] text-neutral-0 xl:mb-0" @click="toggleMobileNav(!isShowMobileNav)">
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
