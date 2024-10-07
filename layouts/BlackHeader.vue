<template>
  <div>
    <LayoutsBlackHeader />
    <main class="flex h-full min-h-dvh flex-1 flex-col bg-primary-10">
      <slot />
    </main>
    <LayoutsFooterBlock />
  </div>
</template>
