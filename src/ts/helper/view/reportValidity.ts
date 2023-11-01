// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${helper.errorName(s)}required.ts -> default: `;
export default function (stateId: number, data: { el: HTMLInputElement }[]) {
  // Values
  const state = model.state[stateId];
  const sdk = state.sdk;
  const record = sdk.slideRecord;
  const slideEl = sdk.slideLogic[record[record.length - 1]].el;

  // Guard
  if (data.length < 1) {
    console.warn(`${errPath(state)}The supplied data is empty!`);
    return;
  }

  // * Temporary required swap *
  let requiredSwapReset = () => {};
  if (state.modes.temporaryRequired && !data[0].el.hasAttribute('required')) {
    // Timeout clear
    if (state.requiredSwapResetTimeout) {
      clearTimeout(state.requiredSwapResetTimeout);
      state.requiredSwapResetTimeoutFunction();
    }

    // Define
    function f(mode: string) {
      // Values
      const args = ['required'];
      if (mode === 'set') args.push('');

      // Fire
      data[0].el[mode + 'Attribute'](...args);
    }

    // Init
    f('set');

    // Overwrite
    requiredSwapReset = () => {
      f('remove');
    };
  }

  // * Scroll to the first element and if not visible *

  // Calculate
  const target: HTMLElement =
    data[0].el.closest(config.LABEL_SELECTOR) || data[0].el;
  const isFullyVisible = helper.isElementTopVisible(
    target,
    state,
    {
      attributeReferenceElement: slideEl,
    },
    true
  );

  // Define
  function reportValidity() {
    try {
      data[0].el.reportValidity();
      state.requiredSwapResetTimeoutFunction = requiredSwapReset;
      state.requiredSwapResetTimeout = setTimeout(
        requiredSwapReset,
        config.TIMEOUT_SEC * 1000
      );
    } catch (err) {
      console.warn(
        `${errPath(
          state
        )}data[0].el.reportValidity() produces unexpected error!`,
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
      attributeReferenceElement: slideEl,
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

  // Class list toggle
  function toggle(el: HTMLElement, mode: string) {
    helper.classListToggle({
      el: el,
      class: 'required',
      mode: mode,
      closest: { parent: config.LABEL_SELECTOR },
    });
  }

  // Delay
  setTimeout(() => {
    // Add class loop
    data.forEach((datum: { el: HTMLElement }) => {
      // Toogle
      toggle(datum.el, 'add');
    });

    // Event listener
    document.body.addEventListener(
      'click',
      function () {
        // Remove class loop
        data.forEach((datum: { el: HTMLElement }) => {
          // Toogle
          toggle(datum.el, 'remove');
        });
      },
      { once: true }
    );
  }, 1);

  // Trigger events
  helper.triggerAllFunctions(
    state.view.eventsFunctionArrays.afterRenderRequirements
  );
}
