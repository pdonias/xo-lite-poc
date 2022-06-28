<template>
  <div v-if="xenApiStore.pool" class="pool-dashboard-view">
    <PoolDashboardStatus class="item" />

    <AppCard style="min-width: 40rem">
      <AppTitle type="h4">Storage usage</AppTitle>
      <ProgressBar :value="65" style="margin: 1rem 0" />
      <ProgressBar :value="50" style="margin: 1rem 0" />
      <ProgressBar :value="40" style="margin: 1rem 0" />
      <ProgressBar :value="22" style="margin: 1rem 0" />
    </AppCard>

    <AppCard>
      <AppBadge>38/64 GB</AppBadge>
    </AppCard>
  </div>
</template>

<script lang="ts" setup>
  import AppBadge from '@/components/AppBadge.vue';
  import AppCard from '@/components/AppCard.vue';
  import AppTitle from '@/components/AppTitle.vue';
  import PoolDashboardStatus from '@/components/pool/dashboard/PoolDashboardStatus.vue';
  import ProgressBar from '@/components/ProgressBar.vue';
  import { useXenApiStore } from '@/stores/xen-api.store';

  const xenApiStore = useXenApiStore();
</script>

<style scoped>
  .pool-dashboard-view {
    display: flex;
    gap: 2rem;
    padding: 2rem;
  }

  .item {
    min-width: 37rem;
  }
</style>
