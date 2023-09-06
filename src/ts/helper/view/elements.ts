// Imports
import * as helper from '../helper';

// Export
export default function (state: any) {
  // Values
  const obj = state.elements;
  const el: HTMLElement = state.elements.wrapper;

  // Set data id
  el.setAttribute('data-sf-id', state.sdk.i);

  // Define helper - returnSelector
  function rs(isDomWide: boolean, ...strArr: string[]) {
    // Create
    let val = strArr
      .map(str => {
        const tmpVal = `[studio-form="${str}"]`;
        return isDomWide
          ? `[data-sf-id="${state.sdk.i}"] ` +
              tmpVal +
              `,[studio-form-${state.sdk.i}="${str}"]`
          : tmpVal;
      })
      .join(',');

    // Return
    return val;
  }

  // * Add to elements *

  // Mask
  obj.mask =
    el.querySelector(rs(false, 'mask')) ||
    el.querySelector('form') ||
    el.querySelector('*');

  // Dividers
  const dividers: NodeListOf<HTMLElement> = document.querySelectorAll(
    rs(true, 'Visual Divider', 'visual-divider', 'divider')
  );
  if (state.modes.removeVisualDividers)
    dividers.forEach(divider => divider.remove());

  // Remove conditionally invisible slides
  if (state.modes.removeConditionallyInvisibeSlides) {
    obj.mask?.childNodes.forEach((slide: HTMLElement) => {
      if (slide.classList.contains('w-condition-invisible')) slide.remove();
    });
  }

  // Slides
  obj.slides = obj.mask?.querySelectorAll(rs(false, 'slide'));
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
  obj.progress.bars = document.querySelectorAll(rs(true, 'progress-bar'));
  obj.progress.currentSlides = document.querySelectorAll(
    rs(true, 'current-slide')
  );
  obj.progress.minMaxSlides = document.querySelectorAll(
    rs(true, 'min-max-slides')
  );
  obj.progress.minSlides = document.querySelectorAll(rs(true, 'min-slides'));
  obj.progress.maxSlides = document.querySelectorAll(rs(true, 'max-slides'));

  // * Backwards & forwards buttons *

  // Prev
  obj.prevBtns = [];
  document
    .querySelectorAll(rs(true, 'prev', 'Backwards Button'))
    .forEach(el => obj.prevBtns.push(el));

  // Next
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
  document
    .querySelectorAll(`[studio-form-${state.sdk.i}="next"`)
    .forEach(el => obj.nextBtns.push(el));

  // Data response fields
  obj.responseData = el.querySelectorAll(rs(true, 'response-data', 'response'));
}
