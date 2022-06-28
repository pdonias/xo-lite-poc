<template>
  <TitleBar :icon="faBuilding">
    {{ xenApiStore.pool?.name_label }}
  </TitleBar>
</template>

<script setup lang="ts">
  import TitleBar from '@/components/TitleBar.vue';
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { faBuilding } from '@fortawesome/free-regular-svg-icons';

  const xenApiStore = useXenApiStore();
</script>
