import { sortRecordsByNameLabel } from '@/libs/utils';
import type { XenApiVm } from '@/libs/xen-api';
import { createXenApiCollectionStoreContext } from '@/stores/index';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useVmStore = defineStore('vm', () => {
  const baseContext = createXenApiCollectionStoreContext<XenApiVm>(
    'VM',
    {
      filter: (vm) => !vm.is_a_snapshot && !vm.is_a_template && !vm.is_control_domain,
      sort: sortRecordsByNameLabel,
    },
  );

  const idsByHost = computed(() => {
    const collection = new Map<string, string[]>();

    baseContext.ids.value.forEach((id) => {
      const vm = baseContext.getRecord(id)!;

      if (!collection.has(vm.resident_on)) {
        collection.set(vm.resident_on, []);
      }

      collection.get(vm.resident_on)!.push(id);
    });

    return collection;
  });

  return {
    ...baseContext,
    idsByHost,
  };
});
