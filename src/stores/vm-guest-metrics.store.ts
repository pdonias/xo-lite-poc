import { createXenApiCollectionStoreContext } from '@/stores/index';
import { defineStore } from 'pinia';

export const useVmGuestMetricsStore = defineStore(
  'vm-guest-metrics',
  () => createXenApiCollectionStoreContext('VM_guest_metrics'),
);
