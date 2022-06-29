<template>
  <ul class="infra-pool-list">
    <InfraLoadingItem v-if="isLoading" :icon="faBuilding" />
    <li v-else-if="poolId" class="infra-pool-item">
      <InfraItemLabel
        :icon="faBuilding"
        :route="{ name: 'pool.dashboard', params: { id: poolId } }"
        current
      >
        {{ pool.name_label }}
      </InfraItemLabel>

      <InfraHostList />

      <InfraVmList />
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import InfraHostList from '@/components/infra/InfraHostList.vue';
  import InfraItemLabel from '@/components/infra/InfraItemLabel.vue';
  import InfraLoadingItem from '@/components/infra/InfraLoadingItem.vue';
  import InfraVmList from '@/components/infra/InfraVmList.vue';
  import { usePoolStore } from '@/stores/pool.store';
  import { faBuilding } from '@fortawesome/free-regular-svg-icons';
  import { storeToRefs } from 'pinia';

  const poolStore = usePoolStore();
  const { pool, poolId, isLoading } = storeToRefs(poolStore);

  poolStore.load();
</script>

<style scoped>
  .infra-pool-list {
    font-size: 1.6rem;
    font-weight: 500;
  }

  .infra-vm-list:deep(.link) {
    padding-left: 3rem;
  }
</style>
