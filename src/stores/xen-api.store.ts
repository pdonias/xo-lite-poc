import type { XenApiConsole, XenApiHost, XenApiHostMetric, XenApiPool, XenApiVm } from '@/libs/xen-api';
import XenApi from '@/libs/xen-api';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useXenApiStore = defineStore('xen-api', () => {
  const currentSessionId = ref();

  // POOL
  const pool = ref<XenApiPool>();
  const isPoolReady = ref(false);

  // HOSTS
  const hostsCollection = ref<Map<string, XenApiHost>>(new Map());
  const hostsList = computed(() => Array.from(hostsCollection.value.values()));
  const hostByRef = (hostRef: string) => hostsCollection.value.get(hostRef);
  const areHostsReady = ref(false);
  const activeHostsCount = computed(() => hostsList.value.filter(host => hostsMetricsCollection.value.get(host.metrics)?.live).length);
  const totalHostsCount = computed(() => hostsList.value.length);

  // VMS
  const vmsCollection = ref<Map<string, XenApiVm>>(new Map());
  const vmsList = computed(() => Array.from(vmsCollection.value.values()).filter(vm => !vm.is_a_snapshot && !vm.is_a_template && !vm.is_control_domain));
  const vmsByHostRef = (hostRef: string) => vmsList.value.filter((vm) => vm.resident_on === hostRef);
  const vmByRef = (vmRef: string) => vmsCollection.value.get(vmRef);
  const areVmsReady = ref(false);
  const activeVmsCount = computed(() => vmsList.value.filter(vm => vm.power_state === 'Running').length);
  const totalVmsCount = computed(() => vmsList.value.length);

  // HOSTS METRICS
  const hostsMetricsCollection = ref<Map<string, XenApiHostMetric>>(new Map());
  const areHostsMetricsReady = ref(false);

  // CONSOLES
  const consolesCollection = ref<Map<string, XenApiConsole>>(new Map());

  const xenApi = new XenApi(import.meta.env.VITE_XO_HOST);

  async function init() {
    currentSessionId.value = await xenApi.connect(import.meta.env.VITE_XO_USERNAME, import.meta.env.VITE_XO_PASSWORD);

    xenApi.loadPools().then(pools => {
      pool.value = [...pools.values()][0];
      isPoolReady.value = true;
    });

    xenApi.loadHosts().then(hosts => {
      hostsCollection.value = hosts;
      areHostsReady.value = true;
    });

    xenApi.loadVms().then(vms => {
      vmsCollection.value = vms;
      areVmsReady.value = true;
    });

    xenApi.loadHostsMetrics().then(hostsMetrics => {
      hostsMetricsCollection.value = hostsMetrics;
      areHostsMetricsReady.value = true;
    });
  }

  const loadConsole = async (consoleRef: string) => {
    if (consolesCollection.value.has(consoleRef)) {
      return consolesCollection.value.get(consoleRef);
    }
    const vmConsole = await xenApi.loadConsole(consoleRef);
    consolesCollection.value.set(consoleRef, vmConsole);
    return vmConsole;
  };

  return {
    init,
    currentSessionId,
    pool,
    hosts: hostsList,
    hostByRef,
    vmByRef,
    vmsByHostRef,
    loadConsole,
    activeVmsCount,
    totalVmsCount,
    activeHostsCount,
    totalHostsCount,
  };
});
