<script setup lang="ts">
import ZipCodeMap from "@/utilities/zipcodes.ts";

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
const { value: county, errorMessage: countyErrorMessage } = useField("county");
const { value: city, errorMessage: cityErrorMessage } = useField("city");

const currentYear = computed(() => new Date().getFullYear());

const countyOptions = [...new Set(ZipCodeMap.map(item => item.county))];
const cityOptions = computed(() => {
  return ZipCodeMap.filter(item => item.county === county.value).map(item => ({
    label: item.city,
    value: item.zipcode,
  }));
});
</script>

<template>
  <form>
    <div class="mb-4">
      <label
        for="name"
        class="subtitle xl:title mb-2 flex text-neutral-0"
      >姓名</label>
      <!-- v-model="email" -->
      <input
        id="name"
        data-testid="email-input"
        type="text"
        placeholder="請輸入姓名"
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
        for="phone"
        class="subtitle xl:title mb-2 flex text-neutral-0"
      >手機號碼</label>
      <!-- v-model="email" -->
      <input
        id="phone"
        data-testid="email-input"
        type="tel"
        placeholder="請輸入手機號碼"
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
      <label for="birthday" class="subtitle xl:title mb-2 flex text-neutral-0">生日</label>
      <div class="flex gap-x-2">
        <select class="body w-[36%] rounded-lg border-neutral-40 p-4 text-neutral-80 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0">
          <option v-for="item in (currentYear - 1911 + 1)" :key="item" :value="currentYear - item + 1">
            {{ currentYear - item + 1 }}
          </option>
        </select>
        <select class="body w-[30%] rounded-lg border-neutral-40 p-4 text-neutral-80 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0">
          <option v-for="item in 12" :key="item" :value="item">
            {{ item }} 月
          </option>
        </select>
        <select class="body w-[30%] rounded-lg border-neutral-40 p-4 text-neutral-80 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0">
          <option v-for="item in 31" :key="item" :value="item">
            {{ item }} 日
          </option>
        </select>
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
        </div>
      </div>
      <input
        type="text"
        placeholder="請輸入詳細地址"
        class="body2 xl:body w-full rounded-lg border border-neutral-40 bg-neutral-0 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0"
      >
    </div>
    <div class="mb-10 flex items-center">
      <input id="confirm-personal-info" type="checkbox" class="focus:not(:focus-visible):shadow-none mr-2 size-6 rounded checked:bg-primary checked:hover:bg-primary focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0">
      <label for="confirm-personal-info" class="subtitle xl:title text-neutral-0">我已閱讀並同意本網站個資使用規範</label>
    </div>
    <BaseButton class-type="primary" class="mb-4 w-full">
      完成註冊
    </BaseButton>
  </form>
</template>
