// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (stateId: number, data: { el: HTMLElement }[]) {
  // Values
  const state = model.state[stateId];

  // Guard
  if (data.length < 1) {
    console.warn(
      `StudioForm[${state.sdk.i}] -> required.ts -> default: The supplied data is empty!`
    );
    return;
  }

  // * Scroll to the first element and if not visible *

  // Calculate
  const target =
    data[0].el.closest('label, [studio-form="label"]') || data[0].el;
  const targetRect = target.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;
  const isFullyVisible =
    targetRect.top >= 0 &&
    targetRect.bottom <= viewportHeight &&
    targetRect.left >= 0 &&
    targetRect.right <= viewportWidth;

  // Define
  function reportValidity() {
    try {
      const res = state.elements.mask.reportValidity();
    } catch (err) {
      console.warn(
        `StudioForm[${state.sdk.i}] -> required.ts -> default: state.elements.mask.reportValidity() produces unexpected error!`,
        err
      );
    }
  }

  // Logic
  if (
    (state.modes.scrollOnRequirementsError && !isFullyVisible) ||
    state.modes.forceScrollOnRequirementsError
  )
    state.sdk.scrollTo({
      target: target,
      attributeReferenceElement:
        state.sdk.slideLogic[state.sdk.slideLogic.length - 1].el,
      callback: (success: boolean) => {
        if (state.modes.nativeReportVadility && success) reportValidity();
      },
    });

  // Declare native error
  if (
    state.modes.nativeReportVadility &&
    isFullyVisible &&
    !state.modes.forceScrollOnRequirementsError
  )
    reportValidity();

  // Delay
  setTimeout(() => {
    // Add class loop
    data.forEach((datum: { el: HTMLElement }) => {
      // Elements
      const parent =
        datum.el.closest('label, [studio-form="label"]') || datum.el;
      const elements: any[] = [parent];
      const childNodes = parent.querySelectorAll('*');
      childNodes.forEach(node => elements.push(node));

      // Adding
      elements.forEach((element: HTMLElement) =>
        element.classList.add('sf-required')
      );
    });

    // Event listener
    document.body.addEventListener(
      'click',
      function () {
        // Remove class loop
        data.forEach((datum: { el: HTMLElement }) => {
          // Elements
          const parent =
            datum.el.closest('label, [studio-form="label"]') || datum.el;
          const elements: any[] = [parent];
          const childNodes = parent.querySelectorAll('*');
          childNodes.forEach(node => elements.push(node));

          // Removing
          elements.forEach((element: HTMLElement) =>
            element.classList.remove('sf-required')
          );
        });
      },
      { once: true }
    );
  }, 1);
}
