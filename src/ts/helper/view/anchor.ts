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

  // Selector
  const targetSelector =
    typeof options.target === 'string'
      ? options.target
      : undefined ||
        options.attributeReferenceElement?.getAttribute(
          'data-scroll-to-target'
        ) ||
        state.elements.wrapper?.getAttribute('data-scroll-to-target') ||
        '';
  const offsetSelector =
    typeof options.offset === 'string'
      ? options.offset
      : undefined ||
        options.attributeReferenceElement?.getAttribute(
          'data-scroll-to-offset'
        ) ||
        state.elements.wrapper?.getAttribute('data-scroll-to-offset') ||
        '';

  // Elements
  const target: HTMLElement = helper.isElement(options.target)
    ? options.target
    : targetSelector !== ''
    ? document.querySelector(targetSelector) || state.elements.wrapper
    : state.elements.wrapper;
  let offset: any = helper.isElement(options.offset)
    ? options.target
    : offsetSelector !== ''
    ? document.querySelector(
        typeof options.offset === 'string' ? options.offset : offsetSelector
      )
    : null;
  offset =
    typeof options.offset === 'number'
      ? options.offset
      : offset?.offsetHeight || config.DEFAULT_OFFSET;

  // Math
  let y: number = target.getBoundingClientRect().top + window.scrollY - offset;
  y = Math.max(y, 0);

  // Animate
  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });

  // Event listener
  let timeoutId: any; // To store the timeout ID

  // Define
  function scrollListener() {
    // Check if scrolling has reached the target element
    if (Math.round(window.scrollY) === Math.round(y)) {
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
      { y: y, target: target, offset: offset }
    );
  }, config.TIMEOUT_SEC * 1000);

  // Update animationData
  state.sdk.animationData.scrollToY = y;
  state.sdk.animationData.scrollToTarget = target;
  state.sdk.animationData.scrollToOffset = offset;
}
