<template>
  <li v-if="xenApiStore.pool" class="infra-pool-item">
    <InfraItemLabel
      :icon="faBuilding"
      :route="{ name: 'pool.dashboard', params: { ref: xenApiStore.pool.$ref } }"
      current
    >
      {{ xenApiStore.pool.name_label }}
    </InfraItemLabel>

    <InfraHostList />

    <InfraVmList />
  </li>
</template>

<script lang="ts" setup>
  import InfraHostList from '@/components/infra/InfraHostList.vue';
  import InfraItemLabel from '@/components/infra/InfraItemLabel.vue';
  import InfraVmList from '@/components/infra/InfraVmList.vue';
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { faBuilding } from '@fortawesome/free-regular-svg-icons';

  const xenApiStore = useXenApiStore();
</script>

<style lang="scss" scoped>
  .infra-vm-list:deep(.link) {
    padding-left: 3rem;
  }
</style>
