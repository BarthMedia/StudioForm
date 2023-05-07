// + Imports +
import * as config from '../../../config.js';
import * as model from '../../../model.js';
import initActiveInactiveClickState from '../visuals/initActiveInactiveClickState.js';

// + Exports +

// - - Define step type - -
export default function ($step, stepIndex, $formBlock) {
  // Local elements
  const $radios = $step.find(config.W_RADIO_SELECTOR),
    $checkboxes = $step.find(config.W_CHECKBOX_SELECTOR),
    $buttons = $step
      .find(`${config.CONTINUE_BUTTON_SELECTOR}, ${config.W_BUTTON_SELECTOR}`)
      .not(config.NOT_A_BUTTON_SELECTOR)
      .not(config.BACKWARDS_BUTTON_SELECTOR),
    $inputs = $step
      .find('input')
      .not('input[type=radio], input[type=checkbox]'),
    formBlockIndex = parseInt(
      $formBlock.attr(config.FORM_BLOCK_INDEX_ATTRIBUTE)
    ),
    $finSweetRangeSliders = $step.find(
      config.FS_RANGE_SLIDER_ELEMENTS_SELECTOR
    );

  // Values
  const stateData = model.state.data[`form${formBlockIndex}`],
    sliderMode = stateData.sliderMode;

  // Set step index
  $step.attr(config.STEP_INDEX_ATTRIBUTE, stepIndex);

  // Check for FS range sliders
  if ($finSweetRangeSliders.length > 0) {
    if ($step.attr(config.STEP_TYPE_ATTRIBUTE) == undefined && !sliderMode) {
      $step.attr(config.STEP_TYPE_ATTRIBUTE, 'fs range slider');
    }

    // Add no swipe gesture attribute unless said otherwise
    if ($step.attr(config.SWIPE_ALLOWED_ATTRIBUTE) == undefined) {
      $step.attr(config.SWIPE_ALLOWED_ATTRIBUTE, 'false');
    }

    // console.log($step);

    return $buttons;
  }

  // Check for radio
  if ($radios.length > 0) {
    if ($step.attr(config.STEP_TYPE_ATTRIBUTE) == undefined && !sliderMode) {
      $step.attr(config.STEP_TYPE_ATTRIBUTE, 'radio');
    }
    initActiveInactiveClickState($radios, formBlockIndex, $step);

    // Make sure to remove accidental radio requires
    $radios.find('input').each(function () {
      // Elements
      const $input = $(this);

      if ($input.is('[required]')) {
        $radios.attr('required', '');
        $input.removeAttr('required');
      }
    });

    if (
      $inputs.length > 1 ||
      $step.attr(config.NOT_AUTO_CONTINUE_ATTRIBUTE) != undefined
    ) {
      // If not auto continue true
      if ($step.attr(config.STEP_TYPE_ATTRIBUTE) === 'radio') {
        $step.attr(config.STEP_TYPE_ATTRIBUTE, 'other input');
      }
      return $buttons;
    } else {
      // Set buttons to trigger requirements checking
      $buttons.attr(config.STEP_TYPE_ATTRIBUTE, 'radio');
      return $radios.add($buttons);
    }
  }

  // Check for checkbox
  if ($checkboxes.length > 0 && $inputs.length < 2) {
    if ($step.attr(config.STEP_TYPE_ATTRIBUTE) == undefined && !sliderMode) {
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
    if ($step.attr(config.STEP_TYPE_ATTRIBUTE) == undefined && !sliderMode) {
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
