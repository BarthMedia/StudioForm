// Imports
import * as helper from '../helper';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${helper.errorName(s)}modes.ts -> default:`;
export default function (
  state: StudioFormState,
  instanceName: string,
  wrapper: HTMLElement,
  mask: HTMLElement
) {
  // Define
  // state.modes = {};
  // const obj = state.modes;
  // const el: HTMLElement = state.elements.wrapper;

  // Helper
  function getAttribute(str: string, bool = true) {
    // Values
    const querys = [
      `${config.PRODUCT_NAME_SHORT}-${str}`,
      `${config.PRODUCT_NAME_LONG}-${str}`,
    ];
    let val: string | null = null;

    // Loop
    querys.forEach(str => {
      // Values
      const attr = wrapper.getAttribute(str) || mask.getAttribute(str);
      if (attr) val = attr;
    });

    // Fallback
    val = !val ? bool.toString() : val;

    // Return
    return val === 'true';
  }

  // * Modes *
  const obj = {
    // Allow keyboard
    get keyboard() {
      return getAttribute('keyboard');
    },

    // Add simple data structure -- legacy "JotForm mode"
    get simpleData() {
      return getAttribute('simple-data');
    },

    // Remove visual dividers
    get removeDividers() {
      return getAttribute('remove-dividers');
    },

    // Promise / resolve
    get promise() {
      return getAttribute('promise', false);
    },

    // Remove conditionally invisible slides
    get removeConditionallyInvisibeSlides() {
      return getAttribute('remove-conditionally-invisible-slides');
    },

    // Slider mode
    get slider() {
      return mask.tagName !== 'FORM' || getAttribute('slider', false);
    },

    // Add temporary required
    get temporaryRequirements() {
      return getAttribute('temporary-requirements');
    },

    // Swap submit buttons
    get swapSubmitButtons() {
      return getAttribute('swap-submit-buttons');
    },

    // Calculate progress
    get calculateProgress() {
      return getAttribute('calculate-progress', false);
    },

    // Auto remove suggested button
    get autoRemoveButtonSuggestion() {
      return getAttribute('auto-remove-button-suggestion');
    },

    // Auto  suggested buttons
    get autoSuggestButtons() {
      return getAttribute('auto-suggest-buttons');
    },

    // Active scroll to
    get scrollToTarget() {
      return getAttribute('scroll-to-target');
    },

    // Scroll to top on animate
    get scrollToTop() {
      return getAttribute('scroll-to-top');
    },

    // Only scroll if top is not visible
    get forceScrollToTop() {
      return getAttribute('force-scroll-to-top', false);
    },

    // Scroll on requirements error
    get scrollToError() {
      return getAttribute('scroll-to-error');
    },

    // Force scroll on requirements error
    get forceScrollToError() {
      return getAttribute('force-scroll-to-error', false);
    },

    // Wait for animations to finish
    get awaitAnimations() {
      return getAttribute('await-animations');
    },

    // Show error message
    get autoShowErrorMessage() {
      return getAttribute('auto-show-error-message');
    },

    // Hide error message on click
    get autoHideErrorMessage() {
      return getAttribute('auto-hide-error-message');
    },

    // Report native vadility
    get reportValidity() {
      return getAttribute('report-validity');
    },

    // 100% progress only on submit
    get countDone() {
      return getAttribute('count-done');
    },

    // Add field data params to redirect
    get fieldParamsRedirect() {
      return getAttribute('field-params-redirect');
    },

    // Auto swap file upload label text
    get autoSwapFileUploadLabel() {
      return getAttribute('auto-swap-file-upload-label');
    },
  };

  // Expose to api & handle change requests
  state.modes[instanceName] = state.createReadMostlyProxy(
    obj
  ) as StudioFormModes;
}
