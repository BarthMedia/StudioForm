// Imports
import * as helper from '../helper';
import * as config from '../../config';

// Export
export default function (wrapper: HTMLElement, mask: HTMLElement) {
  // Helper
  function getAttribute(str: string, bool = true) {
    // Values
    let val = helper.getAttribute(str, mask, wrapper);

    // Fallback
    val = !val ? bool.toString() : val;

    // Return
    return val === 'true';
  }

  // TODO
  console.log(
    'Build this as the next one! WIZED.prevent-default & WIZED.reset!'
  );
  console.log(
    '!!!!!! build wized specific mode - attributes - in regards to reset & preventDefault!'
  );
  console.log(
    'V2 is the standard now, no need to test for. Expect potential failure anyways'
  );

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

    // Promise / resolve
    get promise() {
      return getAttribute('promise', false);
    },

    // Auto resolve on prev
    get autoResolveOnPrev() {
      return getAttribute('auto-resolve-on-prev', false);
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
  return obj;
}
