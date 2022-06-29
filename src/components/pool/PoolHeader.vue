<template>
  <TitleBar :icon="faBuilding">
    {{ name }}
  </TitleBar>
</template>

<script setup lang="ts">
  import TitleBar from '@/components/TitleBar.vue';
  import { usePoolStore } from '@/stores/pool.store';
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { faBuilding } from '@fortawesome/free-regular-svg-icons';
  import { computed } from 'vue';

  const poolStore = usePoolStore();
  const name = computed(() => poolStore.pool?.name_label);
</script>
