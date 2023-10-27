// Imports
import * as helper from './helper/helper';
import * as config from './config';
import modes from './helper/model/modes';
import slideLogic from './helper/model/slideLogic';
import calculateProgress from './helper/model/calculateProgress';
import requirements from './helper/model/requirements';
import post from './helper/model/fetch';

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
  };

  // Read mostly
  state.proxy = createReadMostlyProxy(state.api) as StudioForm;
};

// Main object
export const state: StudioFormState = {
  // Main api
  api: [],
  proxy: [],

  // Proxy write event handlers
  proxyWriteHandlers: [],

  // Get proxy write event
  get proxyWrite() {
    // Loop
    let allowance = false;
    this.proxyWriteHandlers.forEach(
      (handler: (event: ProxyWriteEvent) => true | void) => {
        if (handler(proxyWriteEvent)) allowance = true;
      }
    );

    // Actually fullfill operation
    if (allowance) {
      proxyWriteEvent.mode === 'set'
        ? (proxyWriteEvent.data.target[proxyWriteEvent.data.property] =
            proxyWriteEvent.data.value)
        : delete proxyWriteEvent.data.target[proxyWriteEvent.data.property];
    }

    // Return
    return allowance;
  },
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
export const createReadMostlyProxy = (obj: object) => {
  return new Proxy(obj, {
    set(target, property, value) {
      // Write access
      proxyWriteEvent = { mode: 'set', data: { target, property, value } };
      if (state.proxyWrite) return true;

      // Prevent any property from being set
      console.warn(`${errPath} Setting ${proxyErr(property, value)}`);
      return false;
    },
    deleteProperty(target, property) {
      // Write access
      proxyWriteEvent = { mode: 'set', data: { target, property } };
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
};

// // Function
// export function init(wrapper: HTMLElement, index: number) {
//   // Values
//   const obj: any = {};

//   // + Define +

//   // ELements
//   obj.elements = {};
//   obj.elements.wrapper = wrapper;

//   // * SDK *

//   // Base
//   obj.sdk = {};
//   obj.sdk.i = index;

//   // Custom code
//   obj.sdk.events = {};

//   // Animation data
//   obj.sdk.animationData = {};

//   // 3rd party
//   obj.sdk.register = {};

//   // Progress
//   obj.sdk.slideRecord = [0];

//   // Modes
//   modes(obj);

//   // View init
//   obj.view = {};
//   obj.view.sfInactiveArray = [];
//   obj.view.eventsFunctionArrays = {};
//   obj.view.gsapTimeline = {};
//   obj.view.gsapProgressBarTimeline = {};

//   // Model functions
//   obj.model = {};

//   // * Add callbacks to model *

//   // Generate slide logic
//   obj.model.generateSlideLogic = function () {
//     slideLogic(index);
//   };

//   // Post data
//   obj.sdk.data = {};
//   obj.model.post = async function () {
//     return post(index);
//   };

//   // Calculate progress
//   obj.model.generateProgressData = function () {
//     const data = calculateProgress(index);
//     obj.sdk.pathProgressData = data;
//   };

//   // Check step requirements
//   const eventFunctionArrays = obj.view.eventsFunctionArrays;
//   helper.addEventsInfrastrucutre(obj, 'CheckSlideRequirements');
//   obj.sdk.slideRequirementsData = {};
//   obj.sdk.slideRequirements = function (
//     slideId: number,
//     options: Options = {}
//   ) {
//     helper.triggerAllFunctions(eventFunctionArrays.onCheckSlideRequirements);
//     const res = requirements(index, slideId, options);
//     helper.triggerAllFunctions(eventFunctionArrays.afterCheckSlideRequirements);
//     return res;
//   };

//   // Push
//   state.push(obj);
// }
