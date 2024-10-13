<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

import LogoPrimary from "@/assets/icons/logo-primary.svg";
import IcClose from "@/assets/icons/ic-close.svg";

defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <VueFinalModal
    class="flex items-end xl:items-center xl:justify-center xl:backdrop-blur-[10px]"
    content-class="xl:max-w-[37.5rem] bg-white w-full flex-col rounded-t-[0.5rem] xl:rounded-[0.5rem]"
  >
    <div class="flex items-center justify-between border-b border-neutral-40 p-4 xl:justify-end xl:border-none xl:p-0">
      <div class="subtitle text-neutral-100 xl:hidden">
        取消預訂
      </div>
      <IcClose class="size-6 cursor-pointer xl:size-10 xl:p-2" @click="$emit('cancel')" />
    </div>
    <div class="subtitle xl:h6 px-4 py-10 text-center text-neutral-80 xl:pb-[6.25rem] xl:pt-[3.75rem]">
      確定要取消此房型的預訂嗎？
    </div>
    <div class="flex justify-between gap-4 border-t border-neutral-40 p-3">
      <BaseButton class-type="secondary" class="title grow" @click="$emit('cancel')">
        關閉視窗
      </BaseButton>
      <BaseButton class-type="primary" class="title grow" @click="$emit('confirm')">
        確定取消
      </BaseButton>
    </div>
  </VueFinalModal>
</template>
