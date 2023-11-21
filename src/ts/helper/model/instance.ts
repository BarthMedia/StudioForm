// + Imports +

// Root
import * as utils from './utils';
import * as viewUtils from '../view/utils';
import * as controllerUtils from '../controller/utils';
import * as config from '../../config';
import * as model from '../../model';

// View
import elements from '../view/elements';

// Model

// Initiation
import modes from './modes';
import slideLogic from './slideLogic';
import animationsConfig from './configAnimations';
import fetchConfig from './configFetch';

// Usage
import dataForm from './dataForm';
import dataProgress from './dataProgress';
import fetch from './fetch';

// View
import animatePromiseResolve from '../view/animatePromiseResolve';

// + Define +

// + Export +

// Destroy
export const destroy = (instanceName: string) => {
  // Think about tracking all the currently applied sf-classes.
  // And how to remove them smoothly! think sf-completed & sf-current

  //
  console.log('Reset checkboxes on destroy!');

  console.log(
    'Have a one time event listener',
    'All events have to be able to be properly garbage collected?',
    "Maybe sort's itself",
    'But probably garbage collection is very important'
  );

  console.log(
    'instead of saving saving once events, ',
    'click the form, and try to resolve a potential fetch!'
  );

  // Values
  const events = model.state.events;

  // Log
  console.log('I gotta add all these event listeners along the the way');
  console.log('I gotta destroy these event listeners!');

  // Remove DOM reference
  const sfNameAttr = `${config.PRODUCT_NAME_SHORT}-name`;
  document
    .querySelector(`[${sfNameAttr}="${instanceName}"]`)
    ?.removeAttribute(sfNameAttr);

  // Loop
  events[instanceName].forEach(arg =>
    document.body.removeEventListener(arg.name, arg.function)
  );

  // Delete
  delete events[instanceName];

  // Delete instance
  delete model.state.ghostInstances[instanceName];
  delete model.state.instances[instanceName];
  delete model.state.api[instanceName];
};

