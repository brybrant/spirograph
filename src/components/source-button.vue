<script setup>
import GithubSVG from '../../node_modules/@brybrant/svg-icons/GitHub.svg';

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
    <span v-html="GithubSVG"></span>View Source
  </a>
</template>
