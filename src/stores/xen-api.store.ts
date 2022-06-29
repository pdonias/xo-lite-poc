import XenApi from '@/libs/xen-api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useXenApiStore = defineStore('xen-api', () => {
  const xenApi = new XenApi(import.meta.env.VITE_XO_HOST);
  const currentSessionId = ref();

  async function getXapi() {
    if (!currentSessionId.value) {
      currentSessionId.value = await xenApi.connect(import.meta.env.VITE_XO_USERNAME, import.meta.env.VITE_XO_PASSWORD);
    }

    return xenApi;
  }

  return {
    getXapi,
    currentSessionId,
  };
});
