<script setup lang="ts">
import { AppRouteEnum } from "@/typing/enum/router.ts";

import IcCheck from "@/assets/icons/ic-check.svg";

definePageMeta({
  layout: "only-header",
});

const currentStep = ref(1);

const step2Class = computed(() => {
  if (currentStep.value === 2) {
    return "bg-primary text-neutral-0";
  }
  return "border border-neutral-60 text-neutral-60";
});
const step2TextClass = computed(() => {
  if (currentStep.value === 2) {
    return "text-neutral-0";
  }
  return "text-neutral-60";
});
</script>

<template>
  <div class="relative flex-1 xl:flex">
    <div class="absolute right-0 top-8 w-full xl:top-[4.5rem] xl:max-h-[11.6875rem] xl:max-w-[66.25rem]">
      <img src="@/assets/images/light_short_line.png" alt="" class="w-full">
    </div>
    <div class="relative hidden w-1/2 xl:flex">
      <img
        src="@/assets/images/login_bg.jpg"
        class="size-full object-cover object-center"
        alt=""
      >
    </div>
    <div class="relative mx-auto w-full max-w-[23.4375rem] p-5 xl:max-w-[26rem] xl:px-0 xl:pt-[5.31rem]">
      <div class="mb-4">
        <p class="subtitle mb-2 text-primary">
          享樂酒店，誠摯歡迎
        </p>
        <h1 class="h3 text-neutral-0">
          立即註冊
        </h1>
      </div>
      <div class="mb-10 flex items-center py-4">
        <div class="flex shrink-0 flex-col items-center justify-center">
          <div class="title mb-1 flex size-8 items-center justify-center rounded-full bg-primary text-neutral-0">
            <span v-show="currentStep === 1">1</span>
            <span v-show="currentStep !== 1"><IcCheck class="size-4 text-neutral-0" /></span>
          </div>
          <div class="subtitle text-neutral-0">
            輸入信箱及密碼
          </div>
        </div>
        <hr class="mx-2 w-full max-w-[8.3125rem] rounded-[0.625rem] border-neutral-60">
        <div class="flex shrink-0 flex-col items-center justify-center">
          <div class="title mb-1 flex size-8 items-center justify-center rounded-full" :class="step2Class">
            2
          </div>
          <div class="subtitle" :class="step2TextClass">
            填寫基本資料
          </div>
        </div>
      </div>
      <form v-if="currentStep === 1" class="mb-4" @submit.prevent="currentStep++">
        <div class="mb-10">
          <div class="mb-4">
            <label
              for="email"
              class="subtitle xl:title mb-2 flex text-neutral-0"
            >電子信箱</label>
            <!-- v-model="email" -->
            <input
              id="email"
              data-testid="email-input"
              type="email"
              placeholder="hello@exsample.com"
              class="xl:body body2 w-full rounded-lg border bg-neutral-0 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0"
            >
            <!-- :class="isShowErrorClass(emailErrorMessage)" -->
            <!-- <div
                v-show="isShowErrorMessage(emailErrorMessage)"
                class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
              >
                {{ emailErrorMessage }}
              </div> -->
          </div>

          <div class="mb-4">
            <label
              for="password"
              class="subtitle xl:title mb-2 flex text-neutral-0"
            >密碼</label>
            <!-- v-model="password" -->
            <input
              id="password"
              data-testid="password-input"
              type="password"
              placeholder="請輸入密碼"
              class="xl:body body2 w-full rounded-lg border bg-neutral-0 p-4 tracking-[0.0175rem] focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0"
            >
            <!-- :class="isShowErrorClass(passwordErrorMessage)" -->
            <!-- <div
                v-show="isShowErrorClass(passwordErrorMessage)"
                class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
              >
                {{ passwordErrorMessage }}
              </div> -->
          </div>

          <div class="mb-4">
            <label
              for="confirmPassword"
              class="subtitle xl:title mb-2 flex text-neutral-0"
            >確認密碼</label>
            <!-- v-model="password" -->
            <input
              id="confirmPassword"
              data-testid="password-input"
              type="password"
              placeholder="請再輸入一次密碼"
              class="xl:body body2 w-full rounded-lg border bg-neutral-0 p-4 tracking-[0.0175rem] focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0"
            >
            <!-- :class="isShowErrorClass(passwordErrorMessage)" -->
            <!-- <div
                v-show="isShowErrorClass(passwordErrorMessage)"
                class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
              >
                {{ passwordErrorMessage }}
              </div> -->
          </div>
        </div>
        <BaseButton class-type="primary" class="title w-full" type="submit">
          下一步
        </BaseButton>
      </form>
      <SignupStep2Form v-if="currentStep === 2" />

      <div class="body2 flex text-neutral-0">
        已經有會員了嗎？
        <nuxt-link :to="{ name: AppRouteEnum.LOGIN }" class="ml-2 text-primary underline">
          立即登入
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
