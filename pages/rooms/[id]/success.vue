<script setup lang="ts">
import dayjs from "dayjs";

import { getOrder } from "@/api/instances/orders.ts";
import { numberToCurrency } from "@/utilities/math.ts";
import { UserRouteEnum } from "@/typing/enum/router.ts";

import IcCheck from "@/assets/icons/ic-check.svg";

definePageMeta({
  layout: "black-header",
});

const route = useRoute();
const { id } = route.params;
const { data } = await getOrder(id as string);

const totalNight = computed(() => dayjs(data.value.result.checkOutDate).diff(dayjs(data.value.result.checkInDate), "day"));

dayjs.locale("zh-cn");
function formatDayToChineseFormat(date: string | Date) {
  return dayjs(date).format("M 月 D 日星期dd");
}
</script>

<template>
  <div class="flex grow flex-col bg-neutral-100">
    <div class="flex flex-col px-3 py-10 xl:flex-row xl:justify-center xl:pb-[7.75rem] xl:pt-[7.5rem]">
      <div class="mb-[3.75rem] xl:mr-[4.5rem] xl:max-w-[46.625rem]">
        <div class="mb-8 flex flex-col xl:mb-10 xl:flex-row xl:items-center">
          <div class="mb-4 size-10 rounded-full bg-success p-2 xl:mb-0 xl:mr-10">
            <IcCheck class="size-6 fill-neutral-0" />
          </div>
          <div class="h3 xl:h1 text-white">
            恭喜，{{ data.result.userInfo.name }}！
            <div class="mt-2">
              您已預訂成功
            </div>
          </div>
        </div>
        <div class="body text-neutral-40">
          我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。
        </div>
        <hr class="my-10 border-neutral-40 xl:my-20">
        <div class="title xl:h5 text-neutral-0">
          立即查看你的訂單紀錄
          <BaseButton :to="{ name: UserRouteEnum.ORDERS }" class-type="primary" class="mt-6 xl:mt-10 xl:max-w-[13.625rem]">
            前往我的訂單
          </BaseButton>
        </div>
        <hr class="my-10 border-neutral-40 xl:my-20">
        <div>
          <div class="h5 mb-8 text-neutral-0 xl:mb-10">
            訂房人資訊
          </div>
          <div>
            <div class="mb-6">
              <div class="body mb-2 text-neutral-40">
                姓名
              </div>
              <div class="title text-neutral-0">
                {{ data.result.userInfo.name }}
              </div>
            </div>
            <div class="mb-6">
              <div class="body mb-2 text-neutral-40">
                手機號碼
              </div>
              <div class="title text-neutral-0">
                {{ data.result.userInfo.phone }}
              </div>
            </div>
            <div class="mb-6">
              <div class="body mb-2 text-neutral-40">
                電子信箱
              </div>
              <div class="title text-neutral-0">
                {{ data.result.userInfo.email }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded-[1.25rem] bg-neutral-0 p-4 xl:max-w-[29.875rem] xl:p-10">
        <div class="body2 xl:body mb-2 text-neutral-80">
          預訂參考編號： {{ data.result.orderUserId }}
        </div>
        <div class="title xl:h5 mb-6 text-neutral-100 xl:mb-10">
          即將來的行程
        </div>
        <img :src="data.result.roomId.imageUrl" alt="" class="mb-6 aspect-[319/150] rounded-lg object-cover object-center xl:mb-10 xl:aspect-[398/240]">
        <div class="subtitle xl:h6 mb-6 flex items-center text-neutral-80">
          <span class="flex items-center after:mx-2 after:text-neutral-60 after:content-['|']">
            {{ data.result.roomId.name }}，{{ totalNight }} 晚
          </span>
          <span>
            住宿人數：{{ data.result.peopleNum }} 位
          </span>
        </div>
        <div class="subtitle xl:title mb-2 flex text-neutral-80 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
          入住：{{ formatDayToChineseFormat(data.result.checkInDate) }}，15:00 可入住
        </div>
        <div class="subtitle xl:title mb-6 flex text-neutral-80 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-neutral-60 before:content-['']">
          退房：{{ formatDayToChineseFormat(data.result.checkOutDate) }}，12:00 前退房
        </div>
        <div class="subtitle xl:title text-neutral-80">
          NT$ {{ numberToCurrency(data.result.roomId.price) }}
        </div>
        <hr class="my-6 border-neutral-40 xl:my-10">

        <div class="subtitle xl:title mb-6 flex text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
          房內設備
        </div>
        <ol class="mb-6 grid grid-cols-2 gap-x-10 gap-y-2 rounded-lg border border-neutral-40 p-6 xl:mb-10 xl:grid-cols-3">
          <li v-for="item in data.result.roomId.facilityInfo" :key="item.title" class="subtitle flex items-center text-neutral-100">
            <IcCheck class="mr-2 size-6 fill-primary" />
            {{ item.title }}
          </li>
        </ol>

        <div class="subtitle xl:title mb-6 flex text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
          備品提供
        </div>
        <ol class="grid grid-cols-2 gap-x-10 gap-y-2 rounded-lg border border-neutral-40 p-6 xl:grid-cols-3">
          <li v-for="item in data.result.roomId.amenityInfo" :key="item.title" class="subtitle flex items-center text-neutral-100">
            <IcCheck class="mr-2 size-6 fill-primary" />
            {{ item.title }}
          </li>
        </ol>
      </div>
    </div>

    <div class="decorate-line bottom-0 aspect-[375/84] w-full bg-cover bg-center bg-no-repeat xl:aspect-[1920/188]" />
  </div>
</template>
