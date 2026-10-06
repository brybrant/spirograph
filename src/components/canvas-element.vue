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
const width = ref(1920);
const height = ref(1080);
const widthDPR = computed(() => Math.round(width.value * window.devicePixelRatio));
const heightDPR = computed(() => Math.round(height.value * window.devicePixelRatio));
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

  const rect = document.documentElement.getBoundingClientRect();

  width.value = rect.width;
  height.value = rect.height;

  canvas.value.width = widthDPR.value;
  canvas.value.height = heightDPR.value;

  context.value.strokeStyle = props.color;
  context.value.setTransform(1, 0, 0, 1, midX.value, midY.value);
  context.value.lineWidth = 2;
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

onMounted(() => {
  if (!canvas.value) return;

  context.value = canvas.value.getContext('2d', { alpha: false });

  if (!context.value) return;

  resize();

  window.addEventListener('resize', resize);

  frame.value = window.requestAnimationFrame(animation);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);

  window.cancelAnimationFrame(frame.value);
});
</script>

<template>
  <canvas ref="canvas" />
</template>
