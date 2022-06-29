<template>
  <RouterLink class="tab-bar-item" v-bind="$props">
    <slot />
  </RouterLink>
</template>

<script lang="ts" setup>
  import type { RouterLinkProps } from 'vue-router';

  // https://vuejs.org/api/sfc-script-setup.html#type-only-props-emit-declarations
  interface Props extends RouterLinkProps {
  }

  defineProps<Props>();
</script>

<style lang="scss" scoped>
  .tab-bar-item {
    font-size: 2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    padding: 0 2.5rem;
    text-decoration: none;
    text-transform: uppercase;
    color: var(--color-blue-scale-100);
    border-bottom: 2px solid transparent;

    &:hover {
      border-bottom-color: var(--color-extra-blue-base);
      background-color: var(--background-color-secondary);
    }

    &:active {
      color: var(--color-extra-blue-base);
      border-bottom-color: var(--color-extra-blue-base);
      background-color: var(--background-color-secondary);
    }

    &.router-link-active {
      color: var(--color-extra-blue-base);
      border-bottom-color: var(--color-extra-blue-base);
      background-color: var(--background-color-primary);
    }
  }
</style>
