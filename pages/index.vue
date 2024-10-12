<script setup lang="ts">
import { getNews } from "@/api/instances/news.ts";
import { getRooms } from "@/api/instances/rooms.ts";
import { getCulinaries } from "@/api/instances/culinary.ts";

import IcCar from "@/assets/icons/ic-car.svg";
import IcTrain from "@/assets/icons/ic-train.svg";
import IcLuxuryCar from "@/assets/icons/ic-luxury-car.svg";

const [news, rooms, culinaries] = await Promise.all([getNews(), getRooms(), getCulinaries()]);
</script>

<template>
  <div>
    <IndexHeroCarousel />
    <section class="relative justify-center px-3 py-20 xl:flex xl:py-[7.5rem]">
      <div class="mb-10 xl:mr-20">
        <h2 class="h3 mb-6 text-primary">
          最新<br>
          消息
        </h2>
        <div class="h-0.5 w-[8.75rem] rounded-[6.25rem] bg-[linear-gradient(90deg,#BE9C7C_0%,#FFF_100%)]" />
      </div>
      <ol class="grid grid-cols-1 gap-10 xl:max-w-[67.25rem]">
        <li v-for="item in news.data.value.result" :key="item._id" class="xl:flex xl:items-center">
          <div class="mb-6 shrink-0 xl:mb-0 xl:mr-6 xl:max-w-[29.625rem]">
            <img :src="item.image" :alt="item.title" class="aspect-[351/294] size-full rounded-lg xl:aspect-[474/294]">
          </div>
          <div>
            <h3 class="h4 xl:h3 mb-2 text-neutral-100 xl:mb-6">
              {{ item.title }}
            </h3>
            <p class="body2 xl:body text-neutral-80">
              {{ item.description }}
            </p>
          </div>
        </li>
      </ol>
      <img src="@/assets/images/index/dot.png" class="absolute right-6 top-10 size-[6.25rem] xl:right-[11.25rem] xl:top-[6.25rem] xl:size-[12.5rem]">
      <img src="@/assets/images/index/dot.png" class="absolute bottom-[-3.75rem] left-6 z-10 size-[6.25rem] xl:-bottom-20 xl:size-[12.5rem]">
    </section>
    <section class="relative bg-neutral-100 pb-20 pt-[7.5rem] xl:py-[7.5rem]">
      <div class="absolute top-20 h-[37.125rem] w-full bg-[url('@/assets/images/index/about_bg.jpg')] bg-cover bg-center xl:top-[7.5rem]" />
      <div class="relative ml-10 mr-5 rounded-[2.5rem_2.5rem_0rem_2.5rem] border-b border-l border-neutral-0 bg-[linear-gradient(180deg,rgba(20,15,10,0.80)_0%,rgba(190,156,124,0.80)_100%)] p-6 xl:ml-[29.4%] xl:mr-[16.2%] xl:max-w-[65.25rem] xl:p-20">
        <div class="mb-10 flex items-center justify-between xl:mb-20 xl:justify-start">
          <h2 class="h3 xl:h1 mr-10 text-neutral-0">
            關於<br>
            我們
          </h2>
          <div class="h-0.5 w-[10.0625rem] bg-white" />
        </div>
        <p class="body2 xl:body mb-4 text-white xl:mb-10">
          享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。<br>
          我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。
        </p>
        <p class="body2 xl:body mb-4 text-white xl:mb-10">
          我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。<br>
          我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。
        </p>
        <p class="body2 xl:body mb-4 text-white xl:mb-10">
          在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。
        </p>
        <p class="body2 xl:body text-white xl:mb-10">
          享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
        </p>
      </div>
    </section>
    <IndexRoomTypeCarousel :rooms="rooms.data.value.result" />
    <IndexDishesCarousel :culinaries="culinaries.data.value.result" />
    <section class="bg-neutral-100 pt-20 xl:pt-[7.5rem]">
      <div class="mb-10 px-3 xl:mx-auto xl:mb-20 xl:max-w-[81rem]">
        <div class="mb-10 flex items-center xl:mb-20">
          <h2 class="h3 xl:h1 mr-10 text-primary">
            交通<br>
            方式
          </h2>
          <div class="h-0.5 w-[12.125rem] rounded-[6.25rem] bg-[linear-gradient(90deg,#BE9C7C_0%,#FFF_100%)] xl:w-[10.625rem]" />
        </div>
        <div class="title xl:title mb-4 text-neutral-40">
          台灣高雄市新興區六角路123號
        </div>
        <div class="mb-6 overflow-hidden rounded-lg xl:mb-10">
          <img src="@/assets/images/index/map.jpg" alt="" class="aspect-[351/360] size-full object-cover object-center xl:aspect-[1295/360]">
        </div>
        <ul class="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <li>
            <IcCar class="mb-2 size-12 fill-primary xl:mb-4 xl:size-20" />
            <h3 class="title xl:h5 mb-2 text-neutral-0">
              自行開車
            </h3>
            <p class="body2 xl:body text-neutral-0">
              如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。
            </p>
          </li>
          <li>
            <IcTrain class="mb-2 size-12 fill-primary xl:mb-4 xl:size-20" />
            <h3 class="title xl:h5 mb-2 text-neutral-0">
              高鐵/火車
            </h3>
            <p class="body2 xl:body text-neutral-0">
              如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。
            </p>
          </li>
          <li>
            <IcLuxuryCar class="mb-2 size-12 fill-primary xl:mb-4 xl:size-20" />
            <h3 class="title xl:h5 mb-2 text-neutral-0">
              禮賓車服務
            </h3>
            <p class="body2 xl:body text-neutral-0">
              承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567
            </p>
          </li>
        </ul>
      </div>
      <div class="decorate-line aspect-[375/84] bg-contain bg-center bg-no-repeat xl:aspect-[1920/188]" />
    </section>
  </div>
</template>
