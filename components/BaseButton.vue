<script setup lang="ts">
import { twMerge } from "tailwind-merge";

type ButtonType = "button" | "submit" | "reset" | undefined;
type ClassType = "primary" | "secondary" | "ghost" | "text";
interface BaseButtonProps {
  to?: string | object;
  type?: ButtonType;
  target?: string;
  disable?: boolean;
  classType: ClassType;
  class?: string;
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  to: "",
  type: "button",
  target: "",
  disable: false,
  classType: "primary",
  class: "",
});

function classList() {
  const baseButtonClass = "flex max-w-full items-center justify-center rounded-lg px-8 py-4 text-base font-bold tracking-[0.32rem] transition-colors";
  const primaryClass = "bg-primary text-white hover:bg-primary-120 disabled:bg-neutral-40 disabled:text-neutral-60";
  const secondaryClass = "border border-primary bg-neutral-0 text-primary hover:border-primary-120 hover:bg-primary-10 hover:text-primary-120 disabled:border-neutral-60 disabled:bg-neutral-0 disabled:text-neutral-60 disabled:cursor-not-allowed";
  const ghostClass = "text-white hover:text-primary disabled:text-neutral-60";
  const textClass = "text-primary underline hover:text-primary-120 disabled:text-neutral-60";

  switch (props.classType) {
    case "primary":
      return twMerge(`${baseButtonClass} ${primaryClass}`, props.class);
    case "secondary":
      return twMerge(`${baseButtonClass} ${secondaryClass}`, props.class);
    case "ghost":
      return twMerge(`${baseButtonClass} ${ghostClass}`, props.class);
    case "text":
      return twMerge(`${baseButtonClass} ${textClass}`, props.class);
    default:
      return twMerge(`${baseButtonClass} ${primaryClass}`, props.class);
  }
}
</script>

<template>
  <NuxtLink v-if="to" :class="classList()" :to="to" :target="target" :disable="disable">
    <slot />
  </NuxtLink>
  <button v-else :class="classList()" :type="type" :disabled="disable">
    <slot />
  </button>
</template>
