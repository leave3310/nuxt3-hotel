<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaPluginType } from "embla-carousel";

import { getRooms } from "@/api/instances/rooms.ts";

const { data } = await getRooms();
const plugins: EmblaPluginType[] = [Autoplay()];
const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true }, plugins as any);
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
  return "bg-primary-40 w-[2rem]";
}
function changeSlide(slideNumber: number) {
  currentSlide.value = slideNumber;
  emblaApi?.value?.scrollTo(slideNumber - 1);
  (emblaApi?.value?.plugins() as any).autoplay.reset();
}
</script>

<template>
  <div>
    <div class="relative h-[29.13rem] xl:h-[50rem]">
      <div ref="emblaRef" class="h-full overflow-hidden">
        <div class="flex h-full">
          <div v-for="item in data?.result[0].imageUrlList" :key="item" :style="{ backgroundImage: `url(${item})` }" class="size-full shrink-0 bg-cover bg-center" />
        </div>
      </div>
      <div class="absolute inset-0 bg-black/60 xl:flex xl:items-center xl:justify-center">
        <div class="flex flex-col xl:w-full xl:max-w-[48.75rem] xl:flex-row xl:items-center xl:justify-center">
          <div class="mb-10 mt-28 flex flex-col text-center text-primary xl:my-0 xl:mr-20 xl:grow xl:text-left">
            <h2 class="h4 xl:h2 mb-2">
              享樂酒店
            </h2>
            <h3 class="title xl:h5 mb-5 xl:mb-10">
              Enjoyment Luxury Hotel
            </h3>
            <div class="mx-auto h-[5.1875rem] w-0.5 rounded-[6.25rem] bg-[linear-gradient(#BE9C7C_0%,#FFF_100%)] xl:h-0.5 xl:w-full xl:bg-[linear-gradient(90deg,#BE9C7C_0%,#FFF_100%)]" />
          </div>

          <h1 class="h3 xl:h1 text-center text-neutral-0">
            客房旅宿
          </h1>
        </div>
      </div>
      <div class="absolute bottom-6 left-1/2 w-max -translate-x-1/2 text-black">
        <button v-for="item in totalSlide" :key="item" type="button" class="mr-2 h-1 rounded-[6.25rem] last-of-type:mr-0" :class="currentSlideClass(item)" @click="changeSlide(item)" />
      </div>
    </div>
    <section class="px-3 py-10 xl:pb-[10.5rem] xl:pt-[7.5rem]">
      <div class="xl:mx-auto xl:max-w-[81rem]">
        <div class="mb-10 xl:mb-20">
          <p class="subtitle xl:h6 mb-2 text-neutral-80 xl:mb-4">
            房型選擇
          </p>
          <h4 class="h3 xl:h1 text-primary">
            各種房型，任您挑選
          </h4>
        </div>
        <div class="grid grid-cols-1 gap-y-6 xl:gap-y-12">
          <CardsRoomsCard v-for="room in data?.result" :key="room._id" v-bind="{ ...room }" />
        </div>
      </div>
    </section>
  </div>
</template>
