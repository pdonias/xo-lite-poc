<template>
  <div ref="vmConsoleContainer" class="vm-console" />
</template>

<script lang="ts" setup>
  import { useXenApiStore } from '@/stores/xen-api.store';
  import VncClient from '@novnc/novnc/core/rfb';
  import { ref, watchEffect } from 'vue';

  const props = defineProps({
    location: { type: String, required: true },
  });

  const vmConsoleContainer = ref<Element>();
  const xenApiStore = useXenApiStore();
  let vncClient: VncClient;

  watchEffect(() => {
    if (!vmConsoleContainer.value || !xenApiStore.currentSessionId) {
      return;
    }

    if (vncClient) {
      vncClient.disconnect();
      vncClient = undefined;
    }

    const url = new URL(props.location);
    url.protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    url.searchParams.set('session_id', xenApiStore.currentSessionId);

    vncClient = new VncClient(vmConsoleContainer.value, url.toString(), {
      wsProtocols: ['binary'],
    });

    vncClient.scaleViewport = true;
  });
</script>

<style scoped lang="scss">
  .vm-console {
    height: 80rem;

    &:deep(> div) {
      background-color: transparent !important;
    }
  }
</style>
