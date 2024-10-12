<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";

import type { BaseCulinary } from "@/typing/base/culinary.ts";

defineProps<{
  culinaries: BaseCulinary[];
}>();

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true, align: "start" });

const totalSlide = ref(0);
onMounted(() => {
  if (emblaApi.value) {
    totalSlide.value = emblaApi.value.slideNodes().length;
  }
});
</script>

<template>
  <section class="relative py-20 pl-3 xl:py-[7.5rem] xl:pl-[19.5rem]">
    <div class="absolute left-10 top-[3.44rem] hidden max-h-[11.6875rem] max-w-[66.75rem] xl:flex">
      <img src="@/assets/images/index/verticle_line.png" alt="" class="size-full object-cover">
    </div>
    <div class="mb-10 flex items-center xl:mb-20">
      <h2 class="h3 xl:h1 mr-10 text-primary">
        佳餚<br>
        美饌
      </h2>
      <div class="h-0.5 w-[8.75rem] rounded-[6.25rem] bg-[linear-gradient(90deg,#BE9C7C_0%,#FFF_100%)] xl:w-[10.4375rem]" />
    </div>
    <div ref="emblaRef" class="overflow-hidden">
      <div class="flex">
        <div v-for="item in culinaries" :key="item._id" class="relative ml-6 size-full flex-[0_0_80%] shrink-0 overflow-hidden rounded-lg xl:flex-[0_0_25%]">
          <img :src="item.image" :alt="item.title" class="aspect-[300/480] size-full object-cover xl:aspect-[416/600]">
          <div class="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)0%,#140F0A_77.6%)] p-4 backdrop-blur-[10px] xl:p-6">
            <div class="mb-4 flex items-center justify-between">
              <div class="h5 xl:h5 text-neutral-0">
                {{ item.title }}
              </div>
              <div class="subtitle xl:title text-neutral-40">
                {{ item.diningTime }}
              </div>
            </div>
            <p class="body2 xl:body text-neutral-0">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
