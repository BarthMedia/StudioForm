// Imports
import * as model from './model';
import view from './view';
import * as helper from './helper/helper';

// + Declare +
declare global {
  var gsap: any;
  interface Window {
    StudioForm: any;
  }
}

// Main
function main() {
  // Guard
  if (typeof window.StudioForm !== 'undefined') {
    console.warn(
      'StudioForm -> controller.ts -> main: Studio Form is being loaded multiple times. However, the functionality should not be affected.'
    );
    return;
  }

  // Define
  const sdk: any[] = [];

  // Elements loop
  document
    .querySelectorAll('[studio-form="wrapper"]')
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
  window.StudioForm = sdk;
}

// Loader
'undefined' === typeof gsap
  ? helper.scriptLoader(
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js',
      main
    )
  : main();
