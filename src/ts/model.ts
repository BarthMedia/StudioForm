// Imports
import * as helper from './helper/helper';
import modes from './helper/model/modes';
import slideLogic from './helper/model/slideLogic';
import calculateProgress from './helper/model/calculateProgress';
import requirements from './helper/model/requirements';
import post from './helper/model/post';

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

  // Animation data
  obj.sdk.animationData = {};

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

  // Post data
  obj.sdk.data = {};
  obj.model.post = async function () {
    return post(index);
  };

  // Calculate progress
  obj.model.generateProgressData = function () {
    const data = calculateProgress(index);
    obj.sdk.pathProgressData = data;
  };

  // Check step requirements
  obj.sdk.slideRequirements = function (
    slideId: number,
    options: Options = {}
  ) {
    return requirements(index, slideId, options);
  };

  // Push
  state.push(obj);
}
