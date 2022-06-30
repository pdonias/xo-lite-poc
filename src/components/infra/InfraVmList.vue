<template>
  <ul class="infra-vm-list">
    <template v-if="isLoading">
      <InfraLoadingItem v-for="_ in 3" :icon="faDisplay" />
    </template>
    <InfraVmItem
      v-for="vmId in vmIds"
      :key="vmId"
      :vm-id="vmId"
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
    hostId?: string
  }>();

  const vmStore = useVmStore();
  const { idsByHost, isLoading } = storeToRefs(vmStore);

  const vmIds = computed(() => idsByHost.value.get(props.hostId ?? 'OpaqueRef:NULL'));
</script>
