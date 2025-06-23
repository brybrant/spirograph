<template>
  <div class="background">
    <CanvasElement :render="render" color="#0ff" />
  </div>
  <main>
    <h1>Energy</h1>

    <SourceButton href="/blob/master/src/pages/energy.vue" />
  </main>
</template>

<script>
const steps = 128;
const divisor = 14;
const divisorControl = divisor / 2;

const stepAngle = Math.PI / (steps / 2);
const stepMod = Math.PI / (steps / divisorControl / 2);

export default {
  name: 'EnergyPage',
  data() {
    return {
      twist: 0,
    };
  },
  head: {
    title: 'Energy',
  },
  methods: {
    /**
     * @param {CanvasRenderingContext2D} context
     * @param {Number} radius
     * @param {Number} deltaTime
     */
    render(context, radius, deltaTime) {
      const radiusInner = radius * 0.32;

      context.beginPath();

      let startAngle = 0;

      context.moveTo(radius, 0);

      for (let i = 0; i < steps; i++) {
        const offset =
          (0.25 + Math.cos(this.twist + i * stepMod)) * radiusInner;

        const controlAngle = startAngle + stepAngle * divisorControl;
        const endAngle = startAngle + stepAngle * divisor;

        context.quadraticCurveTo(
          Math.cos(controlAngle) * offset,
          Math.sin(controlAngle) * offset,
          Math.cos(endAngle) * radius,
          Math.sin(endAngle) * radius,
        );

        startAngle = endAngle;
      }

      context.stroke();

      this.twist = (this.twist + 5e-4 * deltaTime) % this.$rad360;
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  &:hover {
    color: #0ff;
  }

  &:active {
    color: #0bb;
  }
}
</style>
