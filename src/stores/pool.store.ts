import type { XenApiPool } from '@/libs/xen-api';
import { setupXapiCollection } from '@/stores/index';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const usePoolStore = defineStore('pool', () => {
  const {
    ids,
    getRecord,
    loadAll: load,
    isLoading,
  } = setupXapiCollection<XenApiPool>('pool');

  const poolId = computed(() => ids.value[0]);
  const pool = computed(() => getRecord(poolId.value));

  return {
    pool,
    poolId,
    load,
    isLoading,
  };
});
