// + Imports +
import * as config from '../config.js';
import initActiveInactiveClickState from './initActiveInactiveClickState.js';

// + Exports +

// - - Define step type - -
export default function ($step, stepIndex, $formBlock) {
  // Local elements
  let $radios = $step.find(config.RADIO_SELECTOR),
    $checkboxes = $step.find(config.CHECKBOX_SELECTOR),
    $buttons = $step
      .find(
        `a, ${config.CONTINUE_BUTTON_SELECTOR}, ${config.W_BUTTON_SELECTOR}`
      )
      .not(config.NOT_A_BUTTON_SELECTOR)
      .not(config.BACKWARDS_BUTTON_SELECTOR),
    $inputs = $step.find('input'),
    formBlockIndex = parseInt(
      $formBlock.attr(config.FORM_BLOCK_INDEX_ATTRIBUTE)
    );

  // Set step index
  $step.attr(config.STEP_INDEX_ATTRIBUTE, stepIndex);

  // Check for radio
  if ($radios.length > 0) {
    if ($step.attr(config.STEP_TYPE_ATTRIBUTE) == undefined) {
      $step.attr(config.STEP_TYPE_ATTRIBUTE, 'radio');
    }
    initActiveInactiveClickState($radios, formBlockIndex, $step);

    // Make sure to remove accidental radio requires
    $radios.find('input').removeAttr('required');

    return $step.attr(config.NOT_AUTO_CONTINUE_ATTRIBUTE) != undefined
      ? $buttons
      : $radios;
  }

  // Check for checkbox
  if ($checkboxes.length > 0) {
    if ($step.attr(config.STEP_TYPE_ATTRIBUTE) == undefined) {
      $step.attr(config.STEP_TYPE_ATTRIBUTE, 'checkbox');
    }
    initActiveInactiveClickState($checkboxes, formBlockIndex, $step);

    // Make sure to remove accidental checkbox requires (for full checkbox steps only)
    if ($step.attr(config.STEP_TYPE_ATTRIBUTE) == 'checkbox') {
      $checkboxes.find('input').removeAttr('required');
    }

    return $buttons;
  }

  // Check for checkbox
  if ($inputs.length > 0) {
    if ($step.attr(config.STEP_TYPE_ATTRIBUTE) == undefined) {
      $step.attr(config.STEP_TYPE_ATTRIBUTE, 'other input');
    }
    initActiveInactiveClickState($checkboxes, formBlockIndex, $step);

    return $buttons;
  }

  // Else return empty
  if ($step.attr(config.STEP_TYPE_ATTRIBUTE) == undefined)
    $step.attr(config.STEP_TYPE_ATTRIBUTE, 'empty');

  return $buttons;
}
