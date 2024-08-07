<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";

// interface ImgList {
//   imgURL: string[];
// }
// defineProps<ImgList>();
const slideList = ["Slide 1", "Slide 2", "Slide 3"];

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true });

const totalSlide = ref(0);
onMounted(() => {
  if (emblaApi.value)
    totalSlide.value = emblaApi.value.slideNodes().length;
});
</script>

<template>
  <div class="text-white">
    <div ref="emblaRef" class="overflow-hidden ">
      <div class="flex">
        <div v-for="item in slideList" :key="item" class="flex-[0_0_100%]">
          <!-- <img :src="" alt=""> -->
          {{ item }}
        </div>
      </div>
    </div>
    {{ emblaApi?.selectedScrollSnap() }}
  </div>
</template>
