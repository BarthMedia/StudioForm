// Imports
import elements from './helper/view/elements';
import listener from './helper/view/listener';
import animate from './helper/view/animate';

// Export
export default function init(state: any) {
  // Return elements
  elements(state);

  // Generate step logic
  state.model.generateSlideLogic();

  // Calculate initial progress
  state.model.generateProgressData();

  // Set animate available
  state.view.animate = function (options: Options = {}) {
    animate(state.sdk.i, options);
  };

  // Init initial style
  state.sdk.slideLogic.forEach((slide: any) => {
    slide.el.style.display = 'none';
  });
  state.sdk.slideLogic[0].el.style.display = '';

  // Init event listeners
  listener(state);
}
