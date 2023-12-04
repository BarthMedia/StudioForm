// Imports
import * as viewUtils from '../view/utils';
import * as config from '../../config';

// Export
export default function (wrapper: HTMLElement, mask: HTMLElement) {
  // + Helper +

  // Attribute
  function getAttribute(str: string, bool = true) {
    // Values
    let val = viewUtils.getAttribute(str, mask, wrapper);

    // Fallback
    val = !val ? bool.toString() : val;

    // Return
    return val === 'true';
  }

  // Return wized config
  function returnWizedConfig(str: string, bool = true) {
    // Values
    let val = viewUtils.getAttribute(str, mask, wrapper);

    // Try / catch wized logic
    if (!val && obj.wized) {
      try {
        // Value
        let found: false | { 'prevent-default': boolean; reset: boolean } =
          false;

        // Nested loop
        [...window.Wized?.['config'].actions]
          .reverse()
          .every((action: unknown) => {
            // Match
            let match: false | { 'prevent-default': boolean; reset: boolean } =
              false;

            // Loop
            if (action?.['attributes'])
              action['attributes'].forEach((attribute: unknown) => {
                // Logic loop
                if (
                  attribute?.['name'] ===
                  viewUtils.getAttributeOr(mask, 'wized', 'w-el')
                ) {
                  if (action)
                    action['actions'].forEach((action: unknown) => {
                      // Logic
                      if (action?.['event'] === 'submit') {
                        match = {
                          'prevent-default': action['preventDefault'] || false,
                          reset: action['resetForm'] || false,
                        };
                      }
                    });
                }
              });

            // Guard
            if (match === false) return true;

            // Overwrite
            found = match;
          });

        // Overwrite logic
        if (found !== false) val = (found[str] as boolean).toString();
      } catch (error) {
        console.warn(
          `StudioForm[${wrapper.getAttribute(
            `${config.PRODUCT_NAME_SHORT}-name`
          )}] -> modes.ts: `,
          error
        );
      }
    }

    // Fallback
    val = !val ? bool.toString() : val;

    // Return
    return val === 'true';
  }

  // * Modes *
  const obj = {
    // Wized active
    get wized() {
      return window.Wized && (mask.getAttribute('wized') || '') !== '';
    },

    // Wized reset
    get reset() {
      return returnWizedConfig('reset', false);
    },

    // Smooth reset
    get smoothReset() {
      return getAttribute('smooth-reset');
    },

    // Wized / prevent default
    get preventDefault() {
      return returnWizedConfig('prevent-default', false);
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
      return getAttribute('on-submit-promise-resolve', false);
    },

    // 100% progress only on submit
    get countDone() {
      return getAttribute('count-done');
    },

    // Add field data params to redirect
    get fieldParamsRedirect() {
      return getAttribute('field-params-redirect');
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
  };

  // Expose to api & handle change requests
  return obj;
}
