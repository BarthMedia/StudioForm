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

  console.log(getAttribute('banana'));

  // * Modes *
  const obj = {
    // Add simple sdk
    keyboardEvents:
      (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}keyboard-events`) ||
        'true') === 'true',

    // Add simple sdk
    simpleSdk:
      (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}simplified-sdk`) ||
        'true') === 'true',

    // Remove visual dividers
    removeVisualDividers:
      (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}remove-dividers`) ||
        'true') === 'true',

    // Remove conditionally invisible slides
    removeConditionallyInvisibeSlides:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}remove-conditionally-invisible-slides`
      ) || 'true') === 'true',

    // JotForm mode
    isJotFrom:
      (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}jot-form-mode`) ||
        'false') === 'true',

    // Slider mode
    isWfForm: el.classList.contains('w-form'),
    isSlider:
      !isWfForm ||
      (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}slider-mode`) ||
        'false') === 'true',

    // Add temporary required
    temporaryRequired:
      (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}temporary-required`) ||
        'true') === 'true',

    // Swap submit buttons
    swapSubmitButtons:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}swap-submit-buttons`
      ) || 'true') === 'true',

    // Calculate progress
    calculateProgress:
      (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}calculate-progress`) ||
        'false') === 'true',

    // Auto remove suggested button
    autoRemoveButtonSuggestion:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}auto-remove-button-suggestion`
      ) || 'true') === 'true',

    // Auto  suggested buttons
    autoSuggestButtons:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}auto-suggest-buttons`
      ) || 'true') === 'true',

    // Active scroll to
    scrollToTarget:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}auto-scroll-to-target`
      ) || 'true') === 'true',

    // Wait for animations to finish
    waitForAnimations:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}wait-for-animations`
      ) || 'false') === 'true',

    // Hide error message on click
    hideErrorMessageOnClick:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}hide-error-message-on-click`
      ) || 'true') === 'true',

    // Scroll on requirements error
    scrollOnRequirementsError:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}scroll-on-requirements-error`
      ) || 'true') === 'true',

    // Force scroll on requirements error
    forceScrollOnRequirementsError:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}force-scroll-on-requirements-error`
      ) || 'false') === 'true',

    // Report native vadility
    nativeReportVadility:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}native-report-validity`
      ) || 'true') === 'true',

    // 100% progress only on submit
    _100PercentProgressOnSubmitOnly:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}100-percent-progress-on-submit-only`
      ) || 'true') === 'true',

    // Add field data params to redirect
    fieldParamsRedirect:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}field-params-redirect`
      ) || 'true') === 'true',

    // Only scroll if top is not visible
    scrollIfTopNotVisible:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}scroll-if-top-not-visible`
      ) || 'true') === 'true',

    // Auto swap file upload label text
    autoSwapFileUploadLabelText:
      (el.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}swap-file-upload-label-text`
      ) || 'true') === 'true',
  };
}
