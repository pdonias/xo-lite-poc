import type { XenApiVmMetrics } from '@/libs/xen-api';
import { createRecordContext } from '@/stores/index';
import { defineStore } from 'pinia';

export const useVmMetricsStore = defineStore(
  'vm-metrics',
  () => createRecordContext<XenApiVmMetrics>('VM_metrics'),
);
