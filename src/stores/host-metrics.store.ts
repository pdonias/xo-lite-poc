import type { XenApiHostMetric } from '@/libs/xen-api';
import { createXenApiCollectionStoreContext } from '@/stores/index';
import { defineStore } from 'pinia';

export const useHostMetricsStore = defineStore(
  'host-metrics',
  () => createXenApiCollectionStoreContext<XenApiHostMetric>('host_metrics'),
);
