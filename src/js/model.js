// + Imports +

// Base

// Custom
import * as config from './config.js';
import { returnDevModeIndex } from './helper';
import createElements from './helper/createElements.js';
import populateStylesObject from './helper/populateStylesObject.js';

// + Objects +

// State
export const state = {
  data: {},
};

// + Functions +

// Create state
export const createState = function ($formBlock, index) {
  // Add
  state.data[`form${index}`] = {
    // Index
    formBlockIndex: index,

    // Create initial elements
    elements: createElements($formBlock, index),

    // Initial click record object
    clickRecord: [{ step: 0 }],

    // Styles
    styles: populateStylesObject($formBlock),

    // Environment variables
    keyEventsAllowed: true,
    devMode: returnDevModeIndex($formBlock),
    autoDetectNextStep:
      ($formBlock.attr(config.AUTO_DETECT_NEXT_STEP_ATTRIBUTE) ||
        config.AUTO_DETECT_NEXT_STEP_DEFAULT) == 'true',

    // Handlers
    handlers: {
      devModeLog: function (stateData) {
        if (stateData.devMode)
          console.log(
            `Dev Mode ${stateData.devMode}:\nstate -> data -> form${stateData.formBlockIndex}:\n`,
            stateData
          );
      },
    },
  };

  // Return
  return state.data[`form${index}`];
};
