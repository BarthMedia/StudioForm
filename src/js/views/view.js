// + Imports +

// Base

// Custom
import * as config from '../config.js';
import buttonView from './buttonView.js';
import progressBarView from './progressBarView.js';
import anchorView from './anchorView.js';
import stepView from './stepView.js';

// + Classes +

// Base form view
class WebflowView {
  // Add step view handlers
  addStepViewHandlers(stateData) {
    stepView.addHandlers(stateData);
  }

  // Initialize progress bar
  initProgressBar(stateData) {
    // Init
    progressBarView.update(stateData);
  }

  // Initialize buttons
  initButtons(stateData) {
    buttonView.init(stateData);
  }

  // Initialize anchor
  initAnchor(stateData) {
    anchorView.init(stateData);
  }

  // Delete visual dividers
  removeVisualDividers(devMode, elements) {
    if (devMode < 2) {
      // If dev mode is 200% or higher, do not:
      elements.$form.find(config.DIVIDER_SELCTOR).remove();
      elements.$steps.hide();
      elements.$steps.eq(0).show();
    } else {
      console.log(`Dev mode ${devMode}: Visual dividers not removed...`);
    }
  }
}

// + Exports +

// WebflowView object
export default new WebflowView();
