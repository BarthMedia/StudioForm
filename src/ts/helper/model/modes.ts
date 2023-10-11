// Imports
import * as helper from '../helper';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${helper.errorName(s)}modes.ts -> default: `;
export default function (state: any) {
  // Guard
  if (!helper.isElement(state.elements.wrapper))
    throw new Error(
      `${errPath(state)}state.elements.wrapper is not an element`
    );

  // Define
  state.modes = {};
  const obj = state.modes;
  const el: HTMLElement = state.elements.wrapper;

  // * Modes *

  // Add simple sdk
  obj.simpleSdk = (el.getAttribute('data-simplified-sdk') || 'true') === 'true';

  // Remove visual dividers
  obj.removeVisualDividers =
    (el.getAttribute('data-remove-dividers') || 'true') === 'true';

  // Remove conditionally invisible slides
  obj.removeConditionallyInvisibeSlides =
    (el.getAttribute('data-remove-conditionally-invisible-slides') ||
      'true') === 'true';

  // JotForm mode
  obj.isJotFrom = (el.getAttribute('data-jot-form-mode') || 'false') === 'true';

  // Slider mode
  obj.isWfForm = el.classList.contains('w-form');
  obj.isSlider =
    !obj.isWfForm ||
    (el.getAttribute('data-slider-mode') || 'false') === 'true';

  // Add temporary required
  obj.temporaryRequired =
    (el.getAttribute('data-temporary-required') || 'true') === 'true';

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
  obj.scrollToTarget =
    (el.getAttribute('data-auto-scroll-to-target') || 'true') === 'true';

  // Wait for animations to finish
  obj.waitForAnimations =
    (el.getAttribute('data-wait-for-animations') || 'false') === 'true';

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
    (el.getAttribute('data-native-report-validity') || 'true') === 'true';

  // 100% progress only on submit
  obj._100PercentProgressOnSubmitOnly =
    (el.getAttribute('data-100-percent-progress-on-submit-only') || 'true') ===
    'true';

  // Add field data params to redirect
  obj.fieldParamsRedirect =
    (el.getAttribute('data-field-params-redirect') || 'true') === 'true';

  // Only scroll if top is not visible
  obj.scrollIfTopNotVisible =
    (el.getAttribute('data-scroll-if-top-not-visible') || 'true') === 'true';

  // Auto swap file upload label text
  obj.autoSwapFileUploadLabelText =
    (el.getAttribute('data-swap-file-upload-label-text') || 'true') === 'true';
}
