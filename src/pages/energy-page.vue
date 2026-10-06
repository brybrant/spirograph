<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';

import CanvasElement from '../components/canvas-element.vue';
import SourceButton from '../components/source-button.vue';
import type { RenderCallback } from '../const.ts';

useHead({ title: 'Energy' });

const STEPS = 192;
const RAD360 = Math.PI * 2;
const DIVISOR = 14;
const DIVISOR_CONTROL = DIVISOR / 2;

const STEP_ANGLE = Math.PI / (STEPS / 2);
const STEP_MOD = Math.PI / (STEPS / DIVISOR_CONTROL / 2);

const COS_CONTROL_STEPS = new Float32Array(STEPS);
const SIN_CONTROL_STEPS = new Float32Array(STEPS);
const COS_END_STEPS = new Float32Array(STEPS);
const SIN_END_STEPS = new Float32Array(STEPS);

let startAngle = 0;

for (let i = 0; i < STEPS; i++) {
  const controlAngle = startAngle + STEP_ANGLE * DIVISOR_CONTROL;
  const endAngle = startAngle + STEP_ANGLE * DIVISOR;

  COS_CONTROL_STEPS[i] = Math.cos(controlAngle);
  SIN_CONTROL_STEPS[i] = Math.sin(controlAngle);
  COS_END_STEPS[i] = Math.cos(endAngle);
  SIN_END_STEPS[i] = Math.sin(endAngle);

  startAngle = endAngle;
}

const twist = ref(0);

const render: RenderCallback = (context, radius, deltaTime) => {
  const radiusInner = radius * 0.32;

  context.beginPath();

  context.moveTo(radius, 0);

  for (let i = 0; i < STEPS; i++) {
    const offset = (0.25 + Math.cos(twist.value + i * STEP_MOD)) * radiusInner;

    context.quadraticCurveTo(
      COS_CONTROL_STEPS[i] * offset,
      SIN_CONTROL_STEPS[i] * offset,
      COS_END_STEPS[i] * radius,
      SIN_END_STEPS[i] * radius,
    );
  }

  context.stroke();

  twist.value = (twist.value + 3e-4 * deltaTime) % RAD360;
};
</script>

<template>
  <CanvasElement :render="render" color="#0ff" />
  <main>
    <h1>Energy</h1>

    <SourceButton href="/blob/master/src/pages/energy-page.vue" />
  </main>
</template>

<style lang="scss" scoped>
.button {
  @media (hover: hover) {
    &:hover {
      color: #0ff;
    }
  }

  &:active {
    color: #0bb;
  }
}
</style>
