import { createXenApiCollectionStoreContext } from '@/stores/index';
import { defineStore } from 'pinia';

export const useVmMetricsStore = defineStore(
  'vm-metrics',
  () => createXenApiCollectionStoreContext('VM_metrics'),
);
