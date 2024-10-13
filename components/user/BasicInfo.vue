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

const isEdit = ref(true);

const currentYear = computed(() => new Date().getFullYear());

const countyOptions = [...new Set(ZipCodeMap.map(item => item.county))];
const cityOptions = computed(() => {
  return ZipCodeMap.filter(item => item.county === county.value).map(item => ({
    label: item.city,
    value: item.zipcode,
  }));
});

function isShowErrorClass(errorMessage: string | undefined) {
  return typeof errorMessage === "undefined" ? "border-e-neutral-40" : "border-error";
}
</script>

<template>
  <section class="rounded-[1.25rem] bg-neutral-0 p-6 xl:w-full xl:max-w-[45.625rem]">
    <h2 class="h6 xl:h5 mb-6 xl:mb-10">
      基本資料
    </h2>
    <div v-if="!isEdit">
      <div class="mb-4">
        <div class="body2 xl:body mb-2 text-neutral-80">
          姓名
        </div>
        <div class="xl:title subtitle text-neutral-100">
          Jessica Ｗang
        </div>
      </div>
      <div class="mb-4">
        <div class="body2 xl:body mb-2 text-neutral-80">
          手機號碼
        </div>
        <div class="xl:title subtitle text-neutral-100">
          +886 912 345 678
        </div>
      </div>
      <div class="mb-4">
        <div class="body2 xl:body mb-2 text-neutral-80">
          生日
        </div>
        <div class="xl:title subtitle text-neutral-100">
          1990 年 8 月 15 日
        </div>
      </div>
      <div class="mb-6">
        <div class="body2 xl:body mb-2 text-neutral-80">
          地址
        </div>
        <div class="xl:title subtitle text-neutral-100">
          高雄市新興區六角路 123 號
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
    <div v-else>
      <div class="mb-6">
        <label for="name" class="subtitle xl:title mb-2 flex text-neutral-100">姓名</label>
        <input id="name" type="text" class="body2 xl:body w-full rounded-lg border border-neutral-40 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0" placeholder="請輸入姓名">
      </div>
      <div class="mb-6">
        <label for="phone" class="subtitle xl:title mb-2 flex text-neutral-100">手機號碼</label>
        <input id="phone" type="tel" class="body2 xl:body w-full rounded-lg border border-neutral-40 p-4 focus:border-primary focus:shadow-[0px_0px_0px_4px_rgba(190,156,124,0.10)] focus:ring-0" placeholder="請輸入手機號碼">
      </div>
      <div class="mb-6">
        <label for="birthday" class="subtitle xl:title mb-2 flex text-neutral-100">生日</label>
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
      <BaseButton
        type="submit"
        class-type="primary"
        class="title w-full text-nowrap px-8 py-4 xl:max-w-[8.0625rem]"
      >
        儲存設定
      </BaseButton>
    </div>
  </section>
</template>
