// Imports
import * as utils from './utils';
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
    if (utils.getAttribute(null, slideEl) === awaitAttr) elements.push(slideEl);
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

  // Overwrite
  const rootInstance = ghost.root;
  rootInstance.isAwaiting = true;

  // Dispatch event
  const globalConfig = model.state.api['config'];
  const promiseEvent = utils.dispatchEvent(
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
    rootInstance.isAwaiting = false;
    return false;
  }

  // Alternative promise
  if (isSubmit) {
    // Guard
    if (!asyncCallBack) return false;

    // Values
    const val = await asyncCallBack();
    rootInstance.isAwaiting = false;
    return val;
  }

  // Style children with class
  utils.classListToggle(...getElements('add'));

  // Event listener
  instance.elements.mask.addEventListener(
    globalConfig.eventPrefix +
      (isSubmit
        ? 'fetched' + (internal ? '' : globalConfig.externalEventSuffix)
        : 'resolve'),
    e => resolve(e),
    {
      once: true,
    }
  );

  // Define function
  function resolve(e: Event) {
    // Overwrite
    rootInstance.isAwaiting = false;

    // Remove style children with class
    utils.classListToggle(...getElements());

    // Return
    promisedResolve(e['detail']?.success);
  }

  // Promise
  let promisedResolve: (value: boolean) => void = () => {};
  async function asyncFunction(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      promisedResolve = resolve;
    });
  }

  // Usage
  return await asyncFunction();
}
