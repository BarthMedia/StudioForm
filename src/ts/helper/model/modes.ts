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
  obj.keyboardEvents =
    (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}keyboard-events`) ||
      'true') === 'true';

  // Add simple sdk
  obj.simpleSdk =
    (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}simplified-sdk`) ||
      'true') === 'true';

  // Remove visual dividers
  obj.removeVisualDividers =
    (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}remove-dividers`) ||
      'true') === 'true';

  // Remove conditionally invisible slides
  obj.removeConditionallyInvisibeSlides =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}remove-conditionally-invisible-slides`
    ) || 'true') === 'true';

  // JotForm mode
  obj.isJotFrom =
    (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}jot-form-mode`) ||
      'false') === 'true';

  // Slider mode
  obj.isWfForm = el.classList.contains('w-form');
  obj.isSlider =
    !obj.isWfForm ||
    (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}slider-mode`) ||
      'false') === 'true';

  // Add temporary required
  obj.temporaryRequired =
    (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}temporary-required`) ||
      'true') === 'true';

  // Swap submit buttons
  obj.swapSubmitButtons =
    (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}swap-submit-buttons`) ||
      'true') === 'true';

  // Calculate progress
  obj.calculateProgress =
    (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}calculate-progress`) ||
      'false') === 'true';

  // Auto remove suggested button
  obj.autoRemoveButtonSuggestion =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}auto-remove-button-suggestion`
    ) || 'true') === 'true';

  // Auto  suggested buttons
  obj.autoSuggestButtons =
    (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}auto-suggest-buttons`) ||
      'true') === 'true';

  // Active scroll to
  obj.scrollToTarget =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}auto-scroll-to-target`
    ) || 'true') === 'true';

  // Wait for animations to finish
  obj.waitForAnimations =
    (el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}wait-for-animations`) ||
      'false') === 'true';

  // Hide error message on click
  obj.hideErrorMessageOnClick =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}hide-error-message-on-click`
    ) || 'true') === 'true';

  // Scroll on requirements error
  obj.scrollOnRequirementsError =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}scroll-on-requirements-error`
    ) || 'true') === 'true';

  // Force scroll on requirements error
  obj.forceScrollOnRequirementsError =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}force-scroll-on-requirements-error`
    ) || 'false') === 'true';

  // Report native vadility
  obj.nativeReportVadility =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}native-report-validity`
    ) || 'true') === 'true';

  // 100% progress only on submit
  obj._100PercentProgressOnSubmitOnly =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}100-percent-progress-on-submit-only`
    ) || 'true') === 'true';

  // Add field data params to redirect
  obj.fieldParamsRedirect =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}field-params-redirect`
    ) || 'true') === 'true';

  // Only scroll if top is not visible
  obj.scrollIfTopNotVisible =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}scroll-if-top-not-visible`
    ) || 'true') === 'true';

  // Auto swap file upload label text
  obj.autoSwapFileUploadLabelText =
    (el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}swap-file-upload-label-text`
    ) || 'true') === 'true';
}
