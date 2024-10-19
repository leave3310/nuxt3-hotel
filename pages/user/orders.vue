<script setup lang="ts">
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useModal } from "vue-final-modal";

import { deleteOrder, getOrders } from "@/api/instances/orders.ts";
import { numberToCurrency } from "@/utilities/math.ts";
import { RoomRouteEnum } from "@/typing/enum/router.ts";
import type { Order } from "@/typing/api/orders.ts";

import CancelReservation from "@/components/modals/user/CancelReservation.vue";
import IcCheck from "@/assets/icons/ic-check.svg";
import IcArrowDown from "@/assets/icons/ic-arrow-down.svg";
import IcArrowLeft from "@/assets/icons/ic-arrow-left.svg";
import IcArrowRight from "@/assets/icons/ic-arrow-right.svg";
import IcClose from "@/assets/icons/ic-close.svg";

const { data, execute } = await getOrders();

const showMoreBtnObj = ref({
  isShowMoreBtn: false,
  initialDisplayCount: 3,
  showMoreList: false,
});
enum OrderStatus {
  CANCEL = -1,
  NOT_CANCEL = 0,
}
const historyOrderList = ref<Order[]>([]);
function calcHistoryOrderList() {
  const currentDay = dayjs();
  const historyResult = data.value.result
    .filter((item) => {
      if (item.status === OrderStatus.CANCEL) {
        return item;
      }
      const compareDay = dayjs(item.checkInDate);
      return compareDay.isBefore(currentDay);
    })
    .sort((a, b) => {
      return dayjs(b.checkInDate).valueOf() - dayjs(a.checkInDate).valueOf();
    });

  if (historyResult.length > 3) {
    showMoreBtnObj.value.isShowMoreBtn = true;
  }

  historyOrderList.value = historyResult;
}
calcHistoryOrderList();
const renderHistoryOrderList = computed(() => {
  if (showMoreBtnObj.value.showMoreList) {
    return historyOrderList.value;
  }
  else {
    return historyOrderList.value.slice(0, showMoreBtnObj.value.initialDisplayCount);
  }
});

const comingOrderList = ref<Order[]>([]);
const nextOrPreBtnObj = ref({
  currentIndex: 0,
  isShowGroup: false,
});
function calcComingOrderList() {
  const currentDay = dayjs();
  const comingResult = data.value.result.filter((item) => {
    return item.status === OrderStatus.NOT_CANCEL && dayjs(item.checkInDate).isAfter(currentDay);
  });

  comingOrderList.value = comingResult;
  updateNextOrPreBtnObj();
}
calcComingOrderList();
const renderComingOrder = computed(() => {
  return comingOrderList.value[nextOrPreBtnObj.value.currentIndex];
});
function updateNextOrPreBtnObj() {
  if (comingOrderList.value.length > 1) {
    nextOrPreBtnObj.value.isShowGroup = true;
  }
  nextOrPreBtnObj.value.currentIndex = 0;
}
function updateCurrentIndex(index: number) {
  nextOrPreBtnObj.value.currentIndex = index;
}
const disableNextOrder = computed(() => nextOrPreBtnObj.value.currentIndex + 1 >= comingOrderList.value.length);
const disablePreOrder = computed(() => nextOrPreBtnObj.value.currentIndex <= 0);

dayjs.locale("zh-cn");
function formatDayToChineseFormat(date: string | Date) {
  return dayjs(date).format("M 月 D 日星期dd");
}

function totalNight(checkOutDate: Date | string, checkInDate: Date | string) {
  return dayjs(checkOutDate).diff(dayjs(checkInDate), "day");
}

const { open, close } = useModal({
  component: CancelReservation,
  attrs: {
    async onConfirm() {
      close();
      await deleteOrder(renderComingOrder.value._id);
      await execute();
      await nextTick(() => {
        calcHistoryOrderList();
        calcComingOrderList();
      });
    },
    onCancel() {
      close();
    },
  },
});
</script>

