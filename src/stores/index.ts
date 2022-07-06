import type { ObjectType, XenApiRecord } from '@/libs/xen-api';
import { useRecordsStore } from '@/stores/records.store';
import { computed, ref } from 'vue';

type Options<T extends XenApiRecord> = {
  filter?: (record: T) => boolean
  sort?: (record1: T, record2: T) => 1 | 0 | -1
}

export function createRecordContext<T extends XenApiRecord>(objectType: ObjectType, options: Options<T> = {}) {
  let isInitialized = false;
  const isReady = ref(false);

  async function init() {
    if (isInitialized) {
      return;
    }

    isInitialized = true;

    const xapiRecordsStore = useRecordsStore();
    await xapiRecordsStore.loadRecords(objectType);

    isReady.value = true;
  }

  const opaqueRefs = computed<string[]>(() => {
    const xapiRecordsStore = useRecordsStore();
    let opaqueRefs: string[] = Array.from(xapiRecordsStore.getRecordsOpaqueRefs(objectType.toLocaleLowerCase() as Lowercase<ObjectType>));

    if (options.filter) {
      opaqueRefs = opaqueRefs.filter((opaqueRef) => options.filter!(xapiRecordsStore.getRecord(opaqueRef)!));
    }

    if (options.sort) {
      opaqueRefs = opaqueRefs.sort((opaqueRef1, opaqueRef2) => {
        return options.sort!(xapiRecordsStore.getRecord(opaqueRef1)!, xapiRecordsStore.getRecord(opaqueRef2)!);
      });
    }

    return opaqueRefs;
  });

  function getRecord(opaqueRef: string) {
    const xapiRecordsStore = useRecordsStore();
    return xapiRecordsStore.getRecord<T>(opaqueRef);
  }

  function getRecordByUuid(uuid: string) {
    const xapiRecordsStore = useRecordsStore();
    return xapiRecordsStore.getRecordByUuid<T>(uuid);
  }

  return {
    init,
    opaqueRefs,
    getRecord,
    getRecordByUuid,
    isReady,
  };
}
