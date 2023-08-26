// Imports
import * as helper from '../helper';

// Export
export default function (state: any) {
  // Guard
  if (!helper.isElement(state.elements.wrapper))
    throw new Error(
      `StudioForm[${state.sdk.i}] -> modes.ts -> default: state.elements.wrapper is not an element`
    );

  // Define
  state.modes = {};
  const obj = state.modes;
  const el: HTMLElement = state.elements.wrapper;

  // * Modes *

  // Remove visual dividers
  obj.simpleSdk = (el.getAttribute('data-simple-sdk') || 'true') === 'true';

  // Remove visual dividers
  obj.removeVisualDividers =
    (el.getAttribute('data-remove-visual-diviers') ||
      el.getAttribute('data-remove-diviers') ||
      'true') === 'true';

  // Remove conditionally invisible slides
  obj.removeConditionallyInvisibeSlides =
    (el.getAttribute('data-remove-conditionally-invisible-slides') ||
      'true') === 'true';

  // Slider mode
  obj.isWfForm = el.classList.contains('w-form');
  obj.isSlider =
    !obj.isWfForm ||
    (el.getAttribute('data-is-slider-mode') || 'false') === 'true';

  // Remove conditionally invisible slides
  obj.removeRequiredAttributeFromCheckboxAndRadioOnlys =
    (el.getAttribute(
      'data-remove-required-attribute-from-checkbox-and-radio-onlys'
    ) || 'true') === 'true';

  // Swap submit buttons
  obj.swapSubmitButtons =
    (el.getAttribute('data-swap-submit-buttons') || 'true') === 'true';

  // Calculate progress
  obj.calculateProgress =
    (el.getAttribute('data-calculate-progress') || 'false') === 'true';

  // Auto remove suggested button
  obj.autoRemoveButtonSuggestion =
    (el.getAttribute('data-auto-remove-button-suggestion') || 'true') ===
    'true';

  // Auto  suggested buttons
  obj.autoSuggestButtons =
    (el.getAttribute('data-auto-suggest-buttons') || 'true') === 'true';

  // Active scroll to
  obj.scrollToActive =
    (el.getAttribute('data-auto-scroll-to-active') || 'true') === 'true';

  // Wait for animations to finish
  obj.waitForAnimations =
    (el.getAttribute('data-wait-for-animations') || 'true') === 'true';

  // Hide error message on click
  obj.hideErrorMessageOnClick =
    (el.getAttribute('data-hide-error-message-on-click') || 'true') === 'true';

  // Scroll on requirements error
  obj.scrollOnRequirementsError =
    (el.getAttribute('data-scroll-on-requirements-error') || 'true') === 'true';

  // Force scroll on requirements error
  obj.forceScrollOnRequirementsError =
    (el.getAttribute('data-force-scroll-on-requirements-error') || 'false') ===
    'true';

  // Report native vadility
  obj.nativeReportVadility =
    (el.getAttribute('data-native-report-vadility') || 'true') === 'true';
}
