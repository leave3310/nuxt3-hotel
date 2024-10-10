<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
</script>

<template>
  <div>
    <LayoutsHeaderBlock />
    <main class="flex h-full min-h-dvh flex-1 flex-col bg-primary-10">
      <slot />
    </main>
    <LayoutsFooterBlock />
    <ModalsContainer />
  </div>
</template>
