// Imports
import * as helper from '../helper';

// Export
export default function (state: any) {
  // Values
  const obj = state.elements;
  const el: HTMLElement = state.elements.wrapper;

  // * Add to elements *

  // Mask
  obj.mask =
    el.querySelector('[studio-form="mask"]') || el.querySelector('form');

  // Dividers
  const dividers = obj.mask?.querySelectorAll(
    '[studio-form="Visual Divider"], [studio-form="visual-divider"], [studio-form="divider"]'
  );
  if (state.modes.removeVisualDividers)
    dividers.forEach((divider: HTMLElement) => divider.remove());

  // Remove conditionally invisible slides
  if (state.modes.removeConditionallyInvisibeSlides) {
    obj.mask?.childNodes.forEach((slide: HTMLElement) => {
      if (slide.classList.contains('w-condition-invisible')) slide.remove();
    });
  }

  // Slides
  obj.slides = obj.mask?.querySelectorAll('[studio-form="slide"]');
  if (obj.slides?.length === 0) obj.slides = obj.mask?.childNodes;

  // Success & error messages
  if (state.modes.isWfForm) {
    obj.successMsg = el.querySelector('.w-form-done');
    obj.errorMsg = el.querySelector('.w-form-fail');
  }

  // * Guard *
  Object.keys(obj).every(key => {
    // Nodelist
    if (
      NodeList.prototype.isPrototypeOf(obj[key]) ||
      HTMLCollection.prototype.isPrototypeOf(obj[key])
    ) {
      // Emptiness guard
      if (obj[key].length < 1)
        throw new Error(
          `StudioForm[${state.sdk.i}] -> elements.ts -> default: state.elements.${key}.length is 0`
        );

      // Continue
      return true;
    }

    // Elements
    if (!helper.isElement(obj[key]))
      throw new Error(
        `StudioForm[${state.sdk.i}] -> elements.ts -> default: state.elements.${key} is not an element`
      );

    // Default
    return true;
  });

  // * Add-on's *

  // Progress
  obj.progress = {};
  obj.progress.bars = el.querySelectorAll('[studio-form="progress-bar"]');
  obj.progress.currentSlides = el.querySelectorAll(
    '[studio-form="current-slide"]'
  );
  obj.progress.minMaxSlides = el.querySelectorAll(
    '[studio-form="min-max-slides"]'
  );
  obj.progress.minSlides = el.querySelectorAll('[studio-form="min-slides"]');
  obj.progress.maxSlides = el.querySelectorAll('[studio-form="max-slides"]');

  // Backwards & forwards buttons
  obj.prevBtns = el.querySelectorAll(
    '[studio-form="prev"], [studio-form="Backwards Button"]'
  );
  obj.nextBtns = [];
  for (let i = 0, n = el.childNodes.length; i < n; i++) {
    // Elements
    const child = el.childNodes[i] as any;

    // Guard
    if (child.isEqualNode(obj.mask)) continue;

    // Loop
    ['next', 'Continue Button'].forEach(str => {
      child
        .querySelectorAll(`[studio-form="${str}"]`)
        .forEach((btn: HTMLElement) => {
          obj.nextBtns.push(btn);
        });
    });
  }

  // Clear buttons
  obj.clearBtns = el.querySelectorAll('[studio-form="clear"]');

  // Data fields
  obj.responseData = el.querySelectorAll('[studio-form="response-data"]');
}
