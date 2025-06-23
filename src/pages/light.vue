<template>
  <div class="background">
    <CanvasElement :render="render" color="#ff0" />
  </div>
  <main>
    <h1>Light</h1>

    <SourceButton href="/blob/master/src/pages/light.scss" />
  </main>
</template>

<script>
const steps = 64;

const rad20 = Math.PI / 9;

const stepAngle = Math.PI / (steps / 2);

export default {
  name: 'LightPage',
  data() {
    return {
      reflection: 0,
    };
  },
  head: {
    title: 'Light',
  },
  methods: {
    /**
     * @param {CanvasRenderingContext2D} context
     * @param {Number} radius
     * @param {Number} deltaTime
     */
    render(context, radius, deltaTime) {
      const radiusInner = radius * 0.35;

      const offset = (1.5 + Math.cos(this.reflection)) * rad20;

      context.beginPath();

      for (let i = 0; i < steps; i++) {
        const angle = i * stepAngle;

        context.moveTo(
          Math.cos(angle - offset) * radius,
          Math.sin(angle - offset) * radius,
        );
        context.lineTo(
          Math.cos(angle) * radiusInner,
          Math.sin(angle) * radiusInner,
        );
        context.lineTo(
          Math.cos(angle + offset) * radius,
          Math.sin(angle + offset) * radius,
        );
      }

      context.stroke();

      this.reflection = (this.reflection + 5e-4 * deltaTime) % this.$rad360;
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  &:hover {
    color: #ff0;
  }

  &:active {
    color: #bb0;
  }
}
</style>
