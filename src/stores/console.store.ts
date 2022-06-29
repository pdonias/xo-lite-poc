import type { XenApiConsole } from '@/libs/xen-api';
import { setupXapiCollection } from '@/stores/index';
import { defineStore } from 'pinia';

export const useConsoleStore = defineStore('console', () => {
  return setupXapiCollection<XenApiConsole>('console');
});
