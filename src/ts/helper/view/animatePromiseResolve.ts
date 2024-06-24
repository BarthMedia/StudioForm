// Imports
import * as utils from './utils';
import * as attributeUtils from './utilsAttributes';
import * as eventUtils from './utilsEvents';
import * as modelUtils from '../model/utils';
import * as controllerUtils from '../controller/utils';
import * as config from '../../config';
import * as model from '../../model';

// Error path
const errPath = (n: string) =>
  `${controllerUtils.errorName(n)} animatePromiseResolve.ts:`;

// Export active / inactive
export default async function (
  instance: StudioFormInstance,
  info = {},
  internal = true,
  isSubmit = false,
  asyncCallBack?: () => Promise<boolean>
) {
  // Guard
  if (instance.isAwaiting)
    throw new Error(
      `${errPath(instance.name)} There is already an active promise!`
    );

  // Values
  const awaitAttr = 'await';
  const ghost = modelUtils.returnGhost(instance);
  const slide = instance.logic[modelUtils.currentSlideId(instance)];
  function getElements(mode = 'remove') {
    // Values
    const inner = utils.createSelector(null, awaitAttr);
    const outer = [
      `[${config.PRODUCT_NAME_SHORT}-${instance.name}="${awaitAttr}"]`,
      `[${config.PRODUCT_NAME_LONG}-${instance.name}="${awaitAttr}"]`,
    ];
    const elements: HTMLElement[] = [];

    // Select
    const slideEl = slide.element;
    if (attributeUtils.getAttribute(null, slideEl) === awaitAttr)
      elements.push(slideEl);
    slideEl
      .querySelectorAll(inner)
      .forEach(el => elements.push(el as HTMLElement));
    document
      .querySelectorAll(outer.join())
      .forEach(el => elements.push(el as HTMLElement));

    // Return
    return elements.map(el => {
      return { element: el, mode: mode, class: awaitAttr };
    });
  }
  const globalConfig = model.state.api['config'];
  const rootInstance = ghost.root;

  // * Old dispatch position *

  // Set await / overwrite
  rootInstance.isAwaiting = true;

  // Style children with class
  utils.classListToggle(...getElements('add'));

  // Submit / alternative promise
  if (isSubmit) {
    // Guard
    if (!asyncCallBack) return false;

    // Values
    const val = await asyncCallBack();
    rootInstance.isAwaiting = false;

    // Remove style children with class
    utils.classListToggle(...getElements());

    // Return
    return val;
  }

  // Promise
  let promisedResolve: (value: boolean) => void = () => {};
  let preMatureResolve = false;
  async function asyncFunction(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      promisedResolve = resolve;
    });
  }

  // Define function
  function resolve(e: Event) {
    // Overwrite
    rootInstance.isAwaiting = false;

    // Remove style children with class
    utils.classListToggle(...getElements());

    // Return
    const result = e['detail']?.success;
    preMatureResolve = result;
    promisedResolve(result);
  }

  // Resolve event listener
  const mask = instance.elements.mask;
  const resolveEventType =
    globalConfig.eventPrefix +
    (isSubmit
      ? 'fetched' + (internal ? '' : globalConfig.externalEventSuffix)
      : 'resolve');

  // Listen
  mask.addEventListener(resolveEventType, resolve, {
    once: true,
  });

  // Dispatch event
  const promiseEvent = eventUtils.dispatchEvent(
    instance,
    isSubmit ? 'submit' : 'promise',
    internal,
    true,
    {
      ...info,
      slide: slide,
    }
  );

  // Listen to prevent default
  if (promiseEvent.defaultPrevented) {
    // Remove style children with class
    utils.classListToggle(...getElements());

    // Remove event listener
    mask.removeEventListener(resolveEventType, resolve);

    // Reset await
    rootInstance.isAwaiting = false;
    return false;
  }

  // New premature resolve
  if (preMatureResolve) return true;

  // Usage
  return await asyncFunction();
}
