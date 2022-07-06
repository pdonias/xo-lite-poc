import type { XenApiPool } from '@/libs/xen-api';
import { createRecordContext } from '@/stores/index';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const usePoolStore = defineStore('pool', () => {
  const {
    init,
    opaqueRefs,
    getRecord,
    isReady,
  } = createRecordContext<XenApiPool>('pool');

  const poolOpaqueRef = computed(() => opaqueRefs.value[0]);
  const pool = computed(() => getRecord(poolOpaqueRef.value));

  return {
    init,
    pool,
    poolOpaqueRef,
    isReady,
  };
});
