import type { XenApiHostMetrics } from '@/libs/xen-api';
import { createRecordContext } from '@/stores/index';
import { defineStore } from 'pinia';

export const useHostMetricsStore = defineStore(
  'host-metrics',
  () => createRecordContext<XenApiHostMetrics>('host_metrics'),
);
