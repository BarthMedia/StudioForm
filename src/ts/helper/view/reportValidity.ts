// Imports
import * as utils from './utils';
import * as eventUtils from './utilsEvents';
import * as modelUtils from '../model/utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// Model
import requirements from '../model/requirements';

// Scroll to
import scrollTo from './scrollTo';

// Error
const errPath = (s: StudioFormInstance) =>
  `${controllerUtils.errorName(s)} required.ts:`;

// Export
export default function (
  instance: StudioFormInstance,
  internal = false,
  ...elements: StudioFormSpreadElements
) {
  // Values
  // const record = instance.record;
  // const slideEl = instance.logic[modelUtils.currentSlideId(instance)].element;

  // New feature guard
  if (elements.length) {
    // Values
    const _elements: HTMLElement[] = [];

    // Loop
    elements.forEach(element => {
      // Is string
      if (typeof element === 'string')
        document
          .querySelectorAll(element)
          .forEach(node => _elements.push(node as HTMLElement));
    });

    // Just animate towards the list and apply the combo classes!
    renderValidity(_elements);

    // Return
    return undefined;
  }

  // Dispatch requirements testing event
  eventUtils.dispatchEvent(instance, 'check-requirements', internal, false);

  // Requirements checking
  if (requirements(instance)) return true;

  // Dispatch report Validity
  const event = eventUtils.dispatchEvent(
    instance,
    'report-validity',
    internal,
    true
  );

  // Guard
  if (event.defaultPrevented) return false;

  // Values
  const mappedElements = instance.data.validity.map(val => val.input);

  // Render
  renderValidity(mappedElements);

  // Default
  return false;

  // * * * Render * * *

  // * Define *
  async function renderValidity(elements: HTMLElement[]) {
    // Guard
    if (elements.length < 1) return;

    // Values & elements
    const element0 = elements[0];
    const element0IsInput = [
      HTMLInputElement,
      HTMLSelectElement,
      HTMLTextAreaElement,
    ].some(type => element0 instanceof type);
    const modes = instance.config.modes;

    // Report native validity
    function _reportValidity() {
      if (instance.config.modes.nativeReportValidity && element0IsInput)
        (
          element0 as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        ).reportValidity();
    }

    // * Scroll to the first element and if not visible *

    // Calculate
    const target = utils.closestCascader(element0);
    const isFullyVisible = utils.isElementTopVisible(instance, target, true);

    // Logic
    if (
      (modes.scrollToValidity && !isFullyVisible) ||
      modes.forceScrollToValidity
    ) {
      // Values
      const res = await scrollTo(instance, target, internal);

      // Logic
      if (res) _reportValidity();
    }

    // Declare native error
    if (
      modes.nativeReportValidity &&
      isFullyVisible &&
      !modes.forceScrollToValidity
    )
      _reportValidity();

    // Class list toggle
    function toggle(el: HTMLElement, mode: string) {
      utils.classListToggle({
        element: el,
        class: 'required',
        mode: mode,
        closest: { cascader: true },
      });
    }

    // Delay
    setTimeout(() => {
      // Add class loop
      elements.forEach(el => {
        // Toogle
        toggle(el, 'add');
      });

      // Event listener
      document.body.addEventListener(
        'click',
        function () {
          // Remove class loop
          elements.forEach(el => {
            // Toogle
            toggle(el, 'remove');
          });
        },
        { once: true }
      );
    }, 1);
  }
}
