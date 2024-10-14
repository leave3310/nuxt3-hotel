<script setup lang="ts">

</script>

<template>
  <div>
    <LayoutsBlackHeader />
    <main class="flex h-full min-h-[calc(100dvh-4.5rem)] flex-1 bg-neutral-100 xl:h-[calc(100dvh-7.5rem)]">
      <slot />
    </main>
  </div>
</template>
