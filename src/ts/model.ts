// Imports
import * as helper from './helper/helper';
import modes from './helper/model/modes';
import slideLogic from './helper/model/slideLogic';
import calculateProgress from './helper/model/calculateProgress';

// Main object
export const state: any[] = [];

// Function
export function init(wrapper: HTMLElement, index: number) {
  // Values
  const obj: any = {};

  // + Define +

  // ELements
  obj.elements = {};
  obj.elements.wrapper = wrapper;

  // * SDK *

  // Base
  obj.sdk = {};
  obj.sdk.i = index;

  // Custom code
  obj.sdk.events = {};

  // 3rd party
  obj.sdk.register = {};

  // Progress
  obj.sdk.slideRecord = [0];

  // Modes
  modes(obj);

  // View init
  obj.view = {};
  obj.view.eventsFunctionArrays = {};

  // Model functions
  obj.model = {};

  // * Add callbacks to model *

  // Generate slide logic
  obj.model.generateSlideLogic = function () {
    slideLogic(index);
  };

  // Calculate progress
  obj.model.generateProgressData = function () {
    const data = calculateProgress(index);
    obj.sdk.pathProgressData = data;
  };

  // Push
  state.push(obj);
}
