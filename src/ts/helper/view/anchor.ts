// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (stateId: number, options: Options) {
  // Values
  const state = model.state[stateId];

  // Mode guard
  if (options.scrollToTarget === false || !state.modes.scrollToTarget) return;

  // * Values *

  // Return target element and offset number
  const obj = helper.returnTargetAndOffset(state, options);

  // Math
  let y: number =
    obj.target.getBoundingClientRect().top + window.scrollY - obj.offset;
  y = Math.max(y, 0);

  // Event listener
  let timeoutId: any; // To store the timeout ID

  // Define
  function scrollListener() {
    // Check if scrolling has reached the target element
    if (
      Math.floor(window.scrollY) + 1 >= y &&
      Math.ceil(window.scrollY) - 1 <= y
    ) {
      // Remove the event listener to avoid unnecessary callbacks
      window.removeEventListener('scroll', scrollListener);

      // Clear the timeout to prevent the callback from firing due to timeout
      clearTimeout(timeoutId);

      // Call the provided callback function
      if (typeof options.callback === 'function') {
        options.callback(true);
      }
    }
  }

  // Listen for the 'scroll' event on the scrolling container (usually the window)
  window.addEventListener('scroll', scrollListener);

  // Set a timeout for the given duration
  timeoutId = setTimeout(function () {
    // Remove the event listener if the timeout expires
    window.removeEventListener('scroll', scrollListener);

    // Callback
    if (typeof options.callback === 'function') {
      options.callback(false);
    }

    // Warn
    console.warn(
      `StudioForm[${state.sdk.i}] -> anchor.ts -> default -> setTimeout() callback: Scrolling operation timed out.`,
      { y: y, target: obj.target, offset: obj.offset }
    );
  }, config.TIMEOUT_SEC * 1000);

  // Animate
  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });

  // Update animationData
  state.sdk.animationData.scrollToY = y;
  state.sdk.animationData.scrollToTarget = obj.target;
  state.sdk.animationData.scrollToOffset = obj.offset;
}
