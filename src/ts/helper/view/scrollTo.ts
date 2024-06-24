// Imports
import * as utils from './utils';
import * as eventListenerUtils from './utilsEvents';
import * as modelUtils from '../model/utils';
import * as controllerUtils from '../controller/utils';
import * as eventUtils from './utilsEvents';
import * as model from '../../model';
import * as config from '../../config';

// Eroor
const errPath = (s: StudioFormInstance) =>
  `${controllerUtils.errorName(s)} scrollTo.ts:`;

// Export
export default async function (
  instance: StudioFormInstance,
  _target: HTMLElement | string,
  internal = false
) {
  // Elements
  const target =
    typeof _target === 'string'
      ? (document.querySelector(_target) as HTMLElement | null)
      : _target;

  // Values
  const modes = instance.config.modes;

  // Guard
  if (!target || !utils.isElement(target))
    throw new Error(`${errPath(instance)} Invalid target!`);

  // Mode guard
  if (!modes.scrollToTarget) return false;

  // Elements
  const scrollToElement: HTMLElement | null = instance.elements.wrapper.closest(
    utils.createSelector(null, 'window')
  );
  const scrollToContainer = scrollToElement || window;

  // * Values *

  // Return target element and offset number
  const offset = utils.returnScrollToOffset(instance);

  // Math
  let y =
    target.getBoundingClientRect().top -
    (scrollToElement ? scrollToElement.getBoundingClientRect().top : 0) +
    (scrollToElement ? scrollToElement.scrollTop : window.scrollY) -
    offset;
  y = Math.max(y, 0);

  // Update animationData
  Object.assign(modelUtils.returnGhost(instance).animationData, {
    scrollToY: y,
    scrollToTarget: target,
    scrollToOffset: offset,
    scrollToContainer: scrollToContainer,
  });

  // Logic
  const scrollTargetReached = () =>
    scrollToElement
      ? Math.floor(scrollToElement.scrollTop) + 1 >= y &&
        Math.ceil(scrollToElement.scrollTop) - 1 <= y
      : Math.floor(window.scrollY) + 1 >= y &&
        Math.ceil(window.scrollY) - 1 <= y;

  // Logic
  if (scrollTargetReached()) return true;

  // Event
  const event = eventUtils.dispatchEvent(
    instance,
    'scroll-start',
    internal,
    true
  );

  // Guard
  if (event.defaultPrevented) return false;

  // Create a new Promise
  const scrollPromise: Promise<true> = new Promise((resolve, reject) => {
    // Event listener
    function scrollListener() {
      // Check if scrolling has reached the target element
      if (scrollTargetReached()) {
        // Remove the event listener to avoid unnecessary callbacks
        scrollToContainer.removeEventListener('scroll', scrollListener);

        // Resolve the promise with the value true
        eventUtils.dispatchEvent(instance, 'scroll-end', internal);
        resolve(true);
      }
    }

    // Listen for the 'scroll' event on the scrolling container (usually the scrollToContainer)
    eventListenerUtils.addEventListener(
      instance,
      scrollToContainer,
      'scroll',
      scrollListener
    );

    // Animate
    scrollToContainer.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  });

  // Return the promise
  return scrollPromise;
}
