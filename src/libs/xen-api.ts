import { JSONRPCClient } from 'json-rpc-2.0';

export type ObjectType =
  'Bond'
  | 'Certificate'
  | 'Cluster'
  | 'Cluster_host'
  | 'DR_task'
  | 'Feature'
  | 'GPU_group'
  | 'PBD'
  | 'PCI'
  | 'PGPU'
  | 'PIF'
  | 'PIF_metrics'
  | 'PUSB'
  | 'PVS_cache_storage'
  | 'PVS_proxy'
  | 'PVS_server'
  | 'PVS_site'
  | 'SDN_controller'
  | 'SM'
  | 'SR'
  | 'USB_group'
  | 'VBD'
  | 'VBD_metrics'
  | 'VDI'
  | 'VGPU'
  | 'VGPU_type'
  | 'VIF'
  | 'VIF_metrics'
  | 'VLAN'
  | 'VM'
  | 'VMPP'
  | 'VMSS'
  | 'VM_appliance'
  | 'VM_guest_metrics'
  | 'VM_metrics'
  | 'VUSB'
  | 'blob'
  | 'console'
  | 'crashdump'
  | 'host'
  | 'host_cpu'
  | 'host_crashdump'
  | 'host_metrics'
  | 'host_patch'
  | 'network'
  | 'network_sriov'
  | 'pool'
  | 'pool_patch'
  | 'pool_update'
  | 'role'
  | 'secret'
  | 'subject'
  | 'task'
  | 'tunnel'

export type XenApiRecord = {
  uuid: string
}

export interface XenApiPool extends XenApiRecord {
  name_label: string;
}

export interface XenApiHost extends XenApiRecord {
  name_label: string;
  metrics: string;
  resident_VMs: string[];
}

export interface XenApiVm extends XenApiRecord {
  name_label: string;
  power_state: 'Running' | 'Paused' | 'Halted' | 'Suspended';
  resident_on: string;
  consoles: string[];
  is_control_domain: boolean;
  is_a_snapshot: boolean;
  is_a_template: boolean;
}

export interface XenApiConsole extends XenApiRecord {
  protocol: string;
  location: string;
}

export interface XenApiHostMetrics extends XenApiRecord {
  live: boolean;
  memory_free: number;
  memory_total: number;
}

export interface XenApiVmMetrics extends XenApiRecord {

}

export interface XenApiVmGuestMetrics extends XenApiRecord {

}

type WatchCallbackResult = {
  id: string
  class: Lowercase<ObjectType>
  operation: 'add' | 'mod' | 'del'
  ref: string
  snapshot: object
}

type WatchCallbackResults = WatchCallbackResult[]

type WatchCallback = (results: WatchCallbackResults) => void

export default class XenApi {
  #client: JSONRPCClient;
  #sessionId: string | undefined;

  #types: string[] = [];

  #watchCallBack: WatchCallback | undefined;
  #watching = false;
  #fromToken: string | undefined;

  constructor(hostUrl: string) {
    this.#client = new JSONRPCClient((request: any) => {
      return fetch(`${hostUrl}/jsonrpc`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request),
      }).then((response) => {
        if (response.status === 200) {
          return response.json().then((json) => this.#client.receive(json));
        } else if (request.id !== undefined) {
          return Promise.reject(new Error(response.statusText));
        }
      });
    });
  }

  async connect(login: string, password: string) {
    this.#sessionId = await this.#call('session.login_with_password', [login, password]);
    this.#types = (await this.#call<string[]>('system.listMethods'))
      .filter((method: string) => method.endsWith('.get_all_records'))
      .map((method: string) => method.slice(0, method.indexOf('.')))
      .filter((type: string) => type !== 'message');

    return this.#sessionId;
  }

  get sessionId() {
    return this.#sessionId;
  }

  #call<T = any>(method: string, args: any[] = []): PromiseLike<T> {
    return this.#client.request(method, args);
  }

  async loadRecords<T extends XenApiRecord>(type: ObjectType): Promise<Map<string, T>> {
    const result = await this.#call(`${type}.get_all_records`, [this.sessionId]);
    return new Map(Object.entries<T>(result));
  }

  async #watch() {
    if (!this.#fromToken) {
      throw new Error('call `injectWatchEvent` before startWatch');
    }
    // load pools
    while (this.#watching) {
      if (!this.#watchCallBack) {
        // no callback , skip this call
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      const result: { token: string, events: any } = await this.#call(
        'event.from',
        [
          this.sessionId,
          this.#types,
          this.#fromToken,
          5.001,
        ],
      );
      this.#fromToken = result.token;
      this.#watchCallBack?.(result.events);

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  startWatch() {
    this.#watching = true;
    this.#watch();
  }

  stopWatch() {
    this.#watchCallBack = undefined;
    this.#watching = false;
  }

  registerWatchCallBack(callback: WatchCallback) {
    this.#watchCallBack = callback;
  }

  async injectWatchEvent(poolRef: string) {
    this.#fromToken = await this.#call('event.inject', [this.sessionId, 'pool', poolRef]);
  }
}
