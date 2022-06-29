<template>
  <TabBar v-if="poolId">
    <TabBarItem :to="{ name: 'pool.dashboard', params: { id: poolId } }">Dashboard</TabBarItem>
    <TabBarItem :to="{ name: 'pool.alarms', params: { id: poolId } }">Alarms</TabBarItem>
    <TabBarItem :to="{ name: 'pool.stats', params: { id: poolId } }">Stats</TabBarItem>
    <TabBarItem :to="{ name: 'pool.system', params: { id: poolId } }">System</TabBarItem>
    <TabBarItem :to="{ name: 'pool.network', params: { id: poolId } }">Network</TabBarItem>
    <TabBarItem :to="{ name: 'pool.storage', params: { id: poolId } }">Storage</TabBarItem>
    <TabBarItem :to="{ name: 'pool.tasks', params: { id: poolId } }">Tasks</TabBarItem>
    <TabBarItem :to="{ name: 'pool.hosts', params: { id: poolId } }">Hosts</TabBarItem>
    <TabBarItem :to="{ name: 'pool.vms', params: { id: poolId } }">VMs</TabBarItem>
  </TabBar>
</template>

<script lang="ts" setup>
  import TabBar from '@/components/TabBar.vue';
  import TabBarItem from '@/components/TabBarItem.vue';
  import { usePoolStore } from '@/stores/pool.store';
  import { storeToRefs } from 'pinia';

  const poolStore = usePoolStore();
  const { poolId } = storeToRefs(poolStore);
</script>