<template>
  <div class="xl:flex">
    <div class="mb-6 rounded-[1.25rem] bg-neutral-0 p-4 xl:mb-0 xl:mr-10 xl:max-h-max xl:w-full xl:max-w-[56%] xl:p-10">
      <template v-if="comingOrderList.length === 0">
        <div class="mb-6 xl:mb-10">
          <div class="title xl:h5 text-neutral-100">
            即將來的行程
          </div>
        </div>
        <div class="h5 flex flex-col items-center justify-center text-primary">
          <IcClose class="mb-3 size-16 fill-primary" />
          沒有資料
        </div>
      </template>
      <template v-else>
        <div class="mb-6 xl:mb-10">
          <div class="body2 xl:body mb-2 text-neutral-80">
            預訂參考編號： {{ renderComingOrder._id }}
          </div>
          <div class="title xl:h5 text-neutral-100">
            即將來的行程
          </div>
        </div>
        <div class="mb-6 overflow-hidden rounded-lg">
          <img :src="renderComingOrder.roomId.imageUrl" alt="" class="aspect-[319/150] size-full object-cover object-center xl:aspect-[650/240]">
        </div>
        <div class="subtitle xl:h6 mb-6 flex items-center text-neutral-80">
          <span class="flex items-center after:mx-4 after:text-neutral-60 after:content-['|']">
            {{ renderComingOrder.roomId.name }}，{{ totalNight(renderComingOrder.checkOutDate, renderComingOrder.checkInDate) }} 晚
          </span>
          <span>
            住宿人數：{{ renderComingOrder.peopleNum }} 位
          </span>
        </div>
        <div class="subtitle xl:title mb-2 flex text-neutral-80 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
          入住：{{ formatDayToChineseFormat(renderComingOrder.checkInDate) }}，15:00 可入住
        </div>
        <div class="subtitle xl:title mb-6 flex text-neutral-80 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-neutral-60 before:content-['']">
          退房：{{ formatDayToChineseFormat(renderComingOrder.checkOutDate) }}，12:00 前退房
        </div>
        <div class="subtitle xl:title text-neutral-80">
          NT$ {{ numberToCurrency(renderComingOrder.roomId.price * totalNight(renderComingOrder.checkOutDate, renderComingOrder.checkInDate)) }}
        </div>
        <hr class="my-6 border-neutral-40 xl:my-10">

        <div class="subtitle xl:title mb-6 flex text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
          房內設備
        </div>
        <ol class="mb-6 grid grid-cols-2 gap-x-10 gap-y-2 rounded-lg border border-neutral-40 p-6 xl:mb-10 xl:grid-cols-3">
          <li v-for="item in renderComingOrder.roomId.facilityInfo" :key="item.title" class="subtitle flex items-center text-neutral-100">
            <IcCheck class="mr-2 size-6 fill-primary" />
            {{ item.title }}
          </li>
        </ol>

        <div class="subtitle xl:title mb-6 flex text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
          備品提供
        </div>
        <ol class="mb-6 grid grid-cols-2 gap-x-10 gap-y-2 rounded-lg border border-neutral-40 p-6 xl:mb-10 xl:grid-cols-3">
          <li v-for="item in renderComingOrder.roomId.amenityInfo" :key="item.title" class="subtitle flex items-center text-neutral-100">
            <IcCheck class="mr-2 size-6 fill-primary" />
            {{ item.title }}
          </li>
        </ol>
        <div class="mb-6 flex gap-4">
          <BaseButton class-type="secondary" class="title grow" type="button" @click="open">
            取消預訂
          </BaseButton>
          <BaseButton class-type="primary" class="title grow" type="button" :to="{ name: RoomRouteEnum.ROOMS_ID, params: { id: renderComingOrder.roomId._id } }">
            查看詳細
          </BaseButton>
        </div>
        <div v-show="nextOrPreBtnObj.isShowGroup" class="flex justify-center">
          <button type="button" class="mr-4 flex items-center hover:fill-primary hover:text-primary disabled:fill-neutral-60 disabled:text-neutral-60" :disabled="disablePreOrder" @click="updateCurrentIndex(--nextOrPreBtnObj.currentIndex)">
            <IcArrowLeft class="mr-2 size-6" />
            上一筆訂單
          </button>
          <button type="button" class="flex items-center hover:fill-primary hover:text-primary disabled:fill-neutral-60 disabled:text-neutral-60" :disabled="disableNextOrder" @click="updateCurrentIndex(++nextOrPreBtnObj.currentIndex)">
            下一筆訂單
            <IcArrowRight class="ml-2 size-6" />
          </button>
        </div>
      </template>
    </div>
    <div class="w-full rounded-[1.25rem] bg-neutral-0 p-4 xl:max-w-[41%] xl:p-10">
      <h2 class="title xl:h5 mb-6 text-neutral-100 xl:mb-10">
        歷史訂單
      </h2>
      <template v-if="historyOrderList.length === 0">
        <div class="h5 flex flex-col items-center justify-center text-primary">
          <IcClose class="mb-3 size-16 fill-primary" />
          沒有資料
        </div>
      </template>
      <template v-else>
        <div v-for="item in renderHistoryOrderList" :key="item._id">
          <div class="xl:flex">
            <div class="mb-6 max-h-20 max-w-[7.5rem] overflow-hidden rounded-lg xl:mb-0 xl:mr-6">
              <img :src="item.roomId.imageUrl" alt="" class="aspect-[120/80] size-full object-cover object-center">
            </div>
            <div>
              <div class="body2 xl:body mb-4 text-neutral-80">
                預訂參考編號： {{ item._id }}
              </div>
              <div class="subtitle xl:h6 mb-4 text-neutral-80">
                {{ item.roomId.name }}
              </div>
              <div class="mb-4">
                <div class="body2 xl:body mb-2 text-neutral-80">
                  住宿天數： {{ totalNight(item.checkOutDate, item.checkInDate) }} 晚
                </div>
                <div class="body2 xl:body mb-2 text-neutral-80">
                  住宿人數： {{ item.peopleNum }} 位
                </div>
              </div>
              <div class="mb-4">
                <div class="body2 xl:body mb-2 flex text-neutral-80 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
                  入住：{{ formatDayToChineseFormat(item.checkInDate) }}
                </div>
                <div class="body2 xl:body flex text-neutral-80 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-neutral-60 before:content-['']">
                  退房：{{ formatDayToChineseFormat(item.checkOutDate) }}
                </div>
              </div>
              <div class="subtitle xl:title text-neutral-80">
                NT$ {{ numberToCurrency(item.roomId.price * totalNight(item.checkOutDate, item.checkInDate)) }}
              </div>
            </div>
          </div>
          <hr class="my-6 border-neutral-40 xl:my-10">
        </div>
        <BaseButton v-if="showMoreBtnObj.isShowMoreBtn" class-type="secondary" class="title flex w-full grow items-center" @click="showMoreBtnObj.showMoreList = true">
          查看更多
          <IcArrowDown class="ml-1 size-6 fill-primary" />
        </BaseButton>
      </template>
    </div>
  </div>
</template>
