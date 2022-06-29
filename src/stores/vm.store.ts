import { sortRecordsByNameLabel } from '@/libs/utils';
import type { XenApiVm } from '@/libs/xen-api';
import { setupXapiCollection } from '@/stores/index';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useVmStore = defineStore('vm', () => {
  const setup = setupXapiCollection<XenApiVm>('VM', {
    filter: (vm) => !vm.is_a_snapshot && !vm.is_a_template && !vm.is_control_domain,
    sort: sortRecordsByNameLabel,
  });

  const idsByHost = computed(() => {
    const collection = new Map<string, string[]>();

    setup.ids.value.forEach((id) => {
      const vm = setup.getRecord(id)!;

      if (!collection.has(vm.resident_on)) {
        collection.set(vm.resident_on, []);
      }

      collection.get(vm.resident_on)!.push(id);
    });

    return collection;
  });

  return {
    ...setup,
    idsByHost,
  };
});
