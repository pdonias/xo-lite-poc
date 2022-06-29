import { sortRecordsByNameLabel } from '@/libs/utils';
import { createXenApiCollectionStoreContext } from '@/stores/index';
import { defineStore } from 'pinia';

export const useHostStore = defineStore(
  'host',
  () => createXenApiCollectionStoreContext('host', { sort: sortRecordsByNameLabel }),
);
