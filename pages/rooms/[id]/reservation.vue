<script setup lang="ts">
import { useModal } from "vue-final-modal";

import { getRoom } from "@/api/instances/rooms";
import { AppRouteEnum } from "@/typing/enum/router";
import ZipCodeMap from "@/utilities/zipcodes.ts";

import IcSize from "@/assets/icons/ic-size.svg";
import IcBed from "@/assets/icons/ic-bed.svg";
import IcPerson from "@/assets/icons/ic-person.svg";
import IcArrowLeft from "@/assets/icons/ic-arrow-left.svg";
import IcCheck from "@/assets/icons/ic-check.svg";
import ProcessOrder from "@/components/modals/reservation/ProcessOrder.vue";

definePageMeta({
  layout: "black-header",
});

const { open, close } = useModal({
  component: ProcessOrder,
});
const route = useRoute();
const { id } = route.params;
const { data } = await getRoom(id as string);

const roomLayout = [
  "市景",
  "獨立衛浴",
  "客廳",
  "書房",
  "樓層電梯",
];
// "roomId": "65251f6095429cd58654bf12",
//   "checkInDate": "2023/06/18",
//   "checkOutDate": "2023/06/19",
//   "peopleNum": 2,
//   "userInfo": {
//     "address": {
//       "zipcode": 802,
//       "detail": "文山路23號"
//     },
//     "name": "Joanne Chen",
//     "phone": "0912345678",
//     "email": "example@gmail.com"

const { handleSubmit, meta, resetForm, values } = useForm({
  validationSchema: {
    name: { required: true },
    phone: { required: true },
    email: { email: true, required: true },
    county: { required: true },
    city: { required: true },
    detailAddress: { required: true },
    zipcode: { required: true },
  },
  initialValues: {
    name: "",
    phone: "",
    email: "",
    county: "",
    city: "",
    detailAddress: "",
    zipcode: "",
  },
});

const { value: name, errorMessage: nameErrorMessage } = useField("name");
const { value: phone, errorMessage: phoneErrorMessage } = useField("phone");
const { value: email, errorMessage: emailErrorMessage } = useField("email");
const { value: county, errorMessage: countyErrorMessage } = useField("county");
const { value: city, errorMessage: cityErrorMessage } = useField("city");
const { value: detailAddress, errorMessage: detailAddressErrorMessage } = useField("detailAddress");
const { value: zipcode, errorMessage: zipcodeErrorMessage } = useField("zipcode");

const countyOptions = [...new Set(ZipCodeMap.map(item => item.county))];
const cityOptions = computed(() => {
  return ZipCodeMap.filter(item => item.county === county.value).map(item => ({
    label: item.city,
    value: item.zipcode,
  }));
});
watch(() => county.value, () => {
  resetForm({ values: {
    ...values,
    city: "",
  } });
});

const isShowErrorMessage = (errorMessage: string | undefined) => typeof errorMessage !== "undefined";
function isShowErrorClass(errorMessage: string | undefined) {
  return typeof errorMessage === "undefined" ? "border-e-neutral-40" : "border-error";
}
</script>

