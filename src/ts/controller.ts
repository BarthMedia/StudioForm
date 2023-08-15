// Imports
import * as model from './model';
import view from './view';
import * as helper from './helper/helper';

// + Declare +
declare var ls: any;
declare var gsap: any;
declare global {
  interface Window {
    StudioForm: any;
  }
}

// Main
function main() {
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
      load2ndScript
    )
  : load2ndScript();

function load2ndScript() {
  'undefined' === typeof ls
    ? helper.scriptLoader(
        'https://cdn.jsdelivr.net/npm/localstorage-slim',
        main
      )
    : main();
}
