// Imports
import elements from './helper/view/elements';
import listener from './helper/view/listener';
import animate from './helper/view/animate';
import * as helper from './helper/helper';
import animateProgress from './helper/view/animateProgress';
import anchor from './helper/view/anchor';

// Export
export default function init(state: any) {
  // Return elements
  elements(state);

  // Generate step logic
  state.model.generateSlideLogic();

  // Calculate initial progress
  state.view.progress = function (options: Options = {}) {
    animateProgress(state.sdk.i, options);
  };
  state.view.progress();

  // Animate anchor
  state.sdk.scrollTo = function (options: Options = {}) {
    anchor(state.sdk.i, options);
  };

  // * Set animate available *

  // Add events infrastrucutre
  const eventFunctionArrays = state.view.eventsFunctionArrays;
  helper.addEventsInfrastrucutre(state, 'Animate');

  // State
  state.view.animate = function (options: Options = {}) {
    helper.triggerAllFunctions(eventFunctionArrays.onAnimate);
    animate(state.sdk.i, options);
    helper.triggerAllFunctions(eventFunctionArrays.afterAnimate);
  };

  // * Init initial style *

  // Steps
  state.sdk.slideLogic.forEach((slide: any) => {
    slide.el.style.display = 'none';
  });
  state.sdk.slideLogic[0].el.style.display = '';

  // Init event listeners
  listener(state);
}
