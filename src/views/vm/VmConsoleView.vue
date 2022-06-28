<script lang="ts" setup>
  import VmConsole from '@/components/VmConsole.vue';
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { computed, ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const xenApiStore = useXenApiStore();
  const vmConsole = ref();

  const vm = computed(() => xenApiStore.vmByRef(<string>route.params.ref));

  watchEffect(async () => {
    if (!vm.value) {
      return;
    }

    const vmConsoleRef = vm.value.consoles[0];

    if (vmConsoleRef) {
      vmConsole.value = await xenApiStore.loadConsole(vmConsoleRef);
    }
  });
</script>

<template>
  <VmConsole v-if="vmConsole" :location="vmConsole.location" />
</template>
