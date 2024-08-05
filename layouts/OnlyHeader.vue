<script setup lang="ts">

</script>

<template>
  <div>
    <LayoutsHeaderBlock />
    <main class="flex h-[calc(100dvh-7.5rem)] flex-1 flex-col bg-neutral-100">
      <slot />
    </main>
  </div>
</template>
