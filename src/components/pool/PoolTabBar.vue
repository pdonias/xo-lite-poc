<template>
  <TabBar>
    <TabBarItem :to="{ name: 'pool.dashboard', params: { ref: 'OpaqueRef:1c3f19c8-f80a-464d-9c48-a2c19d4e4fc3' } }">Dashboard</TabBarItem>
    <TabBarItem :to="{ name: 'pool.alarms' }">Alarms</TabBarItem>
    <TabBarItem :to="{ name: 'pool.stats' }">Stats</TabBarItem>
    <TabBarItem :to="{ name: 'pool.system' }">System</TabBarItem>
    <TabBarItem :to="{ name: 'pool.network' }">Network</TabBarItem>
    <TabBarItem :to="{ name: 'pool.storage' }">Storage</TabBarItem>
    <TabBarItem :to="{ name: 'pool.tasks' }">Tasks</TabBarItem>
    <TabBarItem :to="{ name: 'pool.hosts' }">Hosts</TabBarItem>
    <TabBarItem :to="{ name: 'pool.vms' }">VMs</TabBarItem>
  </TabBar>
</template>

<script lang="ts" setup>
  import TabBar from '@/components/TabBar.vue';
  import TabBarItem from '@/components/TabBarItem.vue';
</script>
