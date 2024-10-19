<script setup lang="ts">
import dayjs from "dayjs";
import { VueFinalModal } from "vue-final-modal";
import { useScreens } from "vue-screen-utils";

import IcClose from "@/assets/icons/ic-close.svg";

defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (e: "confirm", date: ReservationDate): void;
  (e: "cancel"): void;
}>();
interface ReservationDate {
  start: Date;
  end: Date;
}
const { mapCurrent } = useScreens({ xl: "1280px" });
const columns = mapCurrent({ xl: 2 }, 1);
const rows = mapCurrent({ xl: 1 }, 2);

const range = ref<ReservationDate>({
  start: dayjs().add(1, "day").toDate(),
  end: dayjs().add(2, "day").toDate(),
});
function clearDate() {
  range.value = {
    start: dayjs().add(1, "day").toDate(),
    end: dayjs().add(2, "day").toDate(),
  };
}
function totalDay() {
  return dayjs(range.value.end).diff(dayjs(range.value.start), "day");
}
</script>

<template>
  <VueFinalModal
    class="min-w-container xl:flex xl:items-end xl:backdrop-blur-[10px]"
    content-class="mt-9 size-full rounded-b-none rounded-t-lg bg-neutral-0 xl:mb-[5.5rem] xl:ml-auto xl:mr-[17%] xl:h-auto xl:w-[46.25rem] xl:rounded-[1.25rem] xl:p-8"
  >
    <div class="border-b border-neutral-40 xl:hidden">
      <div class="px-6 pb-2 pt-4">
        <button type="button">
          <IcClose class="mb-4 size-6 fill-neutral-100" @click="$emit('cancel')" />
        </button>
        <div class="flex">
          <div class="h6 text-neutral-100">
            {{ totalDay() }}晚
          </div>
          <div class="body2 text-neutral-80">
            {{ dayjs(range.start).format('YYYY/MM/DD') }} - {{ dayjs(range.end).format('YYYY/MM/DD') }}
          </div>
        </div>
      </div>
    </div>
    <div class="mb-10 hidden items-center justify-between xl:flex">
      <div>
        <div class="h5 mb-2 text-neutral-100">
          {{ totalDay() }}晚
        </div>
        <div class="body text-neutral-80">
          {{ dayjs(range.start).format('YYYY/MM/DD') }} - {{ dayjs(range.end).format('YYYY/MM/DD') }}
        </div>
      </div>
      <div class="flex w-[59%] justify-between gap-x-2">
        <div class="grow rounded-lg border border-neutral-100 p-4">
          <div class="tiny text-neutral-80">
            入住
          </div>
          <div>
            {{ dayjs(range.start).format('YYYY/MM/DD') }}
          </div>
        </div>
        <div class="grow rounded-lg border border-neutral-100 p-4">
          <div class="tiny text-neutral-80">
            退房
          </div>
          <div>
            {{ dayjs(range.end).format('YYYY/MM/DD') }}
          </div>
        </div>
      </div>
    </div>
    <div class="h-full xl:mb-10 xl:h-auto">
      <VDatePicker v-model.range="range" color="date" :rows="rows" :columns="columns" title-position="left" class="h-full" expanded borderless />
    </div>

    <div class="sticky bottom-0 flex gap-4 border-t border-neutral-40 p-3 xl:static xl:justify-end xl:border-0 xl:p-0">
      <button type="button" class="title grow p-4 text-neutral-80 xl:grow-0" @click="clearDate">
        清除日期
      </button>
      <BaseButton type="button" class="title grow p-4 xl:grow-0 xl:px-8" class-type="primary" @click="emit('confirm', range)">
        確定日期
      </BaseButton>
    </div>
  </VueFinalModal>
</template>
