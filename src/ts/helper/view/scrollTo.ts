// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${helper.errorName(s)}scrollTo.ts -> default`;
export default function (stateId: number, options: Options) {
  // Values
  const state = model.state[stateId];

  // Mode guard
  if (options.scrollToTarget === false || !state.modes.scrollToTarget) return;

  // Elements
  const scrollToElement: HTMLElement | null = state.elements.wrapper.closest(
    ['window-scroll'].map(str => `[${config.PRODUCT_NAME}="${str}"]`).join(', ')
  );
  const scrollToContainer: HTMLElement | Window = scrollToElement || window;

  // * Values *

  // Return target element and offset number
  const obj = helper.returnTargetAndOffset(state, options);

  // Math
  let y: number =
    obj.target.getBoundingClientRect().top -
    (scrollToElement ? scrollToElement.getBoundingClientRect().top : 0) +
    (scrollToElement ? scrollToElement.scrollTop : window.scrollY) -
    obj.offset;
  y = Math.max(y, 0);

  // Event listener
  let timeoutId: any; // To store the timeout ID

  // Define
  function scrollListener() {
    // Logic
    const bool = scrollToElement
      ? Math.floor(scrollToElement.scrollTop) + 1 >= y &&
        Math.ceil(scrollToElement.scrollTop) - 1 <= y
      : Math.floor(window.scrollY) + 1 >= y &&
        Math.ceil(window.scrollY) - 1 <= y;

    // Check if scrolling has reached the target element
    if (bool) {
      // Remove the event listener to avoid unnecessary callbacks
      scrollToContainer.removeEventListener('scroll', scrollListener);

      // Clear the timeout to prevent the callback from firing due to timeout
      clearTimeout(timeoutId);

      // Call the provided callback function
      setTimeout(() => {
        if (typeof options.callback === 'function') options.callback(true);
      }, 1);
    }
  }

  // Listen for the 'scroll' event on the scrolling container (usually the scrollToContainer)
  scrollToContainer.addEventListener('scroll', scrollListener);

  // Set a timeout for the given duration
  timeoutId = setTimeout(function () {
    // Remove the event listener if the timeout expires
    scrollToContainer.removeEventListener('scroll', scrollListener);

    // Callback
    if (typeof options.callback === 'function') {
      options.callback(false);
    }

    console.log(
      'allow numbers inside of offset selector!',
      'sf-offset, general purpose!'
    );

    console.log("sf-name shall work in .to('Step 56')");

    // Warn
    console.warn(
      `${errPath(
        state
      )} -> setTimeout() callback: Scrolling operation timed out.`,
      { y: y, target: obj.target, offset: obj.offset }
    );
  }, config.TIMEOUT_SEC * 1000);

  // Animate
  scrollToContainer.scrollTo({
    top: y,
    behavior: 'smooth',
  });

  // Update animationData
  state.sdk.animationData.scrollToY = y;
  state.sdk.animationData.scrollToTarget = obj.target;
  state.sdk.animationData.scrollToOffset = obj.offset;
  state.sdk.animationData.scrollToContainer = scrollToContainer;
}
