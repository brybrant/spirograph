<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';

import CanvasElement from '../components/canvas-element.vue';
import SourceButton from '../components/source-button.vue';
import { easeInOutQuad, type RenderCallback } from '../const.ts';

useHead({ title: 'Light' });

const STEPS = 96;
const RAD20 = Math.PI / 9;
const STEP_ANGLE = Math.PI / (STEPS / 2);

const COS_STEPS = new Float32Array(STEPS);
const SIN_STEPS = new Float32Array(STEPS);

for (let i = 0; i < STEPS; i++) {
  const angle = i * STEP_ANGLE;

  COS_STEPS[i] = Math.cos(angle);
  SIN_STEPS[i] = Math.sin(angle);
}

const reflection = ref(0);

const render: RenderCallback = (context, radius, deltaTime) => {
  const radiusInner = radius * 0.35;

  const oscillation = easeInOutQuad(
    reflection.value <= 1 ? reflection.value : 2 - reflection.value,
  );
  const offset = (1.5 + oscillation) * RAD20;
  const cosOffset = Math.cos(offset);
  const sinOffset = Math.sin(offset);

  context.beginPath();

  for (let i = 0; i < STEPS; i++) {
    const stepCos = COS_STEPS[i];
    const stepSin = SIN_STEPS[i];

    context.moveTo(
      (stepCos * cosOffset + stepSin * sinOffset) * radius,
      (stepSin * cosOffset - stepCos * sinOffset) * radius,
    );
    context.lineTo(stepCos * radiusInner, stepSin * radiusInner);
    context.lineTo(
      (stepCos * cosOffset - stepSin * sinOffset) * radius,
      (stepSin * cosOffset + stepCos * sinOffset) * radius,
    );
  }

  context.stroke();

  reflection.value = (reflection.value + 15e-5 * deltaTime) % 2;
};
</script>

<template>
  <CanvasElement :render="render" color="#ff0" />
  <main>
    <h1>Light</h1>

    <SourceButton href="/blob/master/src/pages/light-page.vue" />
  </main>
</template>

<style lang="scss" scoped>
.button {
  @media (hover: hover) {
    &:hover {
      color: #ff0;
    }
  }

  &:active {
    color: #bb0;
  }
}
</style>
