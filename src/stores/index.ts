import type { ObjectType } from '@/libs/xen-api';
import { useXenApiStore } from '@/stores/xen-api.store';
import { computed, ref } from 'vue';

type Options<T> = {
  filter?: (entry: T) => boolean
  sort?: (entry1: T, entry2: T) => 1 | 0 | -1
}

export function createXenApiCollectionStoreContext<T>(objectType: ObjectType, options: Options<T> = {}) {
  let isInitialized = false;

  const records = ref<Map<string, T>>(new Map());
  const isLoading = ref(false);
  const isReady = ref(false);

  const ids = computed<string[]>(() => {
    let ids: string[] = Array.from(records.value.keys());

    if (options.sort) {
      ids = ids.sort((id1, id2) => options.sort!(records.value.get(id1)!, records.value.get(id2)!));
    }

    if (options.filter) {
      ids = ids.filter((id) => options.filter!(records.value.get(id)!));
    }

    return ids;
  });

  const getRecord = (id: string) => records.value.get(id);

  async function init() {
    if (isInitialized) {
      return;
    }

    isInitialized = true;

    isLoading.value = true;

    const xenApiStore = useXenApiStore();
    const xapi = await xenApiStore.getXapi();
    records.value = await xapi.loadRecords<T>(objectType);
    isLoading.value = false;
    isReady.value = true;
  }

  return {
    init,
    ids,
    getRecord,
    isLoading,
    isReady,
  };
}
