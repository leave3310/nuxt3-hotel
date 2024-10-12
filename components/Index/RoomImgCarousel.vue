<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";

defineProps<{
  imageUrlList: string[];
}>();

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
  <div ref="emblaRef" class="relative overflow-hidden">
    <div class="flex">
      <div v-for="item in imageUrlList" :key="item" class="flex-[0_0_100%]">
        <img :src="item" alt="" class="aspect-[351/300] size-full rounded-[0rem_0.5rem_0.5rem_0rem] xl:aspect-[900/900]">
      </div>
    </div>
    <div class="absolute bottom-6 left-1/2 w-max -translate-x-1/2 ">
      <button v-for="item in totalSlide" :key="item" type="button" class="mr-2 h-1 rounded-[6.25rem] last-of-type:mr-0" :class="currentSlideClass(item)" @click="changeSlide(item)" />
    </div>
  </div>
</template>
