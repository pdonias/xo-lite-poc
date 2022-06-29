import { setupXapiCollection } from '@/stores/index';
import { defineStore } from 'pinia';

export const useVmGuestMetricsStore = defineStore('vm-guest-metrics', () => {
  return setupXapiCollection('VM_guest_metrics')
})
