<template>
  <div class="progress-bar">
    <div class="progress-bar-fill" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps({
    value: { type: Number, required: true },
    maxValue: { type: Number, default: 100 },
  });

  const progressWithUnit = computed(() => {
    const progress = Math.round((props.value / props.maxValue) * 100);
    return `${progress}%`;
  });
</script>

<style scoped>
  .progress-bar {
    overflow: hidden;
    height: 1.2rem;
    border-radius: 0.4rem;
    background-color: var(--color-blue-scale-400);
  }

  .progress-bar-fill {
    animation: progress 1s ease-out forwards;
    width: v-bind(progressWithUnit);
    height: 1.2rem;
    background-color: var(--color-extra-blue-d20);
  }

  @keyframes progress {
    0% {
      width: 0;
    }
  }
</style>
