<script setup lang="ts">
import { ref } from "vue";

import { logOut } from "@/api/instances/user.ts";
import { AppRouteEnum, UserRouteEnum } from "@/typing/enum/router.ts";

import LogoIcon from "@/assets/icons/logo.svg";
import MobileLogoIcon from "@/assets/icons/mobile-logo.svg";
import MenuIcon from "@/assets/icons/ic-menu.svg";
import CloseIcon from "@/assets/icons/ic-close.svg";
import IcProfile from "@/assets/icons/ic-profile.svg";

const userStore = useUserStore();

interface NavList {
  name: string;
  link: string;
};
const navList: NavList[] = [
  {
    name: "客房旅宿",
    link: AppRouteEnum.ROOMS_LIST,
  },
];

const isShowMobileNav = ref(false);
const toggleMobileNav = (isShow: boolean) => (isShowMobileNav.value = isShow);
const mobileNavClass = () => (isShowMobileNav.value ? "flex" : "hidden");

const isShowDesktopInfo = ref(false);
const updateIsShowDesktopInfo = (status: boolean) => isShowDesktopInfo.value = status;
const desktopInfoDom = ref<HTMLDivElement | null>(null);
onClickOutside(desktopInfoDom, () => {
  updateIsShowDesktopInfo(false);
});
</script>

<template>
  <header class="sticky inset-x-0 top-0 z-50 bg-neutral-100 px-3 py-4 duration-200 xl:px-20 xl:py-6">
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
          <div class="flex flex-1 flex-col justify-center px-5 xl:flex-row xl:px-0">
            <ul class="flex flex-col items-center xl:flex-row">
              <li v-for="item in navList" :key="item.name" class="mr-0 xl:mr-4">
                <NuxtLink :to="{ name: item.link }" class="title mb-4 flex p-4 text-neutral-0 xl:mb-0" @click="toggleMobileNav(!isShowMobileNav)">
                  {{ item.name }}
                </NuxtLink>
              </li>
              <li v-if="userStore.isLogin" class="title mb-4 mr-0 text-neutral-0 xl:mb-0 xl:mr-4">
                <div ref="desktopInfoDom" class="relative hidden cursor-pointer justify-center p-4 xl:flex" @click="updateIsShowDesktopInfo(!isShowDesktopInfo)">
                  <IcProfile class="mr-2 size-6 stroke-white" />
                  {{ userStore.userInfo?.name }}
                  <div v-show="isShowDesktopInfo" class="absolute right-0 top-[calc(100%+0.75rem)] w-[16.25rem] overflow-hidden rounded-[1.25rem] bg-neutral-0 py-3 text-neutral-80">
                    <nuxt-link :to="{ name: UserRouteEnum.INDEX }" class="flex px-6 py-4 transition-colors hover:bg-primary-10 hover:text-primary">
                      我的帳戶
                    </nuxt-link>
                    <button type="button" class="flex w-full px-6 py-4 transition-colors hover:bg-primary-10 hover:text-primary" @click="logOut">
                      登出
                    </button>
                  </div>
                </div>
                <nuxt-link :to="{ name: UserRouteEnum.INDEX }" class="xl:hidden">
                  我的帳戶
                </nuxt-link>
              </li>
              <li v-else class="mr-0 xl:mr-4">
                <nuxt-link :to="{ name: AppRouteEnum.LOGIN }" class="title mb-4 justify-center p-4 text-neutral-0 xl:mb-0">
                  會員登入
                </nuxt-link>
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
