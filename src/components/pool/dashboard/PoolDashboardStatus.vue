<template>
  <AppCard>
    <AppTitle type="h4">Status</AppTitle>
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
  const hostMetrics = useHostMetricsStore();
  hostMetrics.loadAll();

  const totalHostsCount = computed(() => hostMetrics.ids.length);
  const activeHostsCount = computed(() => {
    return hostMetrics.ids.filter(id => hostMetrics.getRecord(id)?.live).length;
  });

  const totalVmsCount = computed(() => vmStore.ids.length);
  const activeVmsCount = computed(() => {
    return vmStore.ids
      .filter(vmId => vmStore.getRecord(vmId)!.power_state === 'Running')
      .length;
  });
</script>
