<template>
  <div v-if="!isReady">
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
  import { computed, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const vmStore = useVmStore();
  const consoleStore = useConsoleStore();

  const isReady = computed(() => vmStore.isReady || consoleStore.isReady);

  const vm = computed(() => vmStore.getRecordByUuid(<string>route.params.uuid));
  const isVmRunning = computed(() => vm.value?.power_state === 'Running');

  const vmConsole = computed(() => {
    const consoleOpaqueRef = vm.value?.consoles[0];

    if (!consoleOpaqueRef) {
      return;
    }

    return consoleStore.getRecord(consoleOpaqueRef);
  });
</script>
