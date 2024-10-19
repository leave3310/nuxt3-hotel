<script setup lang="ts">
import { updateUserInfo } from "@/api/instances/user.ts";
import { useUserStore } from "@/stores/user.ts";

const userStore = useUserStore();
const isResetPassword = ref(false);

interface UpdatePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
const { handleSubmit, meta } = useForm<UpdatePasswordForm>({
  validationSchema: {
    oldPassword: { required: true },
    newPassword: { required: true },
    confirmNewPassword: { required: true },
  },
  initialValues: {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  },
});
const { value: oldPassword, errorMessage: oldPasswordErrorMessage } = useField("oldPassword");
const { value: newPassword, errorMessage: newPasswordErrorMessage } = useField("newPassword");
const { value: confirmNewPassword, errorMessage: confirmNewPasswordErrorMessage } = useField("confirmNewPassword");

const onSubmit = handleSubmit(async (values) => {
  const payload = {
    userId: userStore.userInfo!._id,
    oldPassword: values.oldPassword,
    newPassword: values.newPassword,
  };
  await updateUserInfo(payload);
  isResetPassword.value = false;
});

const isShowErrorMessage = (errorMessage: string | undefined) => typeof errorMessage !== "undefined";
</script>

<template>
  <section class="mb-6 rounded-[1.25rem] bg-neutral-0 p-6 xl:mr-10 xl:max-h-min xl:w-full xl:max-w-[32.9375rem] xl:p-10">
    <h2 class="h6 xl:h5 mb-6 xl:mb-10">
      {{ isResetPassword ? "修改帳號資料" : "修改密碼" }}
    </h2>
    <div class="mb-4">
      <div class="body2 xl:body mb-2 text-neutral-80">
        電子信箱
      </div>
      <div class="xl:title subtitle text-neutral-100">
        Jessica@exsample.com
      </div>
    </div>
    <div v-if="!isResetPassword" class="flex items-center justify-between">
      <div>
        <div class="body2 xl:body mb-2 text-neutral-80">
          密碼
        </div>
        <div class="text-neutral-100">
          ● ● ● ● ● ● ● ● ● ●
        </div>
      </div>
      <button type="button" class="text-[0.875rem] font-bold leading-normal text-primary underline xl:text-base" @click="isResetPassword = true">
        重設
      </button>
    </div>
    <form v-else @submit.prevent="onSubmit">
      <div class="mb-4 xl:mb-6">
        <label for="oldPassword" class="subtitle xl:title mb-2 flex text-neutral-100">
          舊密碼
        </label>
        <input id="oldPassword" v-model="oldPassword" type="password" class="body2 xl:body w-full rounded-lg border border-neutral-40 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0" placeholder="請輸入舊密碼">
        <div
          v-show="isShowErrorMessage(oldPasswordErrorMessage)"
          class="subtitle mt-[0.44rem] text-error"
        >
          {{ oldPasswordErrorMessage }}
        </div>
      </div>
      <div class="mb-4 xl:mb-6">
        <label for="newPassword" class="subtitle xl:title mb-2 flex text-neutral-100">
          新密碼
        </label>
        <input id="newPassword" v-model="newPassword" type="password" class="body2 xl:body w-full rounded-lg border border-neutral-40 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0" placeholder="請輸入新密碼">
        <div
          v-show="isShowErrorMessage(newPasswordErrorMessage)"
          class="subtitle mt-[0.44rem] text-error"
        >
          {{ newPasswordErrorMessage }}
        </div>
      </div>
      <div class="mb-6 xl:mb-10">
        <label for="confirmNewPassword" class="subtitle xl:title mb-2 flex text-neutral-100">
          確認新密碼
        </label>
        <input id="confirmNewPassword" v-model="confirmNewPassword" type="password" class="body2 xl:body w-full rounded-lg border border-neutral-40 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0" placeholder="請再輸入一次新密碼">
        <div
          v-show="isShowErrorMessage(confirmNewPasswordErrorMessage)"
          class="subtitle mt-[0.44rem] text-error"
        >
          {{ confirmNewPasswordErrorMessage }}
        </div>
      </div>
      <BaseButton
        type="submit"
        class-type="primary"
        class="title w-full text-nowrap xl:max-w-[8.0625rem]"
        :disable="!meta.valid || !meta.dirty"
      >
        儲存設定
      </BaseButton>
    </form>
  </section>
</template>
