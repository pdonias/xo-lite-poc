import type { XenApiConsole } from '@/libs/xen-api';
import { createRecordContext } from '@/stores/index';
import { defineStore } from 'pinia';

export const useConsoleStore = defineStore(
  'console',
  () => createRecordContext<XenApiConsole>('console'),
);
