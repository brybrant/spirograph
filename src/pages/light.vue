<template>
  <div class="background">
    <div class="spirograph">
      <div v-for="a in Array(2)" :key="a" class="a">
        <div v-for="b in Array(32)" :key="b" class="b"></div>
      </div>
    </div>
  </div>
  <main>
    <h1>Light</h1>

    <p>By Matt Bryant</p>

    <SourceButton href="/blob/master/src/pages/light.scss" />
  </main>
</template>

<script>
export default {
  name: "LightPage",
  head() {
    return {
      title: "Light",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./light.scss";
</style>
