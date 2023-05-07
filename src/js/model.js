// + Imports +

// Base

// Custom
import * as config from './config.js';
import { returnDevModeIndex } from './helper';
import createElements from './utils/model/createElements.js';
import populateStylesObject from './utils/model/populateStylesObject.js';
import calculateStepHeights from './utils/model/calculateStepHeights.js';
import * as xanoMode from './utils/model/xanoMode.js';

// + Objects +

// State
export const state = {
  data: {},
};

// + Functions +

// Initialize mode
export const initXanoMode = function (stateData) {
  xanoMode.init(stateData);
};

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
    // styles: populateStylesObject($formBlock),

    // Environment variables
    keyEventsAllowed: true,
    devMode: returnDevModeIndex($formBlock),
    autoDetectNextStep:
      ($formBlock.attr(config.AUTO_DETECT_NEXT_STEP_ATTRIBUTE) ||
        config.AUTO_DETECT_NEXT_STEP_DEFAULT) == 'true',

    // Handlers
    handlers: {
      devModeLog: function (stateData) {
        // Guard
        if (!stateData.devMode /*&& !stateData.xanoMode*/) return;

        // Log
        console.log(
          `Dev Mode ${stateData.devMode}:\nstate -> data -> form${stateData.formBlockIndex}:\n`,
          stateData
        );
      },
    },
  };

  // Values
  const stateData = state.data[`form${index}`];

  // console.log(stateData.elements);

  // Add styles
  stateData.styles = populateStylesObject(stateData.elements);

  // Add step heihgts
  calculateStepHeights(stateData);

  // Is xano mode
  stateData.xanoMode = xanoMode.isXanoMode(stateData.elements);

  // Is slider mode
  stateData.sliderMode = !$formBlock.hasClass(config.W_FORM_BLOCK_CLASS);

  // Return
  return stateData;
};

// console.log(
//   done. 'Implement idea that the closest section get set to overflow hidden automatically, if form block is not set to overflow hidden or the attribute allows / not disallows it.'
// );

// Implement an easy to use xano mode
