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

// Base
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Custom
import view from './views/view.js';
import * as model from './model.js';
import loader from './utils/controller/loader.js';
import { FORM_BLOCK_SELECTOR } from './config.js';
import creatNextStepObject from './utils/model/creatNextStepObject.js';

// + Functions +

// Main
const controlMain = function () {
  // Multi instance loop
  $(FORM_BLOCK_SELECTOR).each(function (index) {
    // Create state
    const stateData = model.createState($(this), index);

    // Values
    const { elements } = stateData,
      { handlers } = stateData;

    // - Functions -

    // console.log(
    //   'Write an Add-on script that changes the name / value of the choose file label.'
    // );

    // console.log(
    //   'Build a feature that checks if at least on radio of a radio group is checked! Think about default style. Probably have it not be greyed out!'
    // );

    // console.log('Build on error scroll to feature ');

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
  });
};

// + Initialize +
const init = function () {
  loader(controlMain);
};
init();
