// Imports
import * as helper from './helper/helper';
import modes from './helper/model/modes';
import slideLogic from './helper/model/slideLogic';

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

  // SDK
  obj.sdk = {};
  obj.sdk.i = index;
  obj.sdk.events = {};
  obj.sdk.eventsFunctionArrays = {};
  obj.sdk.trigger = {};

  // Modes
  modes(obj);

  // View init
  obj.view = {};

  // Model functions
  obj.model = {};

  // * Add callbacks to model *

  // Generate slide logic
  obj.model.generateSlideLogic = function () {
    slideLogic(index);
  };

  // Push
  state.push(obj);
}
