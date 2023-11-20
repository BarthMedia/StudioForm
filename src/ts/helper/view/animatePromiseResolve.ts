// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as config from '../../config';
import * as model from '../../model';

// Error path
const errPath = (n: string) =>
  `${controllerUtils.errorName(n)} animatePromiseResolve.ts:`;

// Export active / inactive
export default async function (instance: StudioFormInstance, internal = true) {
  // Guard
  if (instance.isAwaiting)
    throw new Error(
      `${errPath(instance.name)} There is already an active promise!`
    );

  // Values
  const awaitAttr = 'await';
  const ghost = model.state.ghostInstances[instance.name];
  const slide = instance.logic[instance.record[instance.record.length - 1]];
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
      .querySelectorAll(outer.join(','))
      .forEach(el => elements.push(el as HTMLElement));

    // Return
    return elements.map(el => {
      return { el: el, mode: mode, class: awaitAttr };
    });
  }

  // Overwrite
  ghost.root.isAwaiting = true;

  // Dispatch event
  utils.dispatchEvent(
    instance.name,
    'promise' + (internal ? '' : '-api'),
    true,
    {
      slide: slide,
    }
  );

  // Style children with class
  utils.classListToggle(...getElements('add'));

  // Event listener
  instance.elements.mask.addEventListener('resolve', e => resolve(e), {
    once: true,
  });

  // Define function
  function resolve(e: Event) {
    // Overwrite
    ghost.root.isAwaiting = false;

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
