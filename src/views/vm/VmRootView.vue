<template>
  <RouterView />
</template>

<script lang="ts" setup>
  import { useUiStore } from '@/stores/ui.store';
  import { useVmStore } from '@/stores/vm.store';
  import { watchEffect } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const vmStore = useVmStore();
  const uiStore = useUiStore();

  watchEffect(() => {
    const vm = vmStore.getRecord(<string>route.params.id);
    uiStore.currentHostId = vm?.resident_on;
  });
</script>
