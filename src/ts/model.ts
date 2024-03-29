// Imports
import * as utils from './helper/model/utils';
import * as viewUtils from './helper/view/utils';
import * as attributeUtils from './helper/view/utilsAttributes';
import * as controllerUtils from './helper/controller/utils';
import * as config from './config';
import * as instance from './helper/model/instance';

// Main object
export const state: StudioFormState = {
  // Keyboard controls
  activeKeyBoardInstance: '',

  // Storage / "garbage collection"
  events: {},

  // Instances
  ghostInstances: {},
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

    console.log(
      'Figure out a way where you do not rely on DOM object communication!',
      'have some sort of internal variable for this!'
    );

    // Reset
    document.body.removeAttribute(config.API_WRITE_ATTRIBUTE);

    // Actually fullfill operation
    if (allowance && proxyWriteEvent.data.property !== 'resolve') {
      // Values
      const data = proxyWriteEvent.data;
      const property = data.property;
      const value = data.value;

      // Always delete
      delete data.target[property];

      // Sometimes set
      if (proxyWriteEvent.mode === 'set') data.target[property] = value;

      // If auth
      if (property === 'auth') {
        if (typeof value === 'string') {
          data.target[property] = true;
        } else {
          delete data.target[property];
        }
      }

      // Hidden values
      if (proxyWriteEvent.description.endsWith('hidden')) {
        if (typeof value === 'string' || value instanceof File) {
          data.target[property] = true;
        } else {
          delete data.target[property];
        }
      }
    }

    // Return
    return allowance;
  },
};

// Non-instance keys
export const arrayProperties = [
  'config',
  'destroy',
  'forEach',
  'init',
  'instances',
  'keys',
  'length',
  'push',
  'version',
];

// Global configuration
const globalConfigMain: StudioFormGlobalConfig = {
  // String
  get comboClassPrefix() {
    return (
      attributeUtils.getAttribute('combo-class-prefix', document.body) ||
      `${config.PRODUCT_NAME_SHORT}-`
    );
  },
  get eventPrefix() {
    return (
      attributeUtils.getAttribute('event-prefix', document.body) ||
      `${config.PRODUCT_NAME_SHORT}-`
    );
  },
  get externalEventSuffix() {
    return (
      attributeUtils.getAttribute('external-event-suffix', document.body) ||
      `-api`
    );
  },

  // Boolean
  get classCascading() {
    return (
      (attributeUtils.getAttribute('class-cascading', document.body) ||
        `true`) === 'true'
    );
  },
  get eventBubbles() {
    return (
      (attributeUtils.getAttribute('event-bubbles', document.body) ||
        `true`) === 'true'
    );
  },
  get warn() {
    return (
      (attributeUtils.getAttribute('warn', document.body) || `true`) === 'true'
    );
  },
};
const globalConfigProxy = createReadMostlyProxy(
  globalConfigMain,
  'global-config'
) as StudioFormGlobalConfig;
const globalConfigWriteName = `${config.PRODUCT_NAME_SHORT}-api-set-global-config`;
const globalConfigWrite = (e: unknown) => {
  // Values
  const detail = e?.['detail'];
  const property = detail?.property;
  const value = detail?.value;
  const isBoolean = ['classCascading', 'eventBubbles', 'warn'].includes(
    property
  );

  // Logic
  if (
    (isBoolean && typeof value === 'boolean') ||
    (!isBoolean && typeof value === 'string')
  )
    document.body.setAttribute(config.API_WRITE_ATTRIBUTE, 'true');
};
document.body.addEventListener(globalConfigWriteName, globalConfigWrite);

// Initialize
export const init = (
  push: (...args: unknown[]) => void,
  init: (...initAllNewOrReInitNamesOrReInitAll: unknown[]) => void,
  destroy: (...allOrNames: unknown[]) => void
) => {
  // + Create proxy window api +

  // Values
  state.api = {
    // Stanard
    version: config.VERSION,
    push: push,
    init: init,
    destroy: destroy,

    // Config
    config: globalConfigProxy,

    // API
    get keys() {
      return Object.keys(this).filter(key => !arrayProperties.includes(key));
    },
    get length() {
      return this.keys.length;
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
  state.proxy = createReadMostlyProxy(state.api, 'root') as StudioForm;
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
export function createReadMostlyProxy(obj: object, description = 'undefined') {
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
      controllerUtils.warn(`${errPath} Setting ${proxyErr(property, value)}`);
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
      controllerUtils.warn(`${errPath} Deleting ${proxyErr(property)}`);
      return false;
    },
    setPrototypeOf() {
      // Prevent changing the prototype
      controllerUtils.warn(`${errPath} Changing the prototype is not allowed.`);
      return false;
    },
    defineProperty(_, property) {
      // Prevent property definition
      controllerUtils.warn(`${errPath} Defining ${proxyErr(property)}`);
      return false;
    },
  });
}
