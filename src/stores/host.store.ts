import { sortRecordsByNameLabel } from '@/libs/utils';
import type { XenApiHost } from '@/libs/xen-api';
import { setupXapiCollection } from '@/stores/index';
import { defineStore } from 'pinia';

export const useHostStore = defineStore('host', () => {
  return setupXapiCollection<XenApiHost>('host', {
    sort: sortRecordsByNameLabel,
  });
});
