<script setup lang="ts">

</script>

<template>
  <form class="mb-4" @submit.prevent="currentStep++">
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
</template>
