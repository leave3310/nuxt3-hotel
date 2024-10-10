<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
</script>

<template>
  <div>
    <LayoutsBlackHeader />
    <main class="flex h-full min-h-dvh flex-1 flex-col">
      <slot />
    </main>
    <LayoutsFooterBlock />
    <ModalsContainer />
  </div>
</template>
