<template>
  <RouterView />
</template>

<script lang="ts" setup>
  import { useUiStore } from '@/stores/ui.store';
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { watchEffect } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const xenApiStore = useXenApiStore();
  const uiStore = useUiStore();

  watchEffect(() => {
    const vm = xenApiStore.vmByRef(<string>route.params.ref);
    uiStore.currentHostRef = vm?.resident_on;
  });
</script>
