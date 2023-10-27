// Imports
import * as model from './model';
import view from './view';
import * as helper from './helper/helper';
import * as config from './config';

// global.d.ts
import { gsap } from 'gsap';

// + Declare +
declare global {
  interface Window {
    gsap: typeof gsap;
    [config.PRODUCT_NAME_CAMEL_CASE]: StudioForm;
  }
}

// Main
const errPath = `${config.PRODUCT_NAME_CAMEL_CASE} -> controller.ts:`;
function main() {
  // Allow 3rd party args functionality
  let api = window[config.PRODUCT_NAME_CAMEL_CASE];
  let args: unknown[] = [];
  if (Array.isArray(api)) {
    args = api || [];
  }

  // Guard
  if (typeof api !== 'undefined' && !Array.isArray(api)) {
    console.warn(
      `${errPath} ${config.PRODUCT_NAME_CAMEL_CASE} is being loaded multiple times. However, the functionality should not be affected.`
    );
    return;
  }

  // + Define functions +

  // Push
  const push = (...args: unknown[]) => {
    args.forEach((arg, i) => {
      if (typeof arg === 'function') {
        // Execute the function
        arg(api);
      } else {
        // Warn
        console.warn(`${errPath} `, arg, ' is not a function!');
      }
    });
  };

  // Init
  const init = (...args: unknown[]) => {
    // Values -- initAllNewOrReInitNamesOrReInitAll
    if (args.length === 0) {
      args = [false];
    }

    // Reinit logic
    if (!(args.length === 1 && args[0] === false)) destroy(...args);

    // Initialize
    view(model.state);
  };

  // Destroy
  const destroy = (...args: unknown[]) => {
    // Values -- allOrNames
    if (args.length === 0) {
      args = [false];
    }

    // Loop
    args.forEach((arg, i) => {
      if (typeof arg === 'function') {
        // Execute the function
        arg(api);
      } else {
        // Warn
        console.warn(`${errPath} `, arg, ' is not a function!');
      }
    });

    console.log('destroy everythign!', args);
  };

  // + Init internal state +
  model.init(push, init, destroy);
  api = model.state.proxy;

  // Add
  window[config.PRODUCT_NAME_CAMEL_CASE] = api;

  // + Initialize +
  api['init']();
  // @ts-ignore
  api['push'](...args);

  // Elements loop
  // document
  //   .querySelectorAll(
  //     `[${config.PRODUCT_NAME}="wrapper"], [${config.PRODUCT_NAME}="mask"]`
  //   )
  //   .forEach((wrapper, index) => {
  //     // Init
  //     model.init(wrapper as HTMLElement, index);
  //     view(model.state[index]);

  //     // Grant simple or advanced api access
  //     // api.push(model.state[index].api);
  //   });

  // Define
  // const api: StudioFormInstance[] = [];

  // Add state to window
  // window[config.PRODUCT_NAME_CAMEL_CASE] = api;
}

// Loader
'undefined' === typeof gsap
  ? helper.scriptLoader(
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js',
      loaderLogic
    )
  : loaderLogic();
function loaderLogic() {
  // Check if DOM is already loaded
  if (document.readyState === 'loading') {
    // If DOM is not loaded, add an event listener
    document.addEventListener('DOMContentLoaded', main);
  } else {
    // If DOM is already loaded, immediately call the callback
    main();
  }
}
