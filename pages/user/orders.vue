<script setup lang="ts">
import { useModal } from "vue-final-modal";

import CancelReservation from "@/components/modals/user/CancelReservation.vue";
import IcCheck from "@/assets/icons/ic-check.svg";
import IcArrowDown from "@/assets/icons/ic-arrow-down.svg";

const { open, close } = useModal({
  component: CancelReservation,
  attrs: {
    onConfirm() {
      close();
    },
    onCancel() {
      close();
    },
  },
});
</script>

<template>
  <div class="xl:flex">
    <div class="mb-6 rounded-[1.25rem] bg-neutral-0 p-4 xl:mb-0 xl:mr-10 xl:max-w-[56%] xl:p-10">
      <div class="mb-6 xl:mb-10">
        <div class="body2 xl:body mb-2 text-neutral-80">
          預訂參考編號： HH2302183151222
        </div>
        <div class="title xl:h5 text-neutral-100">
          即將來的行程
        </div>
      </div>
      <div class="mb-6 overflow-hidden rounded-lg">
        <img src="@/assets/images/user/desktop_user_bg.png" alt="" class="aspect-[319/150] size-full object-cover object-center xl:aspect-[650/240]">
      </div>
      <div class="subtitle xl:h6 mb-6 flex items-center text-neutral-80">
        <span class="flex items-center after:mx-4 after:text-neutral-60 after:content-['|']">
          {{ 12 }}，{{ 1 }} 晚
        </span>
        <span>
          住宿人數：{{ 12 }} 位
        </span>
      </div>
      <div class="subtitle xl:title mb-2 flex text-neutral-80 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
        入住：{{ '2024-01-01' }}，15:00 可入住
      </div>
      <div class="subtitle xl:title mb-6 flex text-neutral-80 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-neutral-60 before:content-['']">
        退房：{{ '2024-01-02' }}，12:00 前退房
      </div>
      <div class="subtitle xl:title text-neutral-80">
        NT$ {{ 12345 }}
      </div>
      <hr class="my-6 border-neutral-40 xl:my-10">

      <div class="subtitle xl:title mb-6 flex text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
        房內設備
      </div>
      <ol class="mb-6 grid grid-cols-2 gap-x-10 gap-y-2 rounded-lg border border-neutral-40 p-6 xl:mb-10 xl:grid-cols-3">
        <li>
          123
        </li>
        <!-- <li v-for="item in data.result.roomId.facilityInfo" :key="item.title" class="subtitle flex items-center text-neutral-100">
          <IcCheck class="mr-2 size-6 fill-primary" />
          {{ item.title }}
        </li> -->
      </ol>

      <div class="subtitle xl:title mb-6 flex text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
        備品提供
      </div>
      <ol class="mb-6 grid grid-cols-2 gap-x-10 gap-y-2 rounded-lg border border-neutral-40 p-6 xl:mb-10 xl:grid-cols-3">
        <li>
          123
        </li>
        <!-- <li v-for="item in data.result.roomId.amenityInfo" :key="item.title" class="subtitle flex items-center text-neutral-100">
          <IcCheck class="mr-2 size-6 fill-primary" />
          {{ item.title }}
        </li> -->
      </ol>
      <div class="flex gap-4">
        <BaseButton class-type="secondary" class="title grow" type="button" @click="open">
          取消預訂
        </BaseButton>
        <BaseButton class-type="primary" class="title grow" type="button">
          查看詳細
        </BaseButton>
      </div>
    </div>
    <div class="w-full rounded-[1.25rem] bg-neutral-0 p-4 xl:max-w-[41%] xl:p-10">
      <h2 class="title xl:h5 mb-6 text-neutral-100 xl:mb-10">
        歷史訂單
      </h2>
      <div>
        <div class="xl:flex">
          <div class="mb-6 max-h-20 max-w-[7.5rem] overflow-hidden rounded-lg xl:mb-0 xl:mr-6">
            <img src="@/assets/images/user/user_bg.jpg" alt="" class="aspect-[120/80] size-full object-cover object-center">
          </div>
          <div>
            <div class="body2 xl:body mb-4 text-neutral-80">
              預訂參考編號： HH2302183151222
            </div>
            <div class="subtitle xl:h6 mb-4 text-neutral-80">
              尊爵雙人房
            </div>
            <div class="mb-4">
              <div class="body2 xl:body mb-2 text-neutral-80">
                住宿天數： 1 晚
              </div>
              <div class="body2 xl:body mb-2 text-neutral-80">
                住宿人數： 2 位
              </div>
            </div>
            <div class="mb-4">
              <div class="body2 xl:body mb-2 flex text-neutral-80 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
                入住：{{ '2024-01-01' }}
              </div>
              <div class="body2 xl:body flex text-neutral-80 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-neutral-60 before:content-['']">
                退房：{{ '2024-01-02' }}
              </div>
            </div>
            <div class="subtitle xl:title text-neutral-80">
              NT$ {{ 12345 }}
            </div>
          </div>
        </div>
        <hr class="my-6 border-neutral-40 xl:my-10">
      </div>
      <BaseButton class-type="secondary" class="title flex w-full grow items-center">
        查看更多
        <IcArrowDown class="ml-1 size-6 fill-primary" />
      </BaseButton>
    </div>
  </div>
</template>
