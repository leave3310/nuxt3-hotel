<script setup lang="ts">
import dayjs from "dayjs";

import { getUser, updateUserInfo } from "@/api/instances/user.ts";
import { useUserStore } from "@/stores/user.ts";
import ZipCodeMap from "@/utilities/zipcodes.ts";

const userStore = useUserStore();
function getCounty() {
  const result = ZipCodeMap.find(item => item.zipcode === userStore.userInfo?.address.zipcode);
  return result?.county;
}
interface Test {
  name: string;
  phone: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  county: string;
  zipcode: number;
  detailAddress: string;
}

const { handleSubmit, meta, resetForm, values } = useForm<Test>({
  validationSchema: {
    name: { required: true },
    phone: { required: true },
    birthYear: { required: true },
    birthMonth: { required: true },
    birthDay: { required: true },
    detailAddress: { required: true },
    county: { required: true },
    zipcode: { required: true },
  },
  initialValues: {
    name: userStore.userInfo?.name,
    phone: userStore.userInfo?.phone,
    birthYear: userStore.birthYear,
    birthMonth: userStore.birthMonth,
    birthDay: userStore.birthday,
    county: getCounty(),
    zipcode: userStore.userInfo?.address.zipcode,
    detailAddress: userStore.userInfo?.address.detail,
  },
});
const { value: name, errorMessage: nameErrorMessage } = useField("name");
const { value: phone, errorMessage: phoneErrorMessage } = useField("phone");
const { value: birthYear, errorMessage: birthYearErrorMessage } = useField("birthYear");
const { value: birthMonth, errorMessage: birthMonthErrorMessage } = useField("birthMonth");
const { value: birthDay, errorMessage: birthDayErrorMessage } = useField("birthDay");
const { value: county, errorMessage: countyErrorMessage } = useField("county");
const { value: detailAddress, errorMessage: detailAddressErrorMessage } = useField("detailAddress");
const { value: zipcode, errorMessage: zipcodeErrorMessage } = useField("zipcode");

const isEdit = ref(false);
function reset() {
  resetForm({
    values: {
      name: userStore.userInfo?.name,
      phone: userStore.userInfo?.phone,
      birthYear: userStore.birthYear,
      birthMonth: userStore.birthMonth,
      birthDay: userStore.birthday,
      county: getCounty(),
      zipcode: userStore.userInfo?.address.zipcode,
      detailAddress: userStore.userInfo?.address.detail,
    },
  });
}

const onSubmit = handleSubmit(async (values) => {
  const payload = {
    userId: userStore.userInfo!._id,
    name: values.name,
    phone: values.phone,
    birthday: `${values.birthYear}/${values.birthMonth}/${values.birthDay}`,
    address: {
      zipcode: values.zipcode,
      detail: values.detailAddress,
    },
  };

  await updateUserInfo(payload);
  await getUser();
  isEdit.value = false;
  reset();
});

const currentYear = computed(() => new Date().getFullYear());

const countyOptions = [...new Set(ZipCodeMap.map(item => item.county))];
const cityOptions = computed(() => {
  return ZipCodeMap.filter(item => item.county === county.value).map(item => ({
    label: item.city,
    value: item.zipcode,
  }));
});
watch(() => county.value, (newValue, oldValue) => {
  if (oldValue) {
    resetForm({
      values: {
        ...values,
        zipcode: undefined,
        detailAddress: "",
      },
    });
  }
});

function isShowErrorClass(errorMessage: string | undefined) {
  return typeof errorMessage === "undefined" ? "border-e-neutral-40" : "border-error";
}
const isShowErrorMessage = (errorMessage: string | undefined) => typeof errorMessage !== "undefined";

function formatDayToChineseFormat(date: string | Date) {
  return dayjs(date).format("YYYY 年 M 月 D 日");
}

function zipCodeToText(zipcode: number) {
  const result = ZipCodeMap.find(item => item.zipcode === zipcode);
  return `${result?.county}${result?.city}`;
}
</script>

