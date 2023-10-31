// Imports
import * as helper from './helper/helper';
import * as config from './config';
import * as instance from './helper/model/instance';

// Main object
export const state: StudioFormState = {
  // Config
  instances: {},
  initInstance: (
    instanceName: string,
    wrapper: HTMLElement,
    mask: HTMLElement
  ) => {
    instance.init(instanceName, wrapper, mask);
  },

  // Main api
  api: {},
  proxy: {},

  // Create proxy
  createReadMostlyProxy: createReadMostlyProxy,

  // Get proxy write event
  get proxyWrite() {
    // Dispatch body event
    document.body.dispatchEvent(
      new CustomEvent(
        `${config.PRODUCT_NAME_SHORT}-api-${proxyWriteEvent.mode}-${proxyWriteEvent.description}`,
        {
          bubbles: false,
          cancelable: true,
          detail: proxyWriteEvent.data,
        }
      )
    );

    // Loop
    const allowance =
      document.body.getAttribute(config.API_WRITE_ATTRIBUTE) === 'true';

    // Reset
    document.body.removeAttribute(config.API_WRITE_ATTRIBUTE);

    // Actually fullfill operation
    if (allowance) {
      // Always delete
      delete proxyWriteEvent.data.target[proxyWriteEvent.data.property];

      // Sometimes set
      if (proxyWriteEvent.mode === 'set')
        proxyWriteEvent.data.target[proxyWriteEvent.data.property] =
          proxyWriteEvent.data.value;
    }

    // Return
    return allowance;
  },
};

// Non-instance keys
export const arrayProperties = [
  'version',
  'push',
  'init',
  'destroy',
  'keys',
  'length',
  'pop',
  'shift',
  'forEach',
  'instances',
];

// Initialize
export const init = (
  push: (...args: unknown[]) => void,
  init: (...initAllNewOrReInitNamesOrReInitAll: unknown[]) => void,
  destroy: (...allOrNames: unknown[]) => void
) => {
  // + Create proxy window api +

  // Values
  state.api = {
    version: config.VERSION,
    push: push,
    init: init,
    destroy: destroy,
    get keys() {
      return Object.keys(this).filter(key => !arrayProperties.includes(key));
    },
    get length() {
      return this.keys.length;
    },
    pop: function () {
      if (this.length > 0) {
        const lastKey = this.keys[this.keys.length - 1];
        this.destroy(lastKey);
        return lastKey;
      } else {
        return undefined; // No instances to pop
      }
    },
    shift: function () {
      if (this.length > 0) {
        const firstKey = this.keys[0];
        this.destroy(firstKey);
        return firstKey;
      } else {
        return undefined; // No instances to shift
      }
    },
    forEach: function (
      callback: (
        instance: unknown,
        index: number,
        instances: unknown[]
      ) => unknown
    ) {
      this.keys.forEach((key: string, index: number) => {
        callback(this[key], index, this.instances);
      });
    },
    get instances() {
      return this.keys.map((key: string) => this[key]);
    },
  };

  // Read mostly
  state.proxy = createReadMostlyProxy(state.api) as StudioForm;
};

// Define wrtie event
let proxyWriteEvent: ProxyWriteEvent;

// Define
const proxyErr = (property: string | symbol, value: unknown = undefined) =>
  `property "${String(property)}"${
    !value ? '' : ` to "${value}"`
  } is not allowed.`;
const errPath = `${config.PRODUCT_NAME_CAMEL_CASE} -> model.ts:`;

// Create read only proxy
function createReadMostlyProxy(obj: object, description = 'root') {
  return new Proxy(obj, {
    set(target, property, value) {
      // Write access
      proxyWriteEvent = {
        mode: 'set',
        description: description,
        data: { target, property, value },
      };
      if (state.proxyWrite) return true;

      // Prevent any property from being set
      console.warn(`${errPath} Setting ${proxyErr(property, value)}`);
      return false;
    },
    deleteProperty(target, property) {
      // Write access
      proxyWriteEvent = {
        mode: 'set',
        description: description,
        data: { target, property },
      };
      if (state.proxyWrite) return true;

      // Prevent any property from being deleted
      console.warn(`${errPath} Deleting ${proxyErr(property)}`);
      return false;
    },
    setPrototypeOf() {
      // Prevent changing the prototype
      console.warn(`${errPath} Changing the prototype is not allowed.`);
      return false;
    },
    defineProperty(_, property) {
      // Prevent property definition
      console.warn(`${errPath} Defining ${proxyErr(property)}`);
      return false;
    },
  });
}
