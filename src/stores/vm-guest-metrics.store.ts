import type { XenApiVmGuestMetrics } from '@/libs/xen-api';
import { createRecordContext } from '@/stores/index';
import { defineStore } from 'pinia';

export const useVmGuestMetricsStore = defineStore(
  'vm-guest-metrics',
  () => createRecordContext<XenApiVmGuestMetrics>('VM_guest_metrics'),
);