<template>
  <div class="flex flex-col justify-center bg-primary-10 px-3 py-10 xl:flex-row">
    <div class="mb-10 xl:mr-[4.5rem] xl:max-w-[46.625rem]">
      <div class="mb-10 flex items-center">
        <nuxt-link :to="{ name: AppRouteEnum.ROOMS_ID, params: { id } }" class="mr-2">
          <IcArrowLeft class="size-6 fill-neutral-100" />
        </nuxt-link>
        <div class="h5 text-neutral-100">
          確認訂房資訊
        </div>
      </div>
      <section>
        <h2 class="h6 mb-8 text-neutral-100">
          訂房資訊
        </h2>
        <div class="mb-6 flex items-center justify-between">
          <div class="mr-4">
            <h3 class="title mb-2 flex items-center before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
              選擇房型
            </h3>
            <div class="body text-neutral-100">
              {{ data.result.name }}
            </div>
          </div>
          <nuxt-link :to="{ name: AppRouteEnum.ROOMS_ID, params: { id } }" class="text-base font-bold leading-normal text-neutral-100 underline">
            編輯
          </nuxt-link>
        </div>
        <div class="mb-6 flex items-center justify-between">
          <div class="mr-4">
            <h3 class="title mb-2 flex items-center before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
              訂房日期
            </h3>
            <div class="body mb-2 text-neutral-100">
              入住：6 月 11 日星期三
            </div>
            <div class="body mb-2 text-neutral-100">
              退房：6 月 11 日星期三
            </div>
          </div>
          <nuxt-link :to="{ name: AppRouteEnum.ROOMS_ID, params: { id } }" class="text-base font-bold leading-normal text-neutral-100 underline">
            編輯
          </nuxt-link>
        </div>
        <div class="mb-6 flex items-center justify-between">
          <div class="mr-4">
            <h3 class="title mb-2 flex items-center before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
              房客人數
            </h3>
            <div class="body text-neutral-100">
              2人
            </div>
          </div>
          <nuxt-link :to="{ name: AppRouteEnum.ROOMS_ID, params: { id } }" class="text-base font-bold leading-normal text-neutral-100 underline">
            編輯
          </nuxt-link>
        </div>
      </section>
      <hr class="my-10 border-neutral-60">
      <section>
        <h2 class="h6 mb-8 text-neutral-100">
          訂房人資訊
        </h2>
        <form @submit.prevent>
          <div class="mb-6">
            <label
              for="name"
              class="subtitle xl:title mb-2 flex text-neutral-100"
            >姓名</label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="請輸入姓名"
              class="body2 xl:body w-full rounded-lg border border-neutral-40 bg-neutral-0 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0"
              :class="isShowErrorClass(nameErrorMessage)"
            >
            <div
              v-show="isShowErrorMessage(nameErrorMessage)"
              class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
            >
              {{ nameErrorMessage }}
            </div>
          </div>
          <div class="mb-6">
            <label
              for="phone"
              class="subtitle xl:title mb-2 flex text-neutral-100"
            >手機號碼</label>
            <input
              id="phone"
              v-model="phone"
              type="tel"
              placeholder="請輸入手機號碼"
              class="body2 xl:body w-full rounded-lg border border-neutral-40 bg-neutral-0 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0"
              :class="isShowErrorClass(phoneErrorMessage)"
            >
            <div
              v-show="isShowErrorMessage(phoneErrorMessage)"
              class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
            >
              {{ phoneErrorMessage }}
            </div>
          </div>
          <div class="mb-6">
            <label
              for="email"
              class="subtitle xl:title mb-2 flex text-neutral-100"
            >電子信箱</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="請輸入電子信箱"
              class="body2 xl:body w-full rounded-lg border border-neutral-40 bg-neutral-0 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0"
              :class="isShowErrorClass(emailErrorMessage)"
            >
            <div
              v-show="isShowErrorMessage(emailErrorMessage)"
              class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
            >
              {{ emailErrorMessage }}
            </div>
          </div>
          <div>
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
                  class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
                >
                  {{ countyErrorMessage }}
                </div>
              </div>
              <div class="grow">
                <select id="city" v-model="city" class="body2 xl:body w-full rounded-lg border-neutral-40 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0">
                  <option disabled value="">
                    請選擇地址
                  </option>
                  <option v-for="option in cityOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
                <div
                  v-show="isShowErrorMessage(cityErrorMessage)"
                  class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
                >
                  {{ cityErrorMessage }}
                </div>
              </div>
            </div>
            <input
              v-model="detailAddress"
              type="text"
              placeholder="請輸入詳細地址"
              class="body2 xl:body w-full rounded-lg border border-neutral-40 bg-neutral-0 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0"
              :class="isShowErrorClass(detailAddressErrorMessage)"
            >
            <div
              v-show="isShowErrorMessage(detailAddressErrorMessage)"
              class="mt-[0.44rem] text-sm font-bold leading-normal tracking-[0.0175rem] text-error"
            >
              {{ detailAddressErrorMessage }}
            </div>
          </div>
          <!-- <div class="mb-10 flex justify-between">
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
          <BaseButton
            data-testid="login-button"
            type="submit"
            class-type="primary"
            class="mb-10 w-full"
            :disable="!meta.valid"
          >
            會員登入
          </BaseButton> -->
        </form>
      </section>
      <hr class="my-10 border-neutral-60">
      <section>
        <h2 class="h6 xl:h4 mb-8 text-neutral-100">
          房間資訊
        </h2>
        <div class="mb-6">
          <h3 class="title xl:h5 mb-4 flex items-center before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-[''] xl:mb-6">
            房型基本資訊
          </h3>
          <ol class="flex">
            <li class="title mr-4 w-[6.0625rem] rounded-lg border border-primary-40 bg-white px-4 py-[1.38rem] text-neutral-80 xl:py-4">
              <IcSize class="mb-2 size-6 fill-primary" />
              {{ data.result.areaInfo }}
            </li>
            <li class="title mr-4 w-[6.0625rem] text-nowrap rounded-lg border border-primary-40 bg-white px-4 py-[1.38rem] text-neutral-80 xl:py-4">
              <IcBed class="mb-2 size-6 fill-primary" />
              {{ data.result.bedInfo }}
            </li>
            <li class="title w-[6.0625rem] rounded-lg border border-primary-40 bg-white px-4 py-[1.38rem] text-neutral-80 xl:py-4">
              <IcPerson class="mb-2 size-6 fill-primary" />
              {{ data.result.maxPeople }}人
            </li>
          </ol>
        </div>
        <div class="mb-6">
          <h3 class="title xl:h5 mb-4 flex items-center before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-[''] xl:mb-6">
            房間格局
          </h3>
          <ol class="grid grid-cols-3 gap-6 rounded-lg bg-white p-6 xl:flex xl:w-full xl:gap-10">
            <li v-for="item in roomLayout" :key="item" class="title flex text-nowrap text-neutral-80">
              <IcCheck class="mr-2 flex size-6 shrink-0 fill-primary" />
              {{ item }}
            </li>
          </ol>
        </div>
        <div class="mb-6">
          <h3 class="title xl:h5 mb-4 flex items-center before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-[''] xl:mb-6">
            房內設備
          </h3>
          <ol class="grid grid-cols-2 gap-x-10 gap-y-2 rounded-lg bg-white p-6 xl:flex xl:flex-wrap">
            <li v-for="item in data.result.facilityInfo" v-show="item.isProvide" :key="item.title" class="title flex text-neutral-80">
              <IcCheck class="mr-2 flex size-6 fill-primary " />
              {{ item.title }}
            </li>
          </ol>
        </div>
        <div>
          <h3 class="title xl:h5 mb-4 flex items-center before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-[''] xl:mb-6">
            備品提供
          </h3>
          <ol class="grid grid-cols-2 gap-x-10 gap-y-2 rounded-lg bg-white p-6 xl:flex xl:flex-wrap">
            <li v-for="item in data.result.amenityInfo" v-show="item.isProvide" :key="item.title" class="title flex text-neutral-80">
              <IcCheck class="mr-2 flex size-6 fill-primary " />
              {{ item.title }}
            </li>
          </ol>
        </div>
      </section>
    </div>
    <div class="flex flex-col rounded-[1.25rem] bg-white p-6 xl:sticky xl:top-32 xl:max-h-[42.375rem] xl:max-w-[29.875rem]">
      <div class="mb-6 xl:mb-10">
        <img :src="data.result.imageUrlList[0]" alt="" class="aspect-[303/180] size-full rounded-lg object-cover xl:aspect-[398/272] xl:size-full">
      </div>
      <div class="flex h-full flex-col">
        <div class="h6 xl:h4 mb-6 text-neutral-100">
          價格詳情
        </div>
        <div class="body mb-3 flex justify-between text-neutral-80">
          <div>
            <span>
              NT$ 10,000
            </span>
            <span class="ml-2 mr-1">
              X
            </span>
            <span>
              2 晚
            </span>
          </div>
          <span>NT$ 20,000</span>
        </div>
        <div class="body flex justify-between text-neutral-100">
          住宿折扣
          <span class="body text-primary">
            -NT$ 1,000
          </span>
        </div>
        <hr class="my-6 border-neutral-60">
        <div class="title mb-6 flex justify-between text-neutral-100 xl:mb-10">
          總價
          <span>
            NT$ 19,000
          </span>
        </div>
        <BaseButton class-type="primary" class="mt-auto w-full">
          確認訂房
        </BaseButton>
      </div>
    </div>
  </div>
</template>
