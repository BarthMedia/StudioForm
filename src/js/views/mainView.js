// + Imports +

// Base

// Custom
import * as config from '../config.js';
import buttonView from './buttonView.js';
// import progressBarView from './progressBarView.js';
// import anchorView from './anchorView.js';
import stepView from './stepView.js';
import swipeGestureView from './swipeGestureView.js';
import autoFocusAndKeyboardEventsView from './autoFocusAndKeyboardEventsView.js';
import manipulateSiteCssView from './manipulateSiteCssView.js';
import fileLabelChange from './fileLabelChange.js';
import urlQueryView from './urlQueryView.js';

// + Classes +

// Base form view
class WebflowView {
  // Add step view handlers
  addStepViewHandlers(stateData) {
    stepView.addHandlers(stateData);
  }

  // Manipulate base css; e.g. Overflow hidden & position absolute & relative
  initSiteCssManipulation(stateData) {
    manipulateSiteCssView.init(stateData);
  }

  // Initialize progress bar --- In stepView.js
  // initProgressBar(stateData) {
  //   // Init
  //   progressBarView.update(stateData);
  // }

  // Initialize buttons
  initButtons(stateData) {
    buttonView.init(stateData);
  }

  // Initialize anchor --- In stepView.js
  // initAnchor(stateData) {
  //   anchorView.init(stateData);
  // }

  // Initialize Keyboard events
  initKeyboardEvents(stateData) {
    autoFocusAndKeyboardEventsView.init(stateData);
  }

  // Initialize Hammer.js
  initSwipeGestures(stateData) {
    swipeGestureView.init(stateData);
  }

  // Initialize file label change feature
  initFileLabelChange(stateData) {
    fileLabelChange.init(stateData);
  }

  // Url query mode
  initUrlQueryMode(stateData) {
    urlQueryView.init(stateData);
  }
}

// + Exports +

// WebflowView object
export default new WebflowView();
