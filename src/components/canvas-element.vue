<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import type { PropType } from 'vue';

import type { RenderCallback } from '../const.ts';

const props = defineProps({
  render: {
    type: Function as PropType<RenderCallback>,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
const context = ref<CanvasRenderingContext2D | null>(null);
const pixelRatio = ref(window.devicePixelRatio);
const width = ref(document.documentElement.getBoundingClientRect().width);
const height = ref(document.documentElement.getBoundingClientRect().height);
const widthDPR = computed(() => Math.round(width.value * pixelRatio.value));
const heightDPR = computed(() => Math.round(height.value * pixelRatio.value));
const midX = computed(() => widthDPR.value / 2);
const midY = computed(() => heightDPR.value / 2);
const radius = computed(() => {
  return Math.max(widthDPR.value, heightDPR.value) * Math.SQRT1_2;
});
const diameter = computed(() => radius.value * 2);
const lastTimestamp = ref(performance.now());
const frame = ref(0);

const resize = () => {
  if (!canvas.value || !context.value) return;

  width.value = document.documentElement.getBoundingClientRect().width;
  height.value = document.documentElement.getBoundingClientRect().height;

  canvas.value.width = widthDPR.value;
  canvas.value.height = heightDPR.value;

  context.value.strokeStyle = props.color;
  context.value.setTransform(1, 0, 0, 1, midX.value, midY.value);
  context.value.lineWidth = 2;
};

let resizeFrame: number | null = null;

const scheduleResize = () => {
  if (resizeFrame) return;

  resizeFrame = window.requestAnimationFrame(() => {
    resizeFrame = null;
    resize();
  });
};

const animation = (timestamp: number) => {
  if (!context.value) return;

  const deltaTime = timestamp - lastTimestamp.value;
  lastTimestamp.value = timestamp;

  context.value.clearRect(
    -radius.value,
    -radius.value,
    diameter.value,
    diameter.value,
  );

  context.value.rotate(2e-5 * deltaTime);

  props.render(context.value, radius.value, deltaTime);

  frame.value = window.requestAnimationFrame(animation);
};

let removeMediaQuery = () => {};

onMounted(() => {
  if (!canvas.value) return;

  context.value = canvas.value.getContext('2d', { alpha: false });

  if (!context.value) return;

  const updatePixelRatio = () => {
    removeMediaQuery();

    const mediaQuery = `(resolution: ${window.devicePixelRatio}x)`;
    const media = window.matchMedia(mediaQuery);

    media.addEventListener('change', updatePixelRatio);

    removeMediaQuery = () => {
      media.removeEventListener('change', updatePixelRatio);
    };

    pixelRatio.value = window.devicePixelRatio;

    scheduleResize();
  };

  updatePixelRatio();

  window.addEventListener('resize', scheduleResize);

  frame.value = window.requestAnimationFrame(animation);
});

onUnmounted(() => {
  removeMediaQuery();

  window.removeEventListener('resize', scheduleResize);

  window.cancelAnimationFrame(frame.value);
});
</script>

<template>
  <canvas ref="canvas" />
</template>
