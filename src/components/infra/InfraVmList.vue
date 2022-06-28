<template>
  <ul class="infra-vm-list">
    <InfraVmItem
      v-for="vm in vms"
      :key="vm.$ref"
      :vm-ref="vm.$ref"
    />
  </ul>
</template>

<script lang="ts" setup>
  import InfraVmItem from '@/components/infra/InfraVmItem.vue';
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { computed } from 'vue';

  const props = defineProps<{
    hostRef?: string
  }>();

  const xenApiStore = useXenApiStore();
  const vms = computed(() => xenApiStore.vmsByHostRef(props.hostRef ?? 'OpaqueRef:NULL'));
</script>
