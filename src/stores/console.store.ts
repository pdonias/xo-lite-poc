import { createXenApiCollectionStoreContext } from '@/stores/index';
import { defineStore } from 'pinia';

export const useConsoleStore = defineStore(
  'console',
  () => createXenApiCollectionStoreContext('console'),
);
