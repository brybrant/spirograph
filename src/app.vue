<template>
  <nav>
    <RouterLink to="/mass"><span>Mass</span></RouterLink>
    <RouterLink to="/energy"><span>Energy</span></RouterLink>
    <RouterLink to="/light"><span>Light</span></RouterLink>
  </nav>
  <RouterView />
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: (title) => {
        return !title ? "Spirograph" : `${title} | Spirograph`;
      },
    };
  },
};
</script>
