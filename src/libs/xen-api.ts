import type { JSONRPCParams } from 'json-rpc-2.0';
import { JSONRPCClient } from 'json-rpc-2.0';

export type ObjectType = 'pool' | 'host' | 'VM' | 'host_metrics';

interface XenApiObject {
  $ref: string;
}

type WithLabel<T> = T & {
  name_label: string;
}

export interface XenApiPool extends XenApiObject {
  name_label: string;
}

export interface XenApiHost extends XenApiObject {
  name_label: string;
  metrics: string;
}

export interface XenApiVm extends XenApiObject {
  name_label: string;
  power_state: 'Running' | 'Paused' | 'Halted' | 'Suspended';
  resident_on: string;
  consoles: string[];
  is_control_domain: boolean;
  is_a_snapshot: boolean;
  is_a_template: boolean;
}

export interface XenApiConsole extends XenApiObject {
  protocol: string;
  location: string;
}

export interface XenApiHostMetric extends XenApiObject {
  live: boolean;
  memory_free: number;
  memory_total: number;
}

export default class XenApi {
  #client: JSONRPCClient;
  #sessionId: string | undefined;

  #types: string[] = [];

  #watchCallBack: ((results: any) => void) | undefined;
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
    this.#sessionId = await this.call('session.login_with_password', [login, password]);
    this.#types = (await this.call<string[]>('system.listMethods'))
      .filter((method: string) => method.endsWith('.get_all_records'))
      .map((method: string) => method.slice(0, method.indexOf('.')))
      .filter((type: string) => type !== 'message');

    return this.#sessionId;
  }

  get sessionId() {
    return this.#sessionId;
  }

  async loadAll() {
    console.log('will load all ');
    const collections = await Promise.all(this.#types.map(
      async type => {
        try {
          const collection = await this.call(`${type}.get_all_records`, [this.sessionId]);
          return { type, collection };
        } catch (error: any) {
          if (error?.message === 'MESSAGE_REMOVED') {
            return { type, collection: {} };
          }
          throw error;
        }
      }),
    );
    console.log({ collections });
    const res: { [key: string]: any } = {};
    collections.forEach(({ type, collection }) => {
      res[type] = collection;
    });
    console.log({ res });
    return res;
  }

  // https://xapi-project.github.io/xen-api/classes/vm.html
  call<T = any>(method: string, args: JSONRPCParams = [this.sessionId]): PromiseLike<T> {
    return this.#client.request(method, args);
  }

  async #loadCollection<T extends object>(type: ObjectType) {
    const result = await this.call(`${type}.get_all_records`, [this.sessionId]);

    return new Map(
      Object
        .entries<Omit<WithLabel<XenApiObject>, '$ref'>>(result)
        .sort(([, obj1], [, obj2]) => {
          const label1 = obj1.name_label?.toLocaleLowerCase();
          const label2 = obj2.name_label?.toLocaleLowerCase();

          switch (true) {
            case label1 < label2:
              return -1;
            case label1 > label2:
              return 1;
            default:
              return 0;
          }
        })
        .map(([ref, obj]) => [ref, { $ref: ref, ...obj }]),
    ) as Map<string, T>;
  }

  loadPools() {
    return this.#loadCollection<XenApiPool>('pool');
  }

  loadHosts() {
    return this.#loadCollection<XenApiHost>('host');
  }

  loadVms() {
    return this.#loadCollection<XenApiVm>('VM');
  }

  loadHostsMetrics() {
    return this.#loadCollection<XenApiHostMetric>('host_metrics');
  }

  loadConsole(ref: string) {
    return this.call<XenApiConsole>(`console.get_record`, [this.sessionId, ref]);
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
      const result: { token: string, events: any } = await this.call(
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

  registerWatchCallBack(callback: () => void) {
    this.#watchCallBack = callback;
  }

  async injectWatchEvent(poolRef: string) {
    this.#fromToken = await this.call('event.inject', [this.sessionId, 'pool', poolRef]);
  }
}
