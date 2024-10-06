<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";

import type { BaseRoom } from "@/typing/base/rooms.ts";

import IcSize from "@/assets/icons/ic-size.svg";
import IcBed from "@/assets/icons/ic-bed.svg";
import IcPerson from "@/assets/icons/ic-person.svg";
import IcArrowRightLine from "@/assets/icons/ic-arrow-right-line.svg";
import IcArrowRight from "@/assets/icons/ic-arrow-right.svg";
import IcArrowLeft from "@/assets/icons/ic-arrow-left.svg";

defineProps<BaseRoom>();

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true });

const totalSlide = ref(0);
const currentSlide = ref(1);
onMounted(() => {
  if (emblaApi.value) {
    totalSlide.value = emblaApi.value.slideNodes().length;
    emblaApi.value.on("select", () => {
      currentSlide.value = emblaApi.value?.selectedScrollSnap() ?? 0;
      currentSlide.value++;
    });
  }
});
function currentSlideClass(slideNumber: number) {
  if (slideNumber === currentSlide.value) {
    return "bg-primary w-[3.75rem]";
  }
  return "bg-primary-40 w-[2.5rem]";
}
function changeSlide(slideNumber: number) {
  currentSlide.value = slideNumber;
  emblaApi?.value?.scrollTo(slideNumber - 1);
}
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-[1.25rem] bg-neutral-0 xl:flex-row">
    <div class="relative w-full xl:max-w-[48.3125rem]">
      <div ref="emblaRef" class="overflow-hidden">
        <div class="flex">
          <div v-for="item in imageUrlList" :key="item" class="flex-[0_0_100%]">
            <img :src="item" :alt="item" class="aspect-[351/200] size-full object-cover xl:aspect-[773/457]" draggable="false">
          </div>
        </div>

        <button type="button" class="absolute left-6 top-[12.5rem] hidden rounded-full bg-white p-2 xl:flex" @click="emblaApi?.scrollPrev()">
          <IcArrowLeft class="size-10 fill-neutral-80" />
        </button>
        <button type="button" class="absolute right-6 top-[12.5rem] hidden rounded-full bg-white p-2 xl:flex" @click="emblaApi?.scrollNext()">
          <IcArrowRight class="size-10 fill-neutral-80" />
        </button>
        <div class="absolute bottom-6 left-1/2 w-max -translate-x-1/2 text-black">
          <button v-for="item in totalSlide" :key="item" type="button" class="mr-2 h-1 rounded-[6.25rem] last-of-type:mr-0" :class="currentSlideClass(item)" @click="changeSlide(item)" />
        </div>
      </div>
    </div>

    <NuxtLink :to="{ name: 'rooms-id', params: { id: _id } }" class="py-4 pl-4 pr-3 xl:p-10">
      <p class="h4 xl:h2 mb-2 text-neutral-100">
        {{ name }}
      </p>
      <p class="text-body2 xl:text-body mb-6 text-neutral-80 xl:mb-10">
        {{ description }}
      </p>
      <ol class="mb-6 flex xl:mb-10">
        <li class="text-subtitle xl:text-title mr-4 w-[6.0625rem] rounded-lg border border-primary-40 px-4 py-[1.38rem] text-neutral-80 xl:py-4">
          <IcSize class="mb-2 size-6 fill-primary" />
          {{ areaInfo }}
        </li>
        <li class="text-subtitle xl:text-title mr-4 w-[6.0625rem] text-nowrap rounded-lg border border-primary-40 px-4 py-[1.38rem] text-neutral-80 xl:py-4">
          <IcBed class="mb-2 size-6 fill-primary" />
          {{ bedInfo }}
        </li>
        <li class="text-subtitle xl:text-title w-[6.0625rem] rounded-lg border border-primary-40 px-4 py-[1.38rem] text-neutral-80 xl:py-4">
          <IcPerson class="mb-2 size-6 fill-primary" />
          {{ maxPeople }}人
        </li>
      </ol>
      <div class="mb-6 h-0.5 w-full bg-[linear-gradient(90deg,#BE9C7C_0%,#FFF_100%)] xl:mb-10" />
      <div class="text-title xl:h5 flex items-center justify-between py-4 text-primary xl:py-[0.84rem]">
        <div>
          NT$ {{ formatNumber(price) }}
        </div>
        <IcArrowRightLine class="size-6 fill-primary" />
      </div>
    </NuxtLink>
  </div>
</template>
