// Imports
import * as model from './model';
import view from './view';
import * as helper from './helper/helper';
import * as config from './config';

// + Declare +
declare global {
  var gsap: any;
  interface Window {
    [config.PRODUCT_NAME_CAMEL_CASE]: any;
  }
}

// Main
function main() {
  // Guard
  if (typeof window[config.PRODUCT_NAME_CAMEL_CASE] !== 'undefined') {
    console.warn(
      `${config.PRODUCT_NAME_CAMEL_CASE} -> controller.ts -> main: Studio Form is being loaded multiple times. However, the functionality should not be affected.`
    );
    return;
  }

  // Define
  const sdk: any[] = [];

  // Elements loop
  document
    .querySelectorAll(`[${config.PRODUCT_NAME}="wrapper"]`)
    .forEach((wrapper, index) => {
      // Init
      model.init(wrapper as HTMLElement, index);
      view(model.state[index]);

      // Grant simple or advanced sdk access
      model.state[index].modes.simpleSdk
        ? sdk.push(model.state[index].sdk)
        : sdk.push(model.state[index]);
    });

  // Add state to window
  window[config.PRODUCT_NAME_CAMEL_CASE] = sdk;
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
