<script setup>
import GithubSVG from '../svg/github.vue';

defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <a
    class="button"
    target="_blank"
    :href="`https://github.com/brybrant/spirograph${href}`"
  >
    <GithubSVG />View Source
  </a>
</template>
