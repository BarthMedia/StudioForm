// + Imports +

// Root
import * as helper from '../helper';
import * as config from '../../config';
import * as model from '../../model';

// View
import elements from '../view/elements';

// Model
import modes from './modes';
import slideLogic from './slideLogic';

// + Define +

// + Export +

// Destroy
export const destroy = (name: string) => {
  // Values
  const events = model.state.events;

  // Log
  console.log('I gotta destroy these event listeners!');

  // Remove DOM reference
  const sfNameAttr = `${config.PRODUCT_NAME_SHORT}-name`;
  document
    .querySelector(`[${sfNameAttr}="${name}"]`)
    ?.removeAttribute(sfNameAttr);

  // Loop
  events[name].forEach(arg =>
    document.body.removeEventListener(arg.name, arg.function)
  );

  // Delete
  delete events[name];

  // Delete instance
  delete model.state.instances[name];
  delete model.state.api[name];
};

// Init
const errPath = (n: string) => `${helper.errorName(n)} instance.ts:`;
export const init = (name: string, wrapper: HTMLElement, mask: HTMLElement) => {
  // Initiate events
  const event: StudioFormEvent[] = (model.state.events[name] = []);

  // + Modes - proxy & event listener +
  const modesMain = modes(wrapper, mask);
  const modesProxy = model.state.createReadMostlyProxy(
    modesMain,
    `${name}-modes`
  ) as { [name: string]: boolean };
  const modesWriteName = `${config.PRODUCT_NAME_SHORT}-api-set-${name}-modes`;
  const modesWrite = (e: unknown) => {
    if (typeof e?.['detail']?.value === 'boolean')
      document.body.setAttribute(config.API_WRITE_ATTRIBUTE, 'true');
  };
  document.body.addEventListener(modesWriteName, modesWrite);
  event.push({ name: modesWriteName, function: modesWrite });

  // + Elements +
  const elementsMain = elements(modesProxy, name, wrapper, mask);
  const elementsProxy = model.state.createReadMostlyProxy(
    elementsMain
  ) as StudioFormElements;

  // Simple guard
  if (!elementsMain.slides.length) {
    console.warn(`${errPath(name)} Couldn't find slides!`, elementsMain);
    return;
  }

  // Generate slide logic
  const logicMain = slideLogic(name, modesProxy, elementsProxy);
  const logicProxy = model.state.createReadMostlyProxy(logicMain);

  // Slide record
  const recordMain = [0];
  const recordProxy = model.state.createReadMostlyProxy(recordMain);

  // + Config +

  // Config
  const configMain = {
    modes: modesProxy,
  };
  const configProxy = model.state.createReadMostlyProxy(configMain);

  // + Instance +

  // Create
  const instanceMain = {
    name: name,
    logic: logicProxy,
    record: recordProxy,
    elements: elementsProxy,
    config: configProxy,
  };
  const instanceProxy = model.state.createReadMostlyProxy(
    instanceMain,
    `${name}-instance`
  );

  // Writing events
  ['set', 'delete'].forEach(str => {
    const instanceWriteName = `${config.PRODUCT_NAME_SHORT}-api-${str}-${name}-instance`;
    const instanceWrite = (e: unknown) => {
      // Values
      const property = e?.['detail']?.property as string | symbol;
      const value = e?.['detail']?.value as unknown;
      let write = false;

      // + Logic +

      // Authorization
      if (
        property === 'auth' &&
        (typeof value === 'string' || typeof value === 'undefined')
      ) {
        write = true;
      }

      // Promise / resolve & submitted
      if (
        ['promise', 'resolve', 'submitted'].includes(String(property)) &&
        (typeof value === 'boolean' || typeof value === 'undefined')
      ) {
        write = true;
        console.log(
          '!!!!!!!! Programm promise / resolve & submitted co. events!'
        );
      }

      // Write
      if (write) document.body.setAttribute(config.API_WRITE_ATTRIBUTE, 'true');
    };
    document.body.addEventListener(instanceWriteName, instanceWrite);
    event.push({ name: instanceWriteName, function: instanceWrite });
  });

  // Add proxy
  model.state.instances[name] = instanceProxy as any; // !!! Remove any
  model.state.api[name] = model.state.instances[name];
};

/**
 *
 * Legacy
 *
 */

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
