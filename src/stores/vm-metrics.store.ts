import { setupXapiCollection } from '@/stores/index';
import { defineStore } from 'pinia';

export const useVmMetricsStore = defineStore('vm-metrics', () => {
  return setupXapiCollection('VM_metrics')
})
