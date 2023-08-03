// + Imports +

// Ideas !

// Add a anchor up to error notice function

// Add define Key-Rotation .js - when not declared otherwise functionality

// When standard checkbox is used make checkbox text red.
// When custom checkbox is used turn checkbox border red by default

// Build a feature that automatically renders the Xano response in the success message

// If there is an additional info field below a checkbox step, the step is validated if the textarea has content inside of it

// Keyboard actions have to actually click the options.
// Not just animate them!

// While focus or hover on input fields.
// Make sure arrow functions don't work

// Build native FinSweet RangeSlider integration

// Frid 12. May 06:29 ideas
// Maybe change styles to userConfig ?
// Consider rebuilding everything in vanilla JS / maybe type script for that matter
// Consider splitting config file into multipile files
// Have userStyles & userConfig

// 19.05.2023
// Implement click based keyboard actions. Not function based
// Generally work with a more click based architecture. As much as possible

// Base
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Custom
import view from './views/mainView.js';
import * as model from './model.js';
import loader from './utils/controller/loader.js';
import { FORM_BLOCK_SELECTOR } from './config.js';
import creatNextStepObject from './utils/model/creatNextStepObject.js';

// + Functions +

// Main
const controlMain = function () {
  // Add studio form state to window
  window.StudioForm = model.state;

  // Multi instance loop
  $(FORM_BLOCK_SELECTOR).each(function (index) {
    // Create state
    const stateData = model.createState($(this), index);

    // Values
    const { elements } = stateData,
      { handlers } = stateData;

    // Zhaw adjustments !!!
    $('input[type="checkbox"]').val('off');
    $('input[type="checkbox"]').click(function () {
      // Elements
      const $checkbox = $(this);

      // Variables
      if ($checkbox.attr('data-is-clicked') === 'true') {
        // Toggle set
        $checkbox.attr('data-is-clicked', 'false');
        $checkbox.val('off');
      } else {
        // Toggle set
        $checkbox.attr('data-is-clicked', 'true');
        $checkbox.val('on');
      }
    });

    // - Functions -

    // console.log(
    //   'Implement the idea of appliying .is-selected classes to every element within a selection -- and GSAP Flip that selection.'
    // );

    // DEFINITELY BUILD PROPER INPUT TYPE VALIDATION AND AUTO-FILL ALONG THE WAY

    // Manipulate base css
    view.initSiteCssManipulation(stateData);

    // Initialize buttons
    view.initButtons(stateData);

    // - Create next step object -
    stateData.stepLogic = creatNextStepObject(elements.$steps);

    // Add step view handlers
    view.addStepViewHandlers(stateData);

    // Initialize keyboard events
    view.initKeyboardEvents(stateData);

    // Initialize swipe gestures
    view.initSwipeGestures(stateData);

    // stateData.devMode = 0;

    // Dev mode log
    handlers.devModeLog(stateData);

    // Init Xano Mode
    model.initXanoMode(stateData);

    // Init file label change feature
    view.initFileLabelChange(stateData);

    // Init url query mode
    view.initUrlQueryMode(stateData);
  });
};

// + Initialize +
const init = function () {
  loader(controlMain);
};
init();
