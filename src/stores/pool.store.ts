import type { XenApiPool } from '@/libs/xen-api';
import { createXenApiCollectionStoreContext } from '@/stores/index';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const usePoolStore = defineStore('pool', () => {
  const {
    init,
    ids,
    getRecord,
    isLoading,
    isReady,
  } = createXenApiCollectionStoreContext<XenApiPool>('pool');

  const poolId = computed(() => ids.value[0]);
  const pool = computed(() => getRecord(poolId.value));

  return {
    init,
    pool,
    poolId,
    isLoading,
    isReady,
  };
});
