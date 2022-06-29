import { sortRecordsByNameLabel } from '@/libs/utils';
import type { XenApiHost, XenApiHostMetric } from '@/libs/xen-api';
import { setupXapiCollection } from '@/stores/index';
import { defineStore } from 'pinia';

export const useHostMetricsStore = defineStore('host-metrics', () => {
  return setupXapiCollection<XenApiHostMetric>('host_metrics', );
});
