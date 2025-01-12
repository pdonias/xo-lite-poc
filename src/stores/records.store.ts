import type { ObjectType, XenApiRecord } from '@/libs/xen-api';
import { useXenApiStore } from '@/stores/xen-api.store';
import { defineStore } from 'pinia';
import { reactive, shallowReactive } from 'vue';

export const useRecordsStore = defineStore('records', () => {
  const recordsByOpaqueRef = shallowReactive<Map<string, XenApiRecord>>(new Map());
  const opaqueRefsByObjectType = reactive<Map<Lowercase<ObjectType>, Set<string>>>(new Map());
  const uuidToOpaqueRefMapping = reactive<Map<string, string>>(new Map());

  async function loadRecords<T extends XenApiRecord>(objectType: ObjectType) {
    const xenApiStore = useXenApiStore();

    const xapi = await xenApiStore.getXapi();

    const loadedRecords = await xapi.loadRecords<T>(objectType);

    const lowercaseObjectType = objectType.toLocaleLowerCase() as Lowercase<ObjectType>;

    if (!opaqueRefsByObjectType.has(lowercaseObjectType)) {
      opaqueRefsByObjectType.set(lowercaseObjectType, new Set());
    }

    const opaqueRefs = opaqueRefsByObjectType.get(lowercaseObjectType)!;

    for (const [opaqueRef, record] of loadedRecords) {
      recordsByOpaqueRef.set(opaqueRef, record);
      opaqueRefs.add(opaqueRef);
      uuidToOpaqueRefMapping.set(record.uuid, opaqueRef);
    }
  }

  function addOrReplaceRecord<T extends XenApiRecord>(objectType: Lowercase<ObjectType>, opaqueRef: string, record: T) {
    recordsByOpaqueRef.set(opaqueRef, record);
    opaqueRefsByObjectType.get(objectType)?.add(opaqueRef);
    uuidToOpaqueRefMapping.set(record.uuid, opaqueRef);
  }

  function removeRecord(objectType: Lowercase<ObjectType>, opaqueRef: string) {
    recordsByOpaqueRef.delete(opaqueRef);
    opaqueRefsByObjectType.get(objectType)?.delete((opaqueRef));

    for (const [currentUuid, currentOpaqueRef] of uuidToOpaqueRefMapping) {
      if (currentOpaqueRef === opaqueRef) {
        uuidToOpaqueRefMapping.delete(currentUuid);
        return;
      }
    }
  }

  function getRecord<T extends XenApiRecord>(opaqueRef: string): T | undefined {
    return recordsByOpaqueRef.get(opaqueRef) as T;
  }

  function getRecordByUuid<T extends XenApiRecord>(uuid: string): T | undefined {
    const opaqueRef = uuidToOpaqueRefMapping.get(uuid);

    if (opaqueRef) {
      return recordsByOpaqueRef.get(opaqueRef) as T;
    }
  }

  function getRecordsOpaqueRefs(objectType: Lowercase<ObjectType>) {
    return opaqueRefsByObjectType.get(objectType) || new Set();
  }

  return {
    loadRecords,
    addOrReplaceRecord,
    removeRecord,
    getRecord,
    getRecordsOpaqueRefs,
    getRecordByUuid,
  };
});
