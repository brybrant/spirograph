<script setup lang="ts">
import { useHead } from '@unhead/vue';

useHead({
  titleTemplate: (title) => {
    return `${title ? `${title} | ` : ''}Spirograph`;
  },
});
</script>

<template>
  <nav>
    <RouterLink to="/mass">
      <span>Mass</span>
    </RouterLink>
    <RouterLink to="/energy">
      <span>Energy</span>
    </RouterLink>
    <RouterLink to="/light">
      <span>Light</span>
    </RouterLink>
  </nav>
  <RouterView />
</template>
