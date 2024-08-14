// Imports
import * as model from './model';
import view from './view';
import * as config from './config';
import * as utils from './helper/controller/utils';
import * as viewUtils from './helper/view/utils';

// global.d.ts
import { gsap } from 'gsap';

// + Declare +
declare global {
  interface Window {
    gsap: typeof gsap;
    [config.PRODUCT_NAME_CAMEL_CASE]: StudioForm;
    Wized: unknown;
    grecaptcha: unknown;
  }
}

// Error
const errPath = `${config.PRODUCT_NAME_CAMEL_CASE} -> controller.ts:`;

// Main
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
      `${errPath} ${config.PRODUCT_NAME_CAMEL_CASE} is being loaded multiple times. The functionality should not be affected.`
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
        utils.warn(`${errPath} `, arg, ' is not a function!');
      }
    });
  };

  // Init
  const init = () => {
    // Initialize
    view(model.state);
  };

  // + Init internal state +
  model.init(push, init);
  api = model.state.proxy;

  // Add
  window[config.PRODUCT_NAME_CAMEL_CASE] = api;

  // Loop
  document
    .querySelectorAll(
      [config.PRODUCT_NAME_SHORT, config.PRODUCT_NAME_LONG]
        .map(str => `[${str}-cloak]`)
        .join()
    )
    .forEach(el => {
      // Add to classList
      viewUtils.classListToggle({
        element: el as HTMLElement,
        mode: 'add',
        class: 'hide',
      });
    });

  // + Initialize +
  api['init']();
  // @ts-ignore
  api['push'](...args);
}

// + Loader +

// GSAP
const gsapSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
const gsapScript = document.querySelector('script[src*="/gsap.min.js"]');
gsapScript
  ? (() => {
      const gsapCheckInterval = setInterval(() => {
        if (window.gsap) {
          clearInterval(gsapCheckInterval);
          loaderLogic();
        }
      }, 4);
    })()
  : utils.scriptLoader(gsapSrc, loaderLogic);

// Main
function loaderLogic() {
  // Check if DOM is already loaded
  if (document.readyState === 'loading') {
    // If DOM is not loaded, add an event listener
    document.addEventListener('DOMContentLoaded', main);
  } else {
    // If DOM is already loaded, immediately call the callback
    setTimeout(main, 1);
  }
}
