<template>
  <div class="background">
    <div class="spirograph">
      <div class="container">
        <div v-for="a in Array(16)" :key="a" class="a">
          <div v-for="b in Array(4)" :key="b" class="b"></div>
        </div>
      </div>
      <div class="container">
        <div v-for="a in Array(16)" :key="a" class="a">
          <div v-for="b in Array(4)" :key="b" class="b"></div>
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
