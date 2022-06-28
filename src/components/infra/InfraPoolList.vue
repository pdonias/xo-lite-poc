<template>
  <ul class="infra-pool-list">
    <InfraPoolItem />
  </ul>
</template>

<script lang="ts" setup>
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { storeToRefs } from 'pinia';
  import InfraPoolItem from './InfraPoolItem.vue';

  const { pool } = storeToRefs(useXenApiStore());
</script>

<style scoped>
  .infra-pool-list {
    font-size: 1.6rem;
    font-weight: 500;
  }
</style>
