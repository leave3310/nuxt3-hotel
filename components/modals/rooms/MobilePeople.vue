<script setup lang="ts">
import dayjs from "dayjs";
import { VueFinalModal } from "vue-final-modal";

import { useRoomStore } from "@/stores/room.ts";

import IcClose from "@/assets/icons/ic-close.svg";
import IcMinus from "@/assets/icons/ic-minus.svg";
import IcPlus from "@/assets/icons/ic-plus.svg";

defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
  (e: "backPreStep"): void;
}>();
interface ReservationDate {
  start: Date;
  end: Date;
}

const roomStore = useRoomStore();

const range = ref<ReservationDate>({
  start: dayjs().add(1, "day").toDate(),
  end: dayjs().add(2, "day").toDate(),
});
function totalDay() {
  return dayjs(range.value.end).diff(dayjs(range.value.start), "day");
}
</script>

<template>
  <VueFinalModal
    class="flex items-end"
    content-class="bg-neutral-0 rounded-t-lg w-full"
  >
    <div class="border-b border-neutral-40 ">
      <div class="px-6 pb-2 pt-4">
        <button type="button">
          <IcClose class="mb-4 size-6 fill-neutral-100" @click="$emit('cancel')" />
        </button>
        <div class="flex items-center">
          <div class="h6 mr-4 text-neutral-100">
            {{ totalDay() }}晚
          </div>
          <div class="body2 text-neutral-80">
            {{ dayjs(roomStore.checkInOutDay.checkInDate).format('YYYY/MM/DD') }} - {{ dayjs(roomStore.checkInOutDay.checkOutDate).format('YYYY/MM/DD') }}
          </div>
        </div>
      </div>
    </div>
    <div class="p-6">
      <div class="title mb-1 text-neutral-100">
        選擇人數
      </div>
      <div class="body2 mb-4 text-neutral-80">
        此房型最多供 4 人居住，不接受寵物入住。
      </div>
      <div class="flex items-center">
        <button
          type="button"
          class="title group rounded-[6.25rem] border border-neutral-40 p-4"
          :disabled="roomStore.reservationPeople === 1"
          @click="roomStore.updateReservationPeople(--roomStore.reservationPeople)"
        >
          <IcMinus class="size-6 fill-neutral-100 group-disabled:fill-neutral-60" />
        </button>
        <span class="h6 px-[1.38rem] text-neutral-100">
          {{ roomStore.reservationPeople }}
        </span>
        <button
          type="button"
          class="title group rounded-[6.25rem] border border-neutral-40 p-4"
          :disabled="roomStore.reservationPeople === 4" @click="roomStore.updateReservationPeople(++roomStore.reservationPeople)"
        >
          <IcPlus class="size-6 fill-neutral-100 group-disabled:fill-neutral-60" />
        </button>
      </div>
    </div>

    <div class="sticky bottom-0 flex gap-4 border-t border-neutral-40 p-3">
      <button type="button" class="title grow p-4 text-neutral-80" @click="$emit('backPreStep')">
        重新選擇日期
      </button>
      <BaseButton type="button" class="title grow p-4" class-type="primary" @click="emit('confirm')">
        儲存
      </BaseButton>
    </div>
  </VueFinalModal>
</template>
