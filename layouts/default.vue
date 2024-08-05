<script setup lang="ts">
</script>

<template>
  <div>
    <LayoutsHeaderBlock />
    <main class="flex h-dvh flex-1 flex-col bg-neutral-100">
      <slot />
    </main>
    <LayoutsFooterBlock />
  </div>
</template>
