import XenApi from '@/libs/xen-api';
import { useConsoleStore } from '@/stores/console.store';
import { useHostMetricsStore } from '@/stores/host-metrics.store';
import { useHostStore } from '@/stores/host.store';
import { usePoolStore } from '@/stores/pool.store';
import { useVmGuestMetricsStore } from '@/stores/vm-guest-metrics.store';
import { useVmMetricsStore } from '@/stores/vm-metrics.store';
import { useVmStore } from '@/stores/vm.store';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useXenApiStore = defineStore('xen-api', () => {
  const xenApi = new XenApi(import.meta.env.VITE_XO_HOST);
  const currentSessionId = ref();
  const isConnected = ref(false)
  const isConnecting = ref(false) 

  async function getXapi() {
    if (!currentSessionId.value) {
      throw new Error('Not connected to xapi')
    }

    return xenApi;
  }

  async function init() {
    const poolStore = usePoolStore();
    const hostStore = useHostStore();
    const vmStore = useVmStore();

    await Promise.all([
      poolStore.init(),
      hostStore.init(),
      vmStore.init(),
    ]);

    const hostMetricsStore = useHostMetricsStore();
    const vmMetricsStore = useVmMetricsStore();
    const vmGuestMetricsStore = useVmGuestMetricsStore();

    await Promise.all([
      hostMetricsStore.init(),
      vmMetricsStore.init(),
      vmGuestMetricsStore.init(),
    ]);

    const consoleStore = useConsoleStore();
    consoleStore.init();
  }

  async function connect(login:string, password:string){
    isConnecting.value = true
    currentSessionId.value = await xenApi.connect(login, password);
    isConnected.value = true
    isConnecting.value = false
    console.log('connected',currentSessionId.value)
  }

  return {
    isConnected,
    isConnecting,
    connect,
    init,
    getXapi,
    currentSessionId,
  };
});
