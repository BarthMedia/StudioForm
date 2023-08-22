// Add nice classes to elements

// Only run if mode allows ?

// Scroll to error elements if mode allows?
// Use approriate reference element
// Only ... need the last element of the slideRecord / slideRecord

// Need state as always

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

  // Scroll to the first element
  if (state.modes.scrollOnRequirementsError)
    state.sdk.scrollTo({
      target: data[0].el.closest('label, [studio-form="label"]') || data[0].el,
      attributeReferenceElement:
        state.sdk.slideLogic[state.sdk.slideLogic.length - 1].el,
    });

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
