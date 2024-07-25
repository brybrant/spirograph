<template>
  <div class="background__container">
    <div class="background">
      <div class="spirograph">
        <div v-for="a in Array(128)" :key="a" class="a">
          <div class="b" />
        </div>
      </div>
    </div>
  </div>
  <main>
    <h1>Energy</h1>

    <p>By Matt Bryant</p>

    <SourceButton href="/blob/master/src/pages/energy.scss" />
  </main>
</template>

<script>
export default {
  name: "EnergyPage",
  head() {
    return {
      title: "Energy",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./energy.scss";
</style>
