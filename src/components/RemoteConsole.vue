<template>
  <div ref="vmConsoleContainer" class="vm-console" />
</template>

<script lang="ts" setup>
  import { useXenApiStore } from '@/stores/xen-api.store';
  import VncClient from '@novnc/novnc/core/rfb';
  import { onBeforeUnmount, ref, watchEffect } from 'vue';

  const props = defineProps<{
    location: string
  }>();

  const vmConsoleContainer = ref<HTMLDivElement>();
  const xenApiStore = useXenApiStore();
  let vncClient: VncClient | undefined;

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

  onBeforeUnmount(() => {
    vncClient?.disconnect()
  })
</script>

<style scoped>
  .vm-console {
    height: 80rem;

    & > :deep(div) {
      background-color: transparent !important;
    }
  }
</style>
