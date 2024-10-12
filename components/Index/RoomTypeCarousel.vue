<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";

import { AppRouteEnum } from "@/typing/enum/router.ts";
import type { BaseRoom } from "@/typing/base/rooms.ts";

import RoomImgCarousel from "@/components/index/RoomImgCarousel.vue";
import IcArrowLeftLine from "@/assets/icons/ic-arrow-left-line.svg";
import IcArrowRightLine from "@/assets/icons/ic-arrow-right-line.svg";

defineProps<{
  rooms: BaseRoom[];
}>();

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true, watchDrag: false });

const totalSlide = ref(0);
onMounted(() => {
  if (emblaApi.value)
    totalSlide.value = emblaApi.value.slideNodes().length;
});
</script>

<template>
  <div class="relative bg-neutral-100 px-3 py-20 xl:px-0">
    <div class="absolute bottom-[15.81rem] left-0 h-[8.25rem] w-full xl:bottom-0 xl:h-[42.3125rem]">
      <img src="@/assets/images/index/gradient_bg.png" alt="" class="size-full">
    </div>
    <div ref="emblaRef" class="relative overflow-hidden xl:max-w-[100.5rem]">
      <div class="flex">
        <div v-for="item in rooms" :key="item._id" class="flex-[0_0_100%] xl:flex xl:items-end">
          <div class="mb-6 xl:mb-0 xl:mr-20 xl:w-full xl:max-w-[56.25rem]">
            <RoomImgCarousel :image-url-list="item.imageUrlList" />
          </div>
          <div class="xl:grow">
            <h3 class="h4 xl:h2 mb-2 text-neutral-0 xl:mb-4">
              {{ item.name }}
            </h3>
            <p class="body2 xl:body mb-6 text-neutral-0 xl:mb-10">
              {{ item.description }}
            </p>
            <div class="h5 xl:h3 mb-6 text-neutral-0 xl:mb-10">
              NT$ {{ item.price }}
            </div>
            <nuxt-link :to="{ path: AppRouteEnum.ROOMS_LIST }" class="title mb-6 flex items-center justify-end rounded-lg bg-neutral-0 p-5 text-neutral-100 transition-all after:ml-4 after:h-[0.0625rem] after:w-20 after:bg-neutral-100 after:transition-all after:content-[''] hover:bg-primary hover:text-neutral-0 hover:after:bg-neutral-0 xl:mb-24 xl:p-10 xl:text-2xl xl:font-bold xl:leading-normal xl:after:w-[9.375rem] xl:hover:after:w-[8.125rem]">
              查看更多
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="flex justify-end xl:absolute xl:bottom-0 xl:right-0">
        <button type="button" class="p-4" @click="emblaApi?.scrollPrev()">
          <IcArrowLeftLine class="size-6 fill-primary" />
        </button>
        <button type="button" class="p-4" @click="emblaApi?.scrollNext()">
          <IcArrowRightLine class="size-6 fill-primary" />
        </button>
      </div>
    </div>
    <div class="absolute -top-6 right-0 h-[5.25rem] max-w-[18.4375rem] xl:top-[11.25rem] xl:h-[11.6875rem] xl:max-w-[66.25rem]">
      <img src="@/assets/images/index/short_line.png" alt="" class="hidden size-full object-cover xl:flex">
      <img src="@/assets/images/index/mobile_short_line.png" alt="" class="flex size-full object-cover xl:hidden">
    </div>
    <div class="absolute -bottom-40 right-20 hidden size-[12.5rem] xl:flex">
      <img src="@/assets/images/index/dot.png" alt="">
    </div>
  </div>
</template>
