<template>
  <AppCard>
    <AppTitle type="h4">Status</AppTitle>
    <PoolDashboardStatusItem
      :active="xenApiStore.activeHostsCount"
      :total="xenApiStore.totalHostsCount"
      label="Hosts"
    />
    <AppSeparator />
    <PoolDashboardStatusItem
      :active="xenApiStore.activeVmsCount"
      :total="xenApiStore.totalVmsCount"
      label="VMs"
    />
  </AppCard>
</template>

<script lang="ts" setup>
  import AppCard from '@/components/AppCard.vue';
  import AppSeparator from '@/components/AppSeparator.vue';
  import AppTitle from '@/components/AppTitle.vue';
  import PoolDashboardStatusItem from '@/components/pool/dashboard/PoolDashboardStatusItem.vue';
  import { useXenApiStore } from '@/stores/xen-api.store';

  const xenApiStore = useXenApiStore();
</script>
