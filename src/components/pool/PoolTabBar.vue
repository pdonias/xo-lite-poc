<template>
  <TabBar>
    <TabBarItem :disabled="!isReady" :to="{ name: 'pool.dashboard', params: { id: poolId } }">Dashboard</TabBarItem>
    <TabBarItem :disabled="!isReady" :to="{ name: 'pool.alarms', params: { id: poolId } }">Alarms</TabBarItem>
    <TabBarItem :disabled="!isReady" :to="{ name: 'pool.stats', params: { id: poolId } }">Stats</TabBarItem>
    <TabBarItem :disabled="!isReady" :to="{ name: 'pool.system', params: { id: poolId } }">System</TabBarItem>
    <TabBarItem :disabled="!isReady" :to="{ name: 'pool.network', params: { id: poolId } }">Network</TabBarItem>
    <TabBarItem :disabled="!isReady" :to="{ name: 'pool.storage', params: { id: poolId } }">Storage</TabBarItem>
    <TabBarItem :disabled="!isReady" :to="{ name: 'pool.tasks', params: { id: poolId } }">Tasks</TabBarItem>
    <TabBarItem :disabled="!isReady" :to="{ name: 'pool.hosts', params: { id: poolId } }">Hosts</TabBarItem>
    <TabBarItem :disabled="!isReady" :to="{ name: 'pool.vms', params: { id: poolId } }">VMs</TabBarItem>
  </TabBar>
</template>

<script lang="ts" setup>
  import TabBar from '@/components/TabBar.vue';
  import TabBarItem from '@/components/TabBarItem.vue';
  import { usePoolStore } from '@/stores/pool.store';
  import { storeToRefs } from 'pinia';

  const poolStore = usePoolStore();
  const { poolId, isReady } = storeToRefs(poolStore);
</script>
