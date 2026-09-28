<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';

import CanvasElement from '../components/canvas-element.vue';
import SourceButton from '../components/source-button.vue';
import { easeInOutQuad, type RenderCallback } from '../const.ts';

useHead({ title: 'Mass' });

const STEPS = 80;
const RAD90 = Math.PI / 2;
const STEP_ANGLE = (Math.PI * 2) / STEPS;
const STEP_ANGLE_CONTROL = Math.PI / STEPS;

const expansion = ref(0);

const cosControlSteps = new Float32Array(STEPS);
const sinControlSteps = new Float32Array(STEPS);
const cosEndSteps = new Float32Array(STEPS);
const sinEndSteps = new Float32Array(STEPS);

let startAngle = 0;

for (let i = 0; i < STEPS; i++) {
  const controlAngle = startAngle + RAD90 + STEP_ANGLE_CONTROL;
  const endAngle = startAngle + Math.PI + STEP_ANGLE;

  cosControlSteps[i] = Math.cos(controlAngle);
  sinControlSteps[i] = Math.sin(controlAngle);
  cosEndSteps[i] = Math.cos(endAngle);
  sinEndSteps[i] = Math.sin(endAngle);

  startAngle = endAngle;
}

const render: RenderCallback = (context, radius, deltaTime) => {
  const radiusInner = radius * 0.15;

  const oscillation = easeInOutQuad(
    expansion.value <= 1 ? expansion.value : 2 - expansion.value,
  );
  const offset = (6 - oscillation) * radiusInner;

  context.beginPath();

  context.moveTo(radius, 0);

  for (let i = 0; i < STEPS; i++) {
    context.quadraticCurveTo(
      cosControlSteps[i] * offset,
      sinControlSteps[i] * offset,
      cosEndSteps[i] * radius,
      sinEndSteps[i] * radius,
    );
  }

  context.stroke();

  expansion.value = (expansion.value + 2e-4 * deltaTime) % 2;
};
</script>

<template>
  <CanvasElement :render="render" color="#f00" />
  <main>
    <h1>Mass</h1>

    <SourceButton href="/blob/master/src/pages/mass-page.vue" />
  </main>
</template>

<style lang="scss" scoped>
.button {
  @media (hover: hover) {
    &:hover {
      color: #f00;
    }
  }

  &:active {
    color: #c00;
  }
}
</style>
