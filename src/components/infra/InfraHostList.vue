<template>
  <ul class="infra-host-list">
    <InfraHostItem
      v-for="host in xenApiStore.hosts"
      :key="host.$ref"
      :host-ref="host.$ref"
    />
  </ul>
</template>

<script lang="ts" setup>
  import InfraHostItem from '@/components/infra/InfraHostItem.vue';
  import { useXenApiStore } from '@/stores/xen-api.store';

  const xenApiStore = useXenApiStore();
</script>
