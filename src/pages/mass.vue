<template>
  <div class="background__container">
    <div class="background">
      <div class="spirograph">
        <div v-for="a in Array(64)" :key="a" class="a">
          <div class="b"></div>
        </div>
      </div>
    </div>
  </div>
  <main>
    <h1>Mass</h1>

    <p>By Matt Bryant</p>

    <SourceButton href="/blob/master/src/pages/mass.scss" />
  </main>
</template>

<script>
export default {
  name: 'MassPage',
  head() {
    return {
      title: 'Mass',
    };
  },
};
</script>

<style lang="scss" scoped>
@import './mass.scss';
</style>
