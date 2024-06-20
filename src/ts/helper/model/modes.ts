// Imports
import * as utils from './utils';
import * as attributeUtils from '../view/utilsAttributes';
import * as controllerUtils from '../controller/utils';
import * as config from '../../config';
import * as model from '../../model';

// Export
export default function (wrapper: HTMLElement, mask: HTMLElement) {
  // + Helper +

  // Attribute
  function getAttribute(str: string, bool = true) {
    // Val
    let val = attributeUtils.getSlideMaskWrapperAttribute(str, mask, wrapper);

    // Fallback
    val = !val ? bool + '' : val;

    // Return
    return val === 'true';
  }

  // * Modes *
  const obj = {
    // Disallow prev
    get allowPrev() {
      return getAttribute('allow-prev');
    },

    // Transition
    get transition() {
      return getAttribute('transition');
    },

    // Smooth reset
    get smoothReset() {
      return getAttribute('smooth-reset');
    },

    // Allow keyboard
    get keyboardEvents() {
      return getAttribute('keyboard-events');
    },

    // Add simple data structure -- legacy "JotForm mode"
    get simpleData() {
      return getAttribute('simple-data');
    },

    // Partial data
    get partialData() {
      return getAttribute('partial-data');
    },

    // Remove conditionally invisible slides
    get removeConditionallyInvisibeSlides() {
      return getAttribute('remove-conditionally-invisible-slides');
    },

    // Slider mode
    get slider() {
      return mask.tagName !== 'FORM' || getAttribute('slider', false);
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

    // Scroll to top on animate / transition
    get scrollToTop() {
      return getAttribute('scroll-to-top');
    },

    // Only scroll if top is not visible
    get forceScrollToTop() {
      return getAttribute('force-scroll-to-top', false);
    },

    // Scroll on requirements error
    get scrollToValidity() {
      return getAttribute('scroll-to-validity');
    },

    // Force scroll on requirements Validity
    get forceScrollToValidity() {
      return getAttribute('force-scroll-to-validity', false);
    },

    // Wait for animations to finish
    get awaitAnimations() {
      return getAttribute('await-animations', false);
    },

    // Show error message
    get autoShowFail() {
      return getAttribute('auto-show-fail');
    },

    // Hide error message on click
    get autoHideFail() {
      return getAttribute('auto-hide-fail');
    },

    // Report native vadility
    get reportValidity() {
      return getAttribute('report-validity');
    },

    // Report native vadility
    get nativeReportValidity() {
      return getAttribute('native-report-validity');
    },

    // On Prev Report native vadility
    get onPrevReportValidity() {
      return getAttribute('on-prev-report-validity', false);
    },

    // Promise / resolve
    get promiseResolve() {
      return getAttribute('promise-resolve', false);
    },

    // Auto resolve on prev
    get onPrevPromiseResolve() {
      return getAttribute('on-prev-promise-resolve', false);
    },

    // Auto resolve on prev
    get onSubmitPromiseResolve() {
      return getAttribute('on-submit-promise-resolve');
    },

    // Add field data params to redirect
    get fieldParamsRedirect() {
      return getAttribute('field-params-redirect', false);
    },

    // File dropping
    get fileDrop() {
      return getAttribute('file-drop');
    },

    // File dropping
    get fileLabelSwap() {
      return getAttribute('file-label-swap');
    },

    // File dropping
    get initDefaultStyles() {
      return getAttribute('init-default-styles');
    },

    // Observe checkboxes & radios
    get observeChecked() {
      return getAttribute('observe-checked');
    },

    // Observe file inputs
    get observeAttachments() {
      return getAttribute('observe-attachments');
    },

    // ReCAPTCHA allowed
    get recaptcha() {
      return getAttribute('recaptcha');
    },
  };

  // Expose to api & handle change requests
  return obj;
}
