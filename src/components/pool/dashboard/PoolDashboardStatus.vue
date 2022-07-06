<template>
  <AppCard>
    <AppTitle type="h4">Status</AppTitle>
    <template v-if="isReady">
      <PoolDashboardStatusItem
        :active="activeHostsCount"
        :total="totalHostsCount"
        label="Hosts"
      />
      <AppSeparator />
      <PoolDashboardStatusItem
        :active="activeVmsCount"
        :total="totalVmsCount"
        label="VMs"
      />
    </template>
  </AppCard>
</template>

<script lang="ts" setup>
  import AppCard from '@/components/AppCard.vue';
  import AppSeparator from '@/components/AppSeparator.vue';
  import AppTitle from '@/components/AppTitle.vue';
  import PoolDashboardStatusItem from '@/components/pool/dashboard/PoolDashboardStatusItem.vue';
  import { useHostMetricsStore } from '@/stores/host-metrics.store';
  import { useVmStore } from '@/stores/vm.store';
  import { computed } from 'vue';

  const vmStore = useVmStore();
  const hostMetricsStore = useHostMetricsStore();

  const isReady = computed(() => vmStore.isReady && hostMetricsStore.isReady);

  const totalHostsCount = computed(() => hostMetricsStore.opaqueRefs.length);
  const activeHostsCount = computed(() => {
    return hostMetricsStore.opaqueRefs.filter(opaqueRef => hostMetricsStore.getRecord(opaqueRef)?.live).length;
  });

  const totalVmsCount = computed(() => vmStore.opaqueRefs.length);
  const activeVmsCount = computed(() => {
    return vmStore.opaqueRefs
      .filter(opaqueRef => vmStore.getRecord(opaqueRef)!.power_state === 'Running')
      .length;
  });
</script>
