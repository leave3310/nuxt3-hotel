<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

import LogoPrimary from "@/assets/icons/logo-primary.svg";
</script>

<template>
  <VueFinalModal
    :esc-to-close="false"
    :click-to-close="false"
    class="flex items-center justify-center backdrop-blur-[10px]"
    content-class="flex justify-center items-center max-w-[63.75rem] bg-white size-full max-h-[50rem] flex-col rounded-[1.25rem] p-10"
  >
    <div class="mb-[3.75rem] flex">
      <div class="dot-flashing" />
    </div>
    <LogoPrimary class="mb-4 w-36" />
    <div class="h5 text-black ">
      正在處理你的預訂
    </div>
  </VueFinalModal>
</template>
