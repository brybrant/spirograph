<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  name: 'CanvasElement',
  props: {
    render: {
      type: Function,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      /** @type {HTMLCanvasElement} */
      canvas: null,
      /** @type {CanvasRenderingContext2D} */
      context: null,
      halfWidth: 0,
      halfHeight: 0,
      lastTimestamp: 0,
      radius: 0,
      frame: 0,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d', { alpha: false });

    this.resize();

    window.addEventListener('resize', this.resize);

    this.frame = requestAnimationFrame(this.animation);
  },
  unmounted() {
    cancelAnimationFrame(this.frame);

    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      this.canvas.width = window.innerWidth * window.devicePixelRatio;
      this.canvas.height = window.innerHeight * window.devicePixelRatio;
      this.halfWidth = this.canvas.width / 2;
      this.halfHeight = this.canvas.height / 2;

      this.context.setTransform(1, 0, 0, 1, this.halfWidth, this.halfHeight);

      this.radius =
        Math.max(this.canvas.width, this.canvas.height) * Math.SQRT1_2;

      this.context.lineWidth = window.devicePixelRatio;
      this.context.strokeStyle = this.color;
    },
    animation(timestamp) {
      // this.context.clearRect(
      //   -this.halfWidth,
      //   -this.halfHeight,
      //   this.canvas.width,
      //   this.canvas.height,
      // );

      this.context.clearRect(
        -this.radius,
        -this.radius,
        this.radius * 2,
        this.radius * 2,
      );

      this.context.rotate(3e-4);

      const deltaTime = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      this.render(this.context, this.radius, deltaTime);

      this.frame = requestAnimationFrame(this.animation);
    },
  },
};
</script>