<template>
  <section class="h-max rounded-[1.25rem] bg-neutral-0 p-6 xl:w-full xl:max-w-[45.625rem]">
    <h2 class="h6 xl:h5 mb-6 xl:mb-10">
      基本資料
    </h2>
    <div v-if="!isEdit">
      <div class="mb-4">
        <div class="body2 xl:body mb-2 text-neutral-80">
          姓名
        </div>
        <div class="xl:title subtitle text-neutral-100">
          {{ userStore.userInfo?.name }}
        </div>
      </div>
      <div class="mb-4">
        <div class="body2 xl:body mb-2 text-neutral-80">
          手機號碼
        </div>
        <div class="xl:title subtitle text-neutral-100">
          {{ userStore.userInfo?.phone }}
        </div>
      </div>
      <div class="mb-4">
        <div class="body2 xl:body mb-2 text-neutral-80">
          生日
        </div>
        <div class="xl:title subtitle text-neutral-100">
          {{ formatDayToChineseFormat(userStore.userInfo!.birthday) }}
        </div>
      </div>
      <div class="mb-6">
        <div class="body2 xl:body mb-2 text-neutral-80">
          地址
        </div>
        <div class="xl:title subtitle text-neutral-100">
          {{ zipCodeToText(userStore.userInfo!.address.zipcode) + userStore.userInfo?.address.detail }}
        </div>
      </div>
      <BaseButton
        type="button"
        class-type="secondary"
        class="title px-8 py-4 text-primary"
        @click="isEdit = true"
      >
        編輯
      </BaseButton>
    </div>
    <form v-else @submit.prevent="onSubmit">
      <div class="mb-6">
        <label for="name" class="subtitle xl:title mb-2 flex text-neutral-100">姓名</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="body2 xl:body w-full rounded-lg border border-neutral-40 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0"
          :class="isShowErrorClass(nameErrorMessage)"
          placeholder="請輸入姓名"
        >
        <div
          v-show="isShowErrorMessage(nameErrorMessage)"
          class="subtitle mt-[0.44rem] text-error"
        >
          {{ nameErrorMessage }}
        </div>
      </div>
      <div class="mb-6">
        <label for="phone" class="subtitle xl:title mb-2 flex text-neutral-100">手機號碼</label>
        <input
          id="phone" v-model="phone"
          type="tel"
          class="body2 xl:body w-full rounded-lg border border-neutral-40 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0" placeholder="請輸入手機號碼"
          :class="isShowErrorClass(phoneErrorMessage)"
        >
        <div
          v-show="isShowErrorMessage(phoneErrorMessage)"
          class="subtitle mt-[0.44rem] text-error"
        >
          {{ phoneErrorMessage }}
        </div>
      </div>
      <div class="mb-6">
        <label for="birthday" class="subtitle xl:title mb-2 flex text-neutral-100">生日</label>
        <div class="flex gap-x-2">
          <div class="w-[36%]">
            <select v-model="birthYear" class="body w-full rounded-lg border-neutral-40 p-4 text-neutral-80 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0">
              <option v-for="item in (currentYear - 1911 + 1)" :key="item" :value="currentYear - item + 1">
                {{ currentYear - item + 1 }}
              </option>
            </select>
            <div
              v-show="isShowErrorMessage(birthYearErrorMessage)"
              class="subtitle mt-[0.44rem] text-error"
            >
              {{ birthYearErrorMessage }}
            </div>
          </div>
          <div class="w-[30%]">
            <select v-model="birthMonth" class="body w-full rounded-lg border-neutral-40 p-4 text-neutral-80 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0">
              <option v-for="item in 12" :key="item" :value="item">
                {{ item }} 月
              </option>
            </select>
            <div
              v-show="isShowErrorMessage(birthMonthErrorMessage)"
              class="subtitle mt-[0.44rem] text-error"
            >
              {{ birthMonthErrorMessage }}
            </div>
          </div>
          <div class="w-[30%]">
            <select v-model="birthDay" class="body w-full rounded-lg border-neutral-40 p-4 text-neutral-80 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0">
              <option v-for="item in 31" :key="item" :value="item">
                {{ item }} 日
              </option>
            </select>
            <div
              v-show="isShowErrorMessage(birthDayErrorMessage)"
              class="subtitle mt-[0.44rem] text-error"
            >
              {{ birthDayErrorMessage }}
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6 xl:mb-10">
        <label
          class="subtitle xl:title mb-2 flex text-neutral-100"
        >地址</label>
        <div class="mb-4 flex gap-2">
          <div class="grow">
            <select id="county" v-model="county" class="body2 xl:body w-full rounded-lg border-neutral-40 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0">
              <option disabled value="">
                請選擇縣市
              </option>
              <option v-for="option in countyOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <div
              v-show="isShowErrorMessage(countyErrorMessage)"
              class="subtitle mt-[0.44rem] text-error"
            >
              {{ countyErrorMessage }}
            </div>
          </div>
          <div class="grow">
            <select id="city" v-model="zipcode" class="body2 xl:body w-full rounded-lg border-neutral-40 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0">
              <option disabled value="">
                請選擇地址
              </option>
              <option v-for="option in cityOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <div
              v-show="isShowErrorMessage(zipcodeErrorMessage)"
              class="subtitle mt-[0.44rem] text-error"
            >
              {{ zipcodeErrorMessage }}
            </div>
          </div>
        </div>
        <div>
          <input
            v-model="detailAddress"
            type="text"
            placeholder="請輸入詳細地址"
            class="body2 xl:body w-full rounded-lg border border-neutral-40 bg-neutral-0 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0"
          >
          <div
            v-show="isShowErrorMessage(detailAddressErrorMessage)"
            class="subtitle mt-[0.44rem] text-error"
          >
            {{ detailAddressErrorMessage }}
          </div>
        </div>
      </div>
      <BaseButton
        type="submit"
        class-type="primary"
        class="title w-full text-nowrap px-8 py-4 xl:max-w-[8.0625rem]"
        :disable="!meta.valid || !meta.dirty"
      >
        儲存設定
      </BaseButton>
    </form>
  </section>
</template>
