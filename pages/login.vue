<script setup lang="ts">
import { postLogin } from "@/api/instances/user.ts";
import type { LoginForm } from "@/typing/pages/login.ts";

definePageMeta({
  layout: "only-header",
});

const { handleSubmit } = useForm<LoginForm>({
  validationSchema: {
    email: { email: true, required: true },
    password: { required: true },
  },
  initialValues: {
    email: "s@gmail.com",
    password: "12345678",
    rememberAccount: false,
  },
});

const { value: email, errorMessage: emailErrorMessage } = useField("email");
const { value: password, errorMessage: passwordErrorMessage } = useField("password");
const { value: rememberAccount } = useField("rememberAccount");

const isShowErrorMessage = (errorMessage: string | undefined) => typeof errorMessage !== "undefined";

function isShowErrorClass(errorMessage: string | undefined) {
  return typeof errorMessage === "undefined" ? "border-e-neutral-40" : "border-error";
}

const onSubmit = handleSubmit(async (values) => {
  const payload = {
    email: values.email,
    password: values.password,
  };

  await postLogin(payload);
});
</script>

<template>
  <div class="flex flex-1">
    <div class="hidden w-1/2 xl:flex">
      <img
        src="@/assets/images/login_bg.jpg"
        class="size-full object-cover object-center"
        alt=""
      >
    </div>
    <div class="w-full pt-[10.25rem] xl:w-1/2 xl:pt-[9.94rem]">
      <!-- <BaseButton type="button">
        123
      </BaseButton> -->
      <div class="mx-auto px-5 xl:max-w-[26rem]">
        <div
          class="mb-2 text-sm font-bold leading-normal tracking-[0.0175rem] text-primary xl:text-base xl:tracking-[0.02rem]"
        >
          享樂酒店，誠摯歡迎
        </div>
        <div
          class="mb-10 text-[2rem] font-bold leading-[1.2] tracking-[0.1rem] text-neutral-0 xl:text-5xl xl:tracking-[0.15rem]"
        >
          立即開始旅程
        </div>
        <form @submit.prevent="onSubmit()">
          <div class="mb-4">
            <label
              for="email"
              class="mb-2 flex text-sm font-bold leading-normal tracking-[0.0175rem] text-neutral-0 xl:text-base xl:tracking-[0.02rem]"
            >電子信箱</label>
            <input
              v-model="email"
              type="email"
              placeholder="hello@exsample.com"
              class="w-full rounded-lg border bg-neutral-0 p-4 text-sm font-medium leading-normal tracking-[0.0175rem] focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0 xl:text-base xl:tracking-[0.02rem]"
              :class="isShowErrorClass(emailErrorMessage)"
            >
            <div
              v-show="isShowErrorMessage(emailErrorMessage)"
              class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
            >
              {{ emailErrorMessage }}
            </div>
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="mb-2 flex text-sm font-bold leading-normal tracking-[0.0175rem] text-neutral-0 xl:text-base xl:tracking-[0.02rem]"
            >密碼</label>
            <input
              v-model="password"
              type="password"
              placeholder="請輸入密碼"
              class="w-full rounded-lg border bg-neutral-0 p-4 text-sm font-medium leading-normal tracking-[0.0175rem] focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0 xl:text-base xl:tracking-[0.02rem]"
              :class="isShowErrorClass(passwordErrorMessage)"
            >
            <div
              v-show="isShowErrorClass(passwordErrorMessage)"
              class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
            >
              {{ passwordErrorMessage }}
            </div>
          </div>
          <div class="mb-10 flex justify-between">
            <div class="flex items-center">
              <input
                id="rememberAccount"
                v-model="rememberAccount"
                type="checkbox"
                class="mr-2 hidden size-6 rounded border-neutral-60 bg-neutral-0"
              >

              <div v-show="rememberAccount">
                <img src="@/assets/images/CheckboxChecked.png" alt="">
              </div>
              <div v-show="!rememberAccount">
                <img src="@/assets/images/Checkbox.png" alt="">
              </div>
              <label
                for="rememberAccount"
                class="ml-2 cursor-pointer text-base font-bold leading-normal tracking-[0.0175rem] text-neutral-0 xl:text-base xl:tracking-[0.02rem]"
              >
                記住帳號
              </label>
            </div>
            <router-link
              to="#"
              class="text-sm font-bold leading-normal tracking-[0.0175rem] text-primary underline xl:text-base xl:tracking-[0.02rem]"
            >
              忘記密碼?
            </router-link>
          </div>
          <button
            class="mb-10 w-full rounded-lg bg-neutral-40 px-8 py-4 text-base font-bold tracking-[0.02rem] text-neutral-60"
          >
            會員登入
          </button>
          <div>
            <span
              class="mr-2 text-sm font-medium leading-normal tracking-[0.0175rem] text-neutral-0 xl:text-base xl:tracking-[0.02rem]"
            >沒有會員嗎？</span>
            <router-link
              to="#"
              class="text-sm font-bold leading-normal tracking-[0.0175rem] text-primary underline xl:text-base xl:tracking-[0.02rem]"
            >
              前往註冊
            </router-link>
          </div>
        </form>
        <button />
      </div>
    </div>
  </div>
</template>
