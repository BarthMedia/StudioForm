// + Imports +
import * as config from '../config.js';
import errorStatus from './errorStatus.js';

// + Exports +

// - - check step requirments - -
export default function ($formBlock, $currentStep, mode = '100%') {
  // Variables
  let stepStype = $currentStep.attr(config.STEP_TYPE_ATTRIBUTE),
    isRequired =
      ($currentStep.attr(config.STEP_REQUIRED_ATTRIBUTE) || 'true') == 'true';
  styleIndex = parseInt($formBlock.attr(config.FORM_BLOCK_INDEX_ATTRIBUTE));

  // Required logic
  if (!isRequired) {
    return true;
  }

  // Logic
  if (stepStype == 'empty') {
    return true;
  } else if (stepStype == 'checkbox') {
    // Elements
    let $checkboxes = $currentStep.find(config.CHECKBOX_SELECTOR);

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
  } else if (stepStype == 'radio') {
    // Elements
    let $radios = $currentStep.find(config.RADIO_SELECTOR),
      $checked = $currentStep.find(`[${config.ELEMENT_GOT_CHECKED_ATTRIBUTE}]`),
      $buttons = $currentStep.find(`[${config.CLICK_ELEMENT_ID_ATTRIBUTE}]`);

    // If buttons equal radios return true
    if ($buttons.hasClass(config.RADIO_SELECTOR.substring(1))) {
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
  } else if (stepStype == 'custom') {
    // Values
    let requirementsPassed =
      $currentStep.attr(config.STEP_CUSTOM_REQUIREMENTS_PASSED_ATTRIBUTE) ||
      'false';

    // Logic
    if (requirementsPassed == 'false') {
      return false;
    } // Requirements are passed
    else {
      return true;
    }
  } // Other input types
  else {
    // Values
    let returnTrue = true;

    // Elements
    let $inputs = $currentStep.find('input, select');

    // Reset
    if (mode == '100%') errorStatus('remove', $inputs, styleIndex);

    // Loop
    $inputs.each(function () {
      // Element
      let $input = $(this);

      // Logic
      if ($input.prop('required')) {
        if ($input.val() == '') {
          // Throw error
          returnTrue = false;
          if (mode == '100%') errorStatus('add', $input, styleIndex);
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