// Init
const errPath = (n: string) => `${controllerUtils.errorName(n)} instance.ts:`;
export const init = (
  instanceName: string,
  wrapper: HTMLElement,
  mask: HTMLElement
) => {
  // Initiate events
  const event: StudioFormEvent[] = (model.state.events[instanceName] = []);

  console.log(
    'make sure, the event.defaultPrevented is respected on submit, in order to know if Wized or other js has successfully reset the form',
    'If not default prevented, reset on your own, if that is wanted!'
  );

  // Proxy write set prefix
  const proxyWriteSetPrefix = `${config.PRODUCT_NAME_SHORT}-api-set-${instanceName}`;

  console.log('have animate-end and animate events!');

  console.log('Have fail event!');

  console.log('Respect custom anchor?');

  // + Modes - proxy & event listener +
  const modesMain = modes(wrapper, mask);
  const modesProxy = model.state.createReadMostlyProxy(
    modesMain,
    `${instanceName}-modes`
  ) as SFModesConfig;
  const modesWriteName = `${config.PRODUCT_NAME_SHORT}-api-set-${instanceName}-modes`;
  const modesWrite = (e: unknown) => {
    if (typeof e?.['detail']?.value === 'boolean')
      document.body.setAttribute(config.API_WRITE_ATTRIBUTE, 'true');
  };
  document.body.addEventListener(modesWriteName, modesWrite);
  event.push({ name: modesWriteName, function: modesWrite });

  // + Elements +
  const elementsMain = elements(modesProxy, instanceName, wrapper, mask);
  const elementsProxy = model.state.createReadMostlyProxy(
    elementsMain
  ) as StudioFormElements;

  // Simple guard
  if (!elementsMain.slides.length) {
    console.warn(
      `${errPath(instanceName)} Couldn't find slides!`,
      elementsMain
    );
    return;
  }

  // + Slide logic / record +

  // Generate slide logic
  const logicMain: StudioFormSlideLogic[] = slideLogic(
    instanceName,
    modesProxy,
    elementsProxy
  );
  const logicProxy = model.state.createReadMostlyProxy(
    logicMain
  ) as StudioFormSlideLogic[];

  // Slide record
  const recordMain = [0];
  const recordProxy = model.state.createReadMostlyProxy(recordMain) as number[];

  // + Config +

  // Generate animation config
  const animationsConfigMain: SFAnimationConfig = animationsConfig(
    instanceName,
    wrapper,
    mask
  );
  const animationsConfigProxy = model.state.createReadMostlyProxy(
    animationsConfigMain,
    `${instanceName}-animations-config`
  ) as SFAnimationConfig;
  const animationsConfigWriteName = `${config.PRODUCT_NAME_SHORT}-api-set-${instanceName}-animations-config`;
  const animationsConfigWrite = (e: unknown) => {
    // Writing logic
    if (typeof e?.['detail']?.value === 'boolean')
      document.body.setAttribute(config.API_WRITE_ATTRIBUTE, 'true');
  };
  document.body.addEventListener(
    animationsConfigWriteName,
    animationsConfigWrite
  );
  event.push({
    name: animationsConfigWriteName,
    function: animationsConfigWrite,
  });

  // Generate fetch config
  const fetchConfigMain: SFFetchConfig = fetchConfig(wrapper, mask);
  const fetchConfigProxy = model.state.createReadMostlyProxy(
    fetchConfigMain,
    `${instanceName}-fetch-config`
  ) as SFFetchConfig;
  const fetchConfigWriteName = `${config.PRODUCT_NAME_SHORT}-api-set-${instanceName}-fetch-config`;
  const fetchConfigWrite = (e: unknown) => {
    // Values
    let allowance = false;
    const isTimeout = e?.['detail']?.property === 'timeout';

    // Writing logic
    if (isTimeout && typeof e?.['detail']?.value === 'number') allowance = true;
    else if (!isTimeout && typeof e?.['detail']?.value === 'string')
      allowance = true;

    // Write
    if (allowance)
      document.body.setAttribute(config.API_WRITE_ATTRIBUTE, 'true');
  };
  document.body.addEventListener(fetchConfigWriteName, fetchConfigWrite);
  event.push({ name: fetchConfigWriteName, function: fetchConfigWrite });

  // Config
  const configMain: StudioFormConfig = {
    animations: animationsConfigProxy,
    fetch: fetchConfigProxy,
    modes: modesProxy,
  };
  const configProxy = model.state.createReadMostlyProxy(
    configMain
  ) as StudioFormConfig;

  // + Data +

  // Animation data
  const animationDataMain: SFAnimationData = {};
  const animationDataProxy = model.state.createReadMostlyProxy(
    animationDataMain
  ) as SFAnimationData;

  // Fetch data
  const fetchDataMain: SFFetchData = {};
  const fetchDataProxy = model.state.createReadMostlyProxy(
    fetchDataMain
  ) as SFFetchData;

  // Fetch data
  const validityDataMain: SFValidityData[] = {};
  const validityDataProxy = model.state.createReadMostlyProxy(
    validityDataMain
  ) as SFValidityData[];

  console.log(
    '// Make it possible to easily delete fetch data',
    'Should be a proxy though'
  );

  console.log(
    'Getters for data. form / progress are suppiror to other methods'
  );

  console.log(
    'Think error messages much bigger?',
    'There is not only fetch error, but also other type of requirements error readable through data.error ?'
  );

  // Data
  const dataMain: StudioFormData = {
    animation: animationDataProxy,
    fetch: fetchDataProxy,
    get form() {
      return dataForm(instanceProxy);
    },
    get params() {
      return dataForm(instanceProxy, false, true) as URLSearchParams | false;
    },
    get progress() {
      return dataProgress(instanceProxy);
    },
    validity: validityDataProxy,
  };
  const dataProxy = model.state.createReadMostlyProxy(
    dataMain
  ) as StudioFormData;

  // Hidden data fields by external users
  console.log('Apply similar write only technique, as you have done ');
  console.log(
    'Only accept strings, and files',
    "const type = (value instanceof File) ? 'file' : typeof value;"
  );
  console.log('Have dataForm.ts respect these hidden values!');
  const hiddenDataSecret: SFHidden = {};
  const hiddenDataMain: SFHidden = {};
  const hiddenDataProxy = model.state.createReadMostlyProxy(
    hiddenDataMain,
    `${instanceName}-hidden`
  ) as SFHidden;

  // Writing events
  ['set', 'delete'].forEach(str => {
    const hiddenWriteName = `${config.PRODUCT_NAME_SHORT}-api-${str}-${instanceName}-hidden`;
    const hiddenWrite = (e: unknown) => {
      // Values
      const property = e?.['detail']?.property as string | symbol;
      const value = e?.['detail']?.value as unknown;
      let write = false;

      // + Logic +

      // Files / strings

      // Write
      if (typeof value === 'string' || value instanceof File) {
        hiddenDataSecret[property.toString()] = value;
        write = true;
      }

      // Delete
      if (typeof value === 'undefined' || value === false) {
        delete hiddenDataSecret[property.toString()];
        write = true;
      }

      // Write
      if (write) document.body.setAttribute(config.API_WRITE_ATTRIBUTE, 'true');
    };
    document.body.addEventListener(hiddenWriteName, hiddenWrite);
    event.push({ name: hiddenWriteName, function: hiddenWrite });
  });

  // Suggest Proxy
  const suggestMain: SFSuggest = {
    clear: () => {
      console.log('I have to built');
    },
    next: () => {
      console.log('I have to built');
      console.log(
        "Throw warnings if somebody try's to do this on slide, where there are no !visible! 2+ buttons"
      );
    },
    prev: () => {
      console.log('I have to built');
    },
  };
  const suggestProxy = model.state.createReadMostlyProxy(
    suggestMain
  ) as SFSuggest;

  // + Instance +

  console.log("Listen to as many .defaultPrevented logic's as possible");

  // Create
  const instanceMain: StudioFormInstance = {
    // + Functions +

    // API
    fetch: async (options: SFOFetch = {}) => {
      return await fetch(instanceProxy, options);
    },
    promise: async () => {
      return await animatePromiseResolve(instanceProxy, false);
    },
    reportValidity: () => {
      //
      console.log(
        'Report vadility deverse special mode, where you can input an [] of HTMLElements',
        'This shall then scroll to and make red / apply combo class to the described elements!'
      );

      //
      console.log('I have to built');
    },
    reset: (options = {}) => {
      console.log('Remove sf hide on reset !!!');
      console.log('I have to built');
    },

    // - Navigation -

    // Special use action
    to: async (slideId, options = {}) => {
      console.log('I have to built', 'I think fetched event could be sweet!');
      return true;
    },
    scrollTo: (options: SFOScrollTo) => {
      console.log(
        "Throw error if API user try's this without supplying options!"
      );
      console.log('I have to built', 'I think fetched event could be sweet!');
    },
    suggest: suggestProxy,

    // Native actions
    prev: async (options = {}) => {
      console.log('I have to built', 'I think fetched event could be sweet!');
      return true;
    },
    next: async (options = {}) => {
      console.log(
        "Consider promise resolve feature always on these navigation API's.",
        'Call the class sf-promise',
        'And call the submit calls sf-submit'
      );
      console.log('I have to built', 'I think fetched event could be sweet!');
      return true;
    },
    submit: async (options = {}) => {
      console.log('I have to built', 'I think fetched event could be sweet!');
      return true;
    },

    // Status info
    isAwaiting: false,
    isTransitioning: false,
    isDone: false,

    // Internal data
    name: instanceName,
    elements: elementsProxy,
    config: configProxy,
    logic: logicProxy,
    record: recordProxy,
    data: dataProxy,

    // External data
    hidden: hiddenDataProxy,
  };
  const instanceProxy = model.state.createReadMostlyProxy(
    instanceMain,
    `${instanceName}-instance`
  ) as StudioFormInstance;

  // Auhtorization storage
  const authMain = {
    token: undefined as undefined | string,
  };

  // Writing events
  ['set', 'delete'].forEach(str => {
    const instanceWriteName = `${config.PRODUCT_NAME_SHORT}-api-${str}-${instanceName}-instance`;
    const instanceWrite = (e: unknown) => {
      // Values
      const property = e?.['detail']?.property as string | symbol;
      const value = e?.['detail']?.value as unknown;
      let write = false;

      // + Logic +

      // Authorization
      if (
        property === 'auth' &&
        (typeof value === 'string' ||
          typeof value === 'undefined' ||
          typeof value === 'boolean')
      ) {
        if (value !== true) {
          if (typeof value === 'string') authMain.token = value;
          else authMain.token = undefined;
          write = true;
        }
      }

      console.log(
        'Make sure to make data.fetch.{} deleteable / null! / nullable!'
      );

      // Promise / resolve & submitted
      if (
        property === 'resolve' &&
        (typeof value === 'boolean' || typeof value === 'undefined')
      ) {
        // Guard
        if (!instanceProxy.isAwaiting)
          throw new Error(
            `${errPath(instanceName)} There is no active promise!`
          );

        // Dispatch
        viewUtils.dispatchEvent(instanceName, 'resolve', false, {
          success: value,
        });

        // Write
        write = true;
      }

      // Write
      if (write) document.body.setAttribute(config.API_WRITE_ATTRIBUTE, 'true');
    };
    document.body.addEventListener(instanceWriteName, instanceWrite);
    event.push({ name: instanceWriteName, function: instanceWrite });
  });

  // + Ghost instance +
  const ghostInstanceMain: StudioFormGhostInstance = {
    root: instanceMain,
    auth: authMain,
    record: recordMain,
    animationData: animationDataMain,
    hiddenData: hiddenDataSecret,
    fetchData: fetchDataMain,
    completedCurrent: [],
    slideCurrent: 0 as number | string,
    slideNext: 0 as number | string,
  };

  // Add proxy
  model.state.ghostInstances[instanceName] = ghostInstanceMain;
  model.state.instances[instanceName] = instanceProxy;
  model.state.api[instanceName] = model.state.instances[instanceName];
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
