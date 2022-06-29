<template>
  <div v-if="isLoading">
    Loading...
  </div>
  <div v-else-if="!isVmRunning">
    Console is only available for running VMs.
  </div>
  <RemoteConsole v-else-if="vmConsole" :location="vmConsole.location" />
</template>

<script lang="ts" setup>
  import RemoteConsole from '@/components/RemoteConsole.vue';
  import { useConsoleStore } from '@/stores/console.store';
  import { useVmStore } from '@/stores/vm.store';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const vmStore = useVmStore();
  const consoleStore = useConsoleStore();

  const isLoading = computed(() => vmStore.isLoading || consoleStore.isLoading);

  const vm = computed(() => vmStore.getRecord(<string>route.params.id));
  const isVmRunning = computed(() => vm.value?.power_state === 'Running');

  const vmConsole = computed(() => {
    const consoleId = vm.value?.consoles[0];

    if (!consoleId) {
      return;
    }

    return consoleStore.getRecord(consoleId);
  });
</script>
