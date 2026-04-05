<script setup>
import GithubSVG from '@brybrant/svg-icons/GitHub.svg';

defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <a
    class='button'
    target='_blank'
    :href='`https://github.com/brybrant/spirograph${href}`'
    v-html='GithubSVG'
  />
</template>
