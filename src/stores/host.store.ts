import { sortRecordsByNameLabel } from '@/libs/utils';
import type { XenApiHost } from '@/libs/xen-api';
import { createRecordContext } from '@/stores/index';
import { defineStore } from 'pinia';

export const useHostStore = defineStore(
  'host',
  () => createRecordContext<XenApiHost>('host', { sort: sortRecordsByNameLabel }),
);
