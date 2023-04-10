// + Imports +
import * as config from '../config.js';
import errorStatus from './errorStatus.js';
// import scrollToError from './scrollToElement.js';

// + Exports +

// - - check step requirments - -
export default function ($formBlock, $currentStep, mode = '100%') {
  // Variables
  const stepStype = $currentStep.attr(config.STEP_TYPE_ATTRIBUTE),
    isRequired =
      ($currentStep.attr(config.STEP_REQUIRED_ATTRIBUTE) || 'true') == 'true';
  styleIndex = parseInt($formBlock.attr(config.FORM_BLOCK_INDEX_ATTRIBUTE));

  // Required logic
  if (!isRequired) {
    return true;
  }

  // - - - Logic - - -

  // Empty
  if (['empty', 'fs range slider'].includes(stepStype)) {
    return true;
  }

  // Checkbox
  if (stepStype == 'checkbox') {
    // Elements
    const $checkboxes = $currentStep.find(config.CHECKBOX_SELECTOR);

    // Values
    let checkedBoxExists = false;

    // Logic loop
    $checkboxes.each(function () {
      if ($(this).attr(config.ELEMENT_GOT_CHECKED_ATTRIBUTE) != undefined)
        checkedBoxExists = true;
    });

    // Return result
    if (checkedBoxExists) {
      return true;
    } else {
      // Throw error
      if (mode == '100%') errorStatus('add', $checkboxes, styleIndex);

      // Prevent double clicking
      if (mode == '100%') $checkboxes.off('click.stepRequirements');

      // Add clickevent
      if (mode == '100%')
        $checkboxes.on('click.stepRequirements', function () {
          // Remove error
          errorStatus('remove', $checkboxes, styleIndex);

          // Remove clickevent
          $checkboxes.off('click.stepRequirements');
        });

      // Return
      return false;
    }
  }

  // Radio
  if (stepStype == 'radio') {
    // Elements
    const $radios = $currentStep.find(config.RADIO_SELECTOR),
      $checked = $currentStep.find(`[${config.ELEMENT_GOT_CHECKED_ATTRIBUTE}]`),
      $buttons = $currentStep.find(`[${config.CLICK_ELEMENT_ID_ATTRIBUTE}]`),
      $continueButtons = $currentStep.find(
        `[${config.STEP_TYPE_ATTRIBUTE} = 'radio']`
      );

    // If buttons equal radios return true
    if (
      $buttons.hasClass(config.RADIO_SELECTOR.substring(1)) &&
      $continueButtons.length < 1
    ) {
      return true;
    }

    // Logic
    if ($checked.length == 0) {
      // Throw error
      if (mode == '100%') errorStatus('add', $radios, styleIndex);

      // Prevent double clicking
      if (mode == '100%') $radios.off('click.stepRequirements');

      // Add clickevent
      if (mode == '100%')
        $radios.on('click.stepRequirements', function () {
          // Remove error
          errorStatus('remove', $radios, styleIndex);

          // Remove clickevent
          $radios.off('click.stepRequirements');
        });

      // Return
      return false;
    } else {
      // Return
      return true;
    }
  }

  // Custom
  if (stepStype == 'custom') {
    // Values
    const requirementsPassed =
      $currentStep.attr(config.STEP_CUSTOM_REQUIREMENTS_PASSED_ATTRIBUTE) ||
      'false';

    // Logic
    if (requirementsPassed == 'false') {
      return false;
    } // Requirements are passed
    else {
      return true;
    }
  }

  // Other input types
  if (true) {
    // Values
    let returnTrue = true;

    // Elements
    const $inputs = $currentStep.find('input, select');

    // Reset
    if (mode == '100%') errorStatus('remove', $inputs, styleIndex);

    // Loop
    $inputs.each(function () {
      // Element
      const $input = $(this);

      // Logic
      if ($input.prop('required')) {
        if ($input.val() == '') {
          // Scroll to error
          if (returnTrue) errorStatus('scroll', $input, styleIndex);
          else errorStatus('add', $input, styleIndex);

          // Throw error
          returnTrue = false;
        }
      }
    });

    // Logic
    if (returnTrue) {
      if (mode == '100%') errorStatus('remove', $inputs, styleIndex);
      return true;
    } else {
      return false;
    }
  }
}
