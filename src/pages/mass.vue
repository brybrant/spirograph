<template>
  <div class="background">
    <CanvasElement :render="render" color="#f00" />
  </div>
  <main>
    <h1>Mass</h1>

    <SourceButton href="/blob/master/src/pages/mass.vue" />
  </main>
</template>

<script>
const steps = 64;

const rad90 = Math.PI / 2;

const stepAngle = (Math.PI * 2) / steps;

const stepAngleControl = Math.PI / steps;

export default {
  name: 'MassPage',
  data() {
    return {
      expansion: 0,
    };
  },
  head: {
    title: 'Mass',
  },
  methods: {
    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} radius
     * @param {number} deltaTime
     */
    render(context, radius, deltaTime) {
      const radiusInner = radius * 0.15;

      const offset = (6 - Math.cos(this.expansion)) * radiusInner;

      context.beginPath();

      let startAngle = 0;

      context.moveTo(radius, 0);

      for (let i = 0; i < steps; i++) {
        const controlAngle = startAngle + rad90 + stepAngleControl;
        const endAngle = startAngle + Math.PI + stepAngle;

        context.quadraticCurveTo(
          Math.cos(controlAngle) * offset,
          Math.sin(controlAngle) * offset,
          Math.cos(endAngle) * radius,
          Math.sin(endAngle) * radius,
        );

        startAngle = endAngle;
      }

      context.stroke();

      this.expansion = (this.expansion + 5e-4 * deltaTime) % this.$rad360;
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  &:hover {
    color: #f00;
  }

  &:active {
    color: #c00;
  }
}
</style>
