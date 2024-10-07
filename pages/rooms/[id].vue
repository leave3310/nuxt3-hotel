<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";

import { getRoom } from "@/api/instances/rooms";

import IcSize from "@/assets/icons/ic-size.svg";
import IcBed from "@/assets/icons/ic-bed.svg";
import IcPerson from "@/assets/icons/ic-person.svg";
import IcCheck from "@/assets/icons/ic-check.svg";
import IcMinus from "@/assets/icons/ic-minus.svg";
import IcPlus from "@/assets/icons/ic-plus.svg";

definePageMeta({
  layout: "black-header",
});

const route = useRoute();
const { id } = route.params;
const { data } = await getRoom(id as string);

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

const roomLayout = [
  "市景",
  "獨立衛浴",
  "客廳",
  "書房",
  "樓層電梯",
];
const accommodationNotice = [
  "入住時間為下午3點，退房時間為上午12點。",
  "如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。",
  "請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。",
  "若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。",
  "請愛惜我們的房間與公共空間，並保持整潔。",
  "如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。",
  "我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。",
  "請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。",
  "我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。",
  "為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。",
];

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
</script>

<template>
  <div>
    <div ref="emblaRef" class="relative overflow-hidden xl:hidden">
      <div class="flex">
        <div v-for="item in data.result.imageUrlList" :key="item" class="flex-[0_0_100%]">
          <img :src="item" alt="" class="aspect-[376/251] size-full object-cover xl:aspect-[773/457]">
        </div>
      </div>
      <div class="absolute bottom-6 left-1/2 flex w-full -translate-x-1/2 justify-between pl-3 pr-[0.81rem] text-black">
        <div class="flex items-end">
          <button v-for="item in totalSlide" :key="item" type="button" class="mr-2 h-1 rounded-[6.25rem] last-of-type:mr-0" :class="currentSlideClass(item)" @click="changeSlide(item)" />
        </div>
        <BaseButton type="button" class-type="secondary" class="title px-8 py-4">
          看更多
        </BaseButton>
      </div>
    </div>
    <div class="hidden p-20 xl:flex">
      <div class="relative flex justify-between gap-2 overflow-hidden rounded-[1.25rem]">
        <div class="grow">
          <img :src="data.result.imageUrlList[0]" alt="" class="aspect-[1003/669] size-full object-cover">
        </div>
        <div class="grid max-w-[48.375rem] grid-cols-2 gap-2">
          <img :src="data.result.imageUrlList[1]" alt="" class="aspect-[383/296] size-full object-cover">
          <img :src="data.result.imageUrlList[2]" alt="" class="aspect-[383/296] size-full object-cover">
          <img :src="data.result.imageUrlList[3]" alt="" class="aspect-[383/296] size-full object-cover">
          <img :src="data.result.imageUrlList[4]" alt="" class="aspect-[383/296] size-full object-cover">
        </div>
        <BaseButton type="button" class-type="secondary" class="title absolute bottom-10 right-10 px-12 py-4">
          看更多
        </BaseButton>
      </div>
    </div>
    <section class="justify-between px-3 py-10 xl:mx-auto xl:flex xl:max-w-[91rem] xl:px-20 xl:py-[7.5rem]">
      <div class="w-full xl:mr-[4.5rem] xl:max-w-[46.625rem]">
        <h1 class="h3 xl:h1 mb-4 text-neutral-100">
          {{ data.result.name }}
        </h1>
        <p class="body2 xl:body mb-6 text-neutral-80 xl:mb-20">
          {{ data.result.description }}
        </p>
        <dl>
          <dt class="mb-4 xl:mb-6">
            <h2 class="title xl:h5 flex items-center text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
              房型基本資訊
            </h2>
          </dt>
          <dd class="mb-6 xl:mb-20">
            <ol class="flex">
              <li class="title mr-4 w-[6.0625rem] rounded-lg border border-primary-40 bg-white px-4 py-[1.38rem] text-neutral-80 xl:py-4">
                <IcSize class="mb-2 size-6 fill-primary" />
                {{ data.result.areaInfo }}
              </li>
              <li class="title mr-4 w-[6.0625rem] text-nowrap rounded-lg border border-primary-40 bg-white px-4 py-[1.38rem] text-neutral-80 xl:py-4">
                <IcBed class="mb-2 size-6 fill-primary" />
                {{ data.result.bedInfo }}
              </li>
              <li class="title w-[6.0625rem] rounded-lg border border-primary-40 bg-white px-4 py-[1.38rem] text-neutral-80 xl:py-4">
                <IcPerson class="mb-2 size-6 fill-primary" />
                {{ data.result.maxPeople }}人
              </li>
            </ol>
          </dd>

          <dt class="mb-4 xl:mb-6">
            <h2 class="title xl:h5 flex items-center text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
              房間格局
            </h2>
          </dt>
          <dd class="mb-6 xl:mb-20">
            <ol class="grid grid-cols-3 gap-6 rounded-lg bg-white p-6 xl:flex xl:w-full xl:gap-10">
              <li v-for="item in roomLayout" :key="item" class="title flex text-nowrap text-neutral-80">
                <IcCheck class="mr-2 flex size-6 shrink-0 fill-primary" />
                {{ item }}
              </li>
            </ol>
          </dd>

          <dt class="mb-4 xl:mb-6">
            <h2 class="title xl:h5 flex items-center text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
              房內設備
            </h2>
          </dt>
          <dd class="mb-6 xl:mb-20">
            <ol class="grid grid-cols-2 gap-x-10 gap-y-2 rounded-lg bg-white p-6 xl:flex xl:flex-wrap">
              <li v-for="item in data.result.facilityInfo" v-show="item.isProvide" :key="item.title" class="title flex text-neutral-80">
                <IcCheck class="mr-2 flex size-6 fill-primary " />
                {{ item.title }}
              </li>
            </ol>
          </dd>

          <dt class="mb-4 xl:mb-6">
            <h2 class="title xl:h5 flex items-center text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
              備品提供
            </h2>
          </dt>
          <dd class="mb-6 xl:mb-20">
            <ol class="grid grid-cols-2 gap-x-10 gap-y-2 rounded-lg bg-white p-6 xl:flex xl:flex-wrap">
              <li v-for="item in data.result.amenityInfo" v-show="item.isProvide" :key="item.title" class="title flex text-neutral-80">
                <IcCheck class="mr-2 flex size-6 fill-primary " />
                {{ item.title }}
              </li>
            </ol>
          </dd>

          <dt class="mb-4 xl:mb-6">
            <h2 class="title xl:h5 flex items-center text-neutral-100 before:mr-3 before:flex before:h-6 before:w-1 before:rounded-[0.625rem] before:bg-primary before:content-['']">
              訂房須知
            </h2>
          </dt>
          <dd>
            <ul class="list-outside list-decimal pl-6">
              <li v-for="item in accommodationNotice" :key="item" class="body2 xl:body text-neutral-80">
                {{ item }}
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="sticky top-32 hidden max-h-[38.75rem] max-w-[29.875rem] rounded-[1.25rem] bg-white p-10 xl:flex xl:flex-col">
        <div class="h5 mb-14 text-neutral-100">
          預定房型
        </div>
        <div class="h2 mb-2 text-neutral-80">
          {{ data.result.name }}
        </div>
        <p class="body mb-10 text-neutral-80">
          {{ data.result.description }}
        </p>
        <div class="mb-10">
          <div class="mb-4 flex justify-between gap-x-2">
            <div class="grow rounded-lg border border-neutral-100 p-4 ">
              <div class="tiny text-neutral-80">
                入住
              </div>
              <div>
                {{ '2023 / 12 / 03' }}
              </div>
            </div>
            <div class="grow rounded-lg border border-neutral-100 p-4">
              <div class="tiny text-neutral-80">
                退房
              </div>
              <div>
                {{ '2023 / 12 / 03' }}
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="title text-neutral-100">
              人數
            </div>
            <div class="flex items-center">
              <button type="button" class="title rounded-[6.25rem] border border-neutral-40 p-4">
                <IcMinus class="size-6 fill-neutral-100" />
              </button>
              <span class="h6 px-[1.38rem] text-neutral-100">
                {{ 2 }}
              </span>
              <button type="button" class="title rounded-[6.25rem] border border-neutral-40 p-4">
                <IcPlus class="size-6 fill-neutral-100" />
              </button>
            </div>
          </div>
        </div>
        <div class="h5 mb-10 text-primary">
          NT$ {{ data.result.price }}
        </div>
        <div>
          <BaseButton type="button" class-type="primary" class="title w-full px-12 py-4">
            立即預訂
          </BaseButton>
        </div>
      </div>
    </section>
    <div class="fixed inset-x-0 bottom-0 flex items-center justify-between border-t border-t-neutral-40 bg-white p-3 xl:hidden">
      <div class="body2 text-neutral-80">
        ＮＴ$ {{ formatNumber(data.result.price) }} / 晚
      </div>
      <BaseButton type="button" class-type="primary" class="title px-12 py-4">
        查看可訂日期
      </BaseButton>
    </div>
  </div>
</template>
