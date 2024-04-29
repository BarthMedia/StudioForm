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
import reset from '../view/reset';
import reportValidity from '../view/reportValidity';
import * as focus from '../view/focus';

// Navigation
import navNext from './navNext';
import navPrev from './navPrev';
import navSubmit from './navSubmit';
import navTo from './navTo';
import scrollTo from '../view/scrollTo';

// + Define +

// + Export +

// Destroy
export const destroy = (instanceName: string) => {
  // Values
  const ghostInstances = model.state.ghostInstances;

  // Disconnect observer
  ghostInstances[instanceName].observer?.disconnect();

  // Think about tracking all the currently applied sf-classes.
  // And how to remove them smoothly! think sf-completed & sf-current

  // TODOs
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

  // Log
  console.log('I gotta add all these event listeners along the the way');
  console.log('I gotta destroy these event listeners!');

  // Values
  const events = model.state;

  // Remove DOM reference
  const sfNameAttr = `${config.PRODUCT_NAME_SHORT}-id`;
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
  delete ghostInstances[instanceName];
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
  // Values
  const proxyCallbacks: SFProxyCallbacks = {};

  // + Modes - proxy & event listener +
  const modesMain = modes(wrapper, mask);
  const modesProxy = model.createReadMostlyProxy(
    modesMain,
    `modes`,
    instanceName
  ) as SFModesConfig;

  const modesWrite = (data: ProxyWriteEventData) =>
    typeof data.value === 'boolean';
  proxyCallbacks[`set-modes`] = modesWrite;

  // + Elements +
  const elementsMain = elements(modesProxy, instanceName, wrapper, mask);
  const elementsProxy = model.createReadMostlyProxy(
    elementsMain
  ) as StudioFormElements;

  // Simple guard
  if (!elementsMain.slides.length) {
    controllerUtils.warn(
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
  const logicProxy = model.createReadMostlyProxy(
    logicMain
  ) as StudioFormSlideLogic[];

  // Slide record
  const recordMain = [0];
  const recordProxy = model.createReadMostlyProxy(recordMain) as number[];

  // + Config +

  // Generate animation config
  const animationsConfigMain: SFAnimationConfig = animationsConfig(
    instanceName,
    wrapper,
    mask
  );
  const animationsConfigProxy = model.createReadMostlyProxy(
    animationsConfigMain,
    `animations-config`,
    instanceName
  ) as SFAnimationConfig;

  const animationsConfigWrite = (data: ProxyWriteEventData) => {
    // Values
    const value = data.value;
    const property = data.property.toString();
    const stringVals = ['ease', 'progressBarAxis'];
    const stringAndNumberVals = ['offset'];
    const includesStringVals = stringVals.includes(property);
    const includesStringAndNumberVals = stringAndNumberVals.includes(property);

    // Writing logic
    return (
      ((includesStringAndNumberVals || !includesStringVals) &&
        (typeof value === 'number' ||
          (property === 'direction' && value === 'off'))) ||
      ((includesStringAndNumberVals || includesStringVals) &&
        typeof value === 'string')
    );
  };
  proxyCallbacks[`set-animations-config`] = animationsConfigWrite;

  // Generate fetch config
  const fetchConfigMain: SFFetchConfig = fetchConfig(wrapper, mask);
  const fetchConfigProxy = model.createReadMostlyProxy(
    fetchConfigMain,
    `fetch-config`,
    instanceName
  ) as SFFetchConfig;

  const fetchConfigWrite = (data: ProxyWriteEventData) => {
    // Values
    let allowance = false;
    const isTimeout = data.property === 'timeout';

    // Writing logic
    if (isTimeout && typeof data.value === 'number') allowance = true;
    else if (!isTimeout && typeof data.value === 'string') allowance = true;

    // Write
    return allowance;
  };
  proxyCallbacks[`set-fetch-config`] = fetchConfigWrite;

  // Config
  const configMain: StudioFormConfig = {
    animations: animationsConfigProxy,
    fetch: fetchConfigProxy,
    modes: modesProxy,
  };
  const configProxy = model.createReadMostlyProxy(
    configMain
  ) as StudioFormConfig;

  // + Data +

  // Animation data
  const animationDataMain = {};
  const animationDataProxy = model.createReadMostlyProxy(
    animationDataMain
  ) as SFAnimationData;

  // Fetch data
  const fetchDataMain: SFFetchData = {};
  const fetchDataProxy = model.createReadMostlyProxy(
    fetchDataMain
  ) as SFFetchData;

  // Fetch data
  const validityDataMain: SFValidityData[] = [];
  const validityDataProxy = model.createReadMostlyProxy(
    validityDataMain
  ) as SFValidityData[];

  // Files data
  const filesDataMain: SFFilesData = {};
  const filesDataProxy = model.createReadMostlyProxy(
    filesDataMain
  ) as SFFilesData;

  // Data
  const dataMain: StudioFormData = {
    animation: animationDataProxy,
    fetch: fetchDataProxy,
    files: filesDataProxy,
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
  const dataProxy = model.createReadMostlyProxy(dataMain) as StudioFormData;

  // Hidden data fields by external users
  const hiddenDataSecret: SFHidden = {};
  const hiddenDataMain: SFHidden = {};
  const hiddenDataProxy = model.createReadMostlyProxy(
    hiddenDataMain,
    `hidden`,
    instanceName
  ) as SFHidden;

  // Writing events
  ['set', 'delete'].forEach(str => {
    const hiddenWrite = (data: ProxyWriteEventData) => {
      // Values
      const property = data.property;
      const value = data.value;
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
      return write;
    };

    proxyCallbacks[`${str}-hidden`] = hiddenWrite;
  });

  // Focus Proxy
  const focusMain: SFFocus = {
    clear: () => {
      focus.clear(instanceProxy);
    },
    next: () => {
      focus.next(instanceProxy);
    },
    prev: () => {
      focus.prev(instanceProxy);
    },
  };
  const focusProxy = model.createReadMostlyProxy(focusMain) as SFFocus;

  // + Instance +

  // Create
  const instanceMain: StudioFormInstance = {
    // + Functions +

    // API
    fetch: async (options: SFOFetch = {}) => {
      return await fetch(instanceProxy, options);
    },
    promise: async (info = {}) => {
      return await animatePromiseResolve(instanceProxy, info);
    },
    reportValidity: (...elements) => {
      return reportValidity(instanceProxy, false, ...elements);
    },
    reset: async (
      slideId: null | number | StudioFormSpreadElements = 0,
      options: SFONav | StudioFormSpreadElements = {},
      ...elements
    ) => {
      // Return
      return await reset(instanceProxy, false, slideId, options, ...elements);
    },

    // - Navigation -

    // Special use action
    to: async (slideIdentification, options = {}) => {
      return await navTo(instanceProxy, slideIdentification, options);
    },
    scrollTo: async target => {
      return await scrollTo(instanceProxy, target);
    },
    focus: focusProxy,

    // Native actions
    prev: async (options = {}) => {
      return await navPrev(instanceProxy, options);
    },
    next: async (options = {}) => {
      return await navNext(instanceProxy, options);
    },
    submit: async (options = {}) => {
      return await navSubmit(instanceProxy, options);
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
  const instanceProxy = model.createReadMostlyProxy(
    instanceMain,
    `instance`,
    instanceName
  ) as StudioFormInstance;

  // Auhtorization storage
  const authMain = {
    token: undefined as undefined | string,
  };

  // Writing events
  ['set', 'delete'].forEach(str => {
    const instanceWrite = (data: ProxyWriteEventData) => {
      // Values
      const property = data.property;
      const value = data.value;
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

      // Promise / resolve & submitted
      if (
        property === 'resolve' &&
        (typeof value === 'boolean' || typeof value === 'undefined')
      ) {
        // Guard
        if (!instanceProxy.isAwaiting) return false;

        // Notes:
        // console.log(
        //   'Make sure to make data.fetch.{} deleteable / null! / nullable!'
        // );

        // Dispatch
        viewUtils.dispatchEvent(instanceName, 'resolve', true, false, {
          success: value,
        });

        // Write
        write = true;
      }

      // Write
      return write;
    };
    proxyCallbacks[`${str}-instance`] = instanceWrite;
  });

  // + Ghost instance +
  const ghostInstanceMain: StudioFormGhostInstance = {
    // External read & sometimes write
    animationData: animationDataMain as SFAnimationData,
    fetchData: fetchDataMain,
    record: recordMain,
    root: instanceMain,
    files: filesDataMain,
    validity: validityDataMain,

    // Secret
    auth: authMain,
    hiddenData: hiddenDataSecret,

    // Internal
    asyncRecord: [],
    gsapTl: {},
    slideCurrent: 0 as number | string,
    slideNext: 0 as number | string,

    // Focus
    focus: {},

    // Proxy
    proxyCallbacks: proxyCallbacks,

    // Events
    observer: null,

    // Validity
  };

  // Add proxy
  model.state.ghostInstances[instanceName] = ghostInstanceMain;
  model.state.instances[instanceName] = instanceProxy;
  model.state.api[instanceName] = model.state.instances[instanceName];
};
