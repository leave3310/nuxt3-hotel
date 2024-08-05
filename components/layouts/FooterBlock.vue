<script setup lang="ts">
import LogoIcon from "@/assets/icons/logo.svg";
import LineIcon from "@/assets/icons/bi-line.svg";
import IGIcon from "@/assets/icons/ic-instagram.svg";
</script>

<template>
  <footer class="bg-neutral-100 px-3 py-20 text-neutral-0 xl:px-[19.5rem] xl:pb-[7.5rem] xl:pt-20">
    <div class="mb-20 flex flex-col justify-between xl:flex-row">
      <div class="mb-10 xl:mb-0">
        <div class="mb-10">
          <LogoIcon class="w-[12.25rem]" />
        </div>
        <div class="flex">
          <LineIcon class="mr-4 size-10 cursor-pointer rounded-full border border-neutral-0 fill-neutral-0 p-2" />
          <IGIcon class="size-10 cursor-pointer rounded-full border border-neutral-0 fill-neutral-0 p-2" />
        </div>
      </div>
      <div class="flex flex-col xl:flex-row">
        <div class="mb-4 xl:mb-0 xl:mr-20">
          <div class="mb-4 xl:mb-10">
            <div class="mb-2 text-base font-bold tracking-[0.02rem] text-neutral-0">
              TEL
            </div>
            <div
              class="text-sm font-medium leading-normal tracking-[0.0175rem] text-neutral-40 xl:text-base xl:tracking-[0.02rem]"
            >
              +886-7-1234567
            </div>
          </div>
          <div>
            <div class="mb-2 text-base font-bold tracking-[0.02rem] text-neutral-0">
              FAX
            </div>
            <div
              class="text-sm font-medium leading-normal tracking-[0.0175rem] text-neutral-40 xl:text-base xl:tracking-[0.02rem]"
            >
              +886-7-1234567
            </div>
          </div>
        </div>
        <div>
          <div class="mb-4 xl:mb-10">
            <div class="mb-2 text-base font-bold tracking-[0.02rem] text-neutral-0">
              MAIL
            </div>

            <div>
              <a
                href="mailto:elh@hexschool.com"
                class="text-sm font-medium leading-normal tracking-[0.0175rem] text-neutral-40 xl:text-base xl:tracking-[0.02rem]"
              >
                elh@hexschool.com
              </a>
            </div>
          </div>
          <div>
            <div class="mb-2 text-base font-bold tracking-[0.02rem] text-neutral-0">
              WEB
            </div>
            <a
              href="www.elhhexschool.com.tw"
              class="text-sm font-medium leading-normal tracking-[0.0175rem] text-neutral-40 xl:text-base xl:tracking-[0.02rem]"
            >www.elhhexschool.com.tw</a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between xl:flex-row">
      <div
        class="mb-4 text-sm font-normal leading-normal tracking-[0.0175rem] text-neutral-0 xl:mb-0 xl:text-base xl:font-medium xl:tracking-[0.02rem]"
      >
        806023 台灣高雄市新興區六角路123號
      </div>
      <div
        class="mb-4 text-sm font-normal leading-normal tracking-[0.0175rem] text-neutral-0 xl:mb-0 xl:text-base xl:font-medium xl:tracking-[0.02rem]"
      >
        © 享樂酒店 2023 All Rights Reserved.
      </div>
    </div>
  </footer>
</template>
