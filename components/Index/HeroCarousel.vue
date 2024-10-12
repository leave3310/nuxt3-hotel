<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";

import { AppRouteEnum } from "@/typing/enum/router";

const slideList = [
  {
    image: "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/桌機版/banner.png",
    title: "高雄<br />豪華住宿之選",
    text: "我們致力於為您提供無與倫比的奢華體驗與優質服務",
  },
  {
    image: "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/桌機版/room2-1.png",
    title: "高雄<br />豪華住宿之選",
    text: "我們致力於為您提供無與倫比的奢華體驗與優質服務",
  },
  {
    image: "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/桌機版/room3-1.png",
    title: "高雄<br />豪華住宿之選",
    text: "我們致力於為您提供無與倫比的奢華體驗與優質服務",
  },
  {
    image: "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/桌機版/room4-1.png",
    title: "高雄<br />豪華住宿之選",
    text: "我們致力於為您提供無與倫比的奢華體驗與優質服務",
  },
  {
    image: "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/桌機版/room5-1.png",
    title: "高雄<br />豪華住宿之選",
    text: "我們致力於為您提供無與倫比的奢華體驗與優質服務",
  },
];
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
  return "bg-primary-40 w-[2rem]";
}
function changeSlide(slideNumber: number) {
  currentSlide.value = slideNumber;
  emblaApi?.value?.scrollTo(slideNumber - 1);
}
</script>

<template>
  <div>
    <div ref="emblaRef" class="relative overflow-hidden">
      <div class="flex">
        <div v-for="item in slideList" :key="item.title" class="relative flex-[0_0_100%]">
          <img :src="item.image" :alt="item.title" class="aspect-[375/812] size-full object-cover object-center xl:aspect-[1920/1080]">
          <div class="absolute inset-0 bg-black/60 px-5 pb-[4.44rem] pt-28 xl:px-20 xl:pb-[10.38rem] xl:pt-[14.75rem]">
            <div class="flex flex-col items-center xl:max-w-[110rem] xl:flex-row ">
              <div class="mb-[6.25rem] flex flex-col items-center xl:mr-[9.5rem] xl:w-full xl:max-w-[39.75rem] xl:items-start">
                <div class="h4 mb-2 text-primary xl:text-[2.08vw]">
                  享樂酒店
                </div>
                <div class="title mb-5 text-primary xl:text-[1.25vw]">
                  Enjoyment Luxury Hotel
                </div>
                <div class="h-[5.1875rem] w-0.5 bg-[linear-gradient(90deg,#BE9C7C_0%,#FFF_100%)] xl:h-0.5 xl:w-[33.125vw]" />
              </div>
              <div class="relative max-w-[19.3125rem] before:absolute before:inset-0 before:left-[2.38rem] before:top-[-3.75rem] before:h-[26.25rem] before:w-[18.1875rem] before:rounded-[2.5rem] before:border-r before:border-t before:border-primary-10 before:bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.30)_100%)] before:backdrop-blur-[10px] xl:max-w-[48.25rem] xl:before:-top-24 xl:before:left-12 xl:before:h-[42.375rem] xl:before:w-[57.75rem]">
                <div class="relative">
                  <div class="h1 mb-6 text-neutral-0 xl:text-[5.209vw]">
                    高雄<br>
                    豪華住宿之選
                  </div>
                  <div class="title mb-10 text-neutral-40 xl:mb-[3.75rem] xl:text-[1.67vw] xl:font-semibold xl:leading-1.2">
                    我們致力於為您提供無與倫比的奢華體驗與優質服務
                  </div>
                  <nuxt-link :to="AppRouteEnum.ROOMS_LIST" class="flex max-w-[19.3175rem] items-center justify-end rounded-lg bg-neutral-0 p-5 transition-colors after:ml-4 after:h-[0.0625rem] after:w-[9.375rem] after:bg-neutral-100 after:transition-all after:content-[''] hover:bg-primary hover:text-neutral-0 hover:after:w-[7.5rem] hover:after:bg-neutral-0 xl:max-w-none">
                    立即訂房
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-6 left-1/2 w-max -translate-x-1/2 ">
        <button v-for="item in totalSlide" :key="item" type="button" class="mr-2 h-1 rounded-[6.25rem] last-of-type:mr-0" :class="currentSlideClass(item)" @click="changeSlide(item)" />
      </div>
    </div>
  </div>
</template>
