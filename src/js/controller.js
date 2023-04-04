// + Imports +

// Base
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Custom
import view from './views/view.js';
import * as model from './model.js';
import loader from './helper/loader.js';
import { FORM_BLOCK_SELECTOR } from './config.js';
import creatNextStepObject from './helper/creatNextStepObject.js';

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
