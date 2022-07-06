<template>
  <ul class="infra-vm-list">
    <template v-if="!isReady">
      <InfraLoadingItem v-for="_ in 3" :icon="faDisplay" />
    </template>
    <InfraVmItem
      v-for="vmOpaqueRef in vmOpaqueRefs"
      :key="vmOpaqueRef"
      :vm-opaque-ref="vmOpaqueRef"
    />
  </ul>
</template>

<script lang="ts" setup>
  import InfraLoadingItem from '@/components/infra/InfraLoadingItem.vue';
  import InfraVmItem from '@/components/infra/InfraVmItem.vue';
  import { useVmStore } from '@/stores/vm.store';
  import { faDisplay } from '@fortawesome/free-solid-svg-icons';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';

  const props = defineProps<{
    hostOpaqueRef?: string
  }>();

  const vmStore = useVmStore();
  const { opaqueRefsByHostRef, isReady } = storeToRefs(vmStore);

  const vmOpaqueRefs = computed(() => opaqueRefsByHostRef.value.get(props.hostOpaqueRef ?? 'OpaqueRef:NULL'));
</script>
