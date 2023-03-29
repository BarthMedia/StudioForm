// + Imports +
import * as config from '../config';

// + Exports +

// - - Create next steps object - -
export default function ($steps) {
  // Local variables
  let stepsObject = [];

  // Initialize stepsObject
  $steps.each(function (stepIndex) {
    // Local elements
    let $step = $(this),
      $buttons = $step.find(`[${config.CLICK_ELEMENT_ID_ATTRIBUTE}]`),
      buttonsObject = [];

    $buttons.each(function () {
      // Element
      let $button = $(this);

      // Populate buttons object
      buttonsObject.push({
        id: $button.attr(config.CLICK_ELEMENT_ID_ATTRIBUTE),
        conditional: $button.attr(config.CONDITIONAL_ATTRIBUTE),
      });
    });

    // Populate steps object
    stepsObject.push({
      $: $step,
      step: stepIndex,
      swipeAllowed: $step.attr(config.SWIPE_ALLOWED_ATTRIBUTE) || 'true',
      conditional: $step.attr(config.CONDITIONAL_ATTRIBUTE),
      conditionalNext: $step.attr(config.CONDITIONAL_NEXT_ATTRIBUTE),
      buttons: buttonsObject,
    });
  });

  // Add logic to stepsObject
  let stepsCount = stepsObject.length;

  stepsObject.forEach(step => {
    // Local val
    let stepIndex = step.step,
      relativeLast = step.$.attr(config.RELATIVE_LAST_STEP_ATTRIBUTE);

    // Conditional last logic
    step.isLast = stepIndex == stepsCount - 1 ? true : false;
    if (relativeLast == 'true') step.isLast = true;

    // Next id logic
    step.buttons.forEach(button => {
      if (button.conditional != undefined) {
        button.nextStepId = (() => {
          for (step of stepsObject) {
            if (step.conditional == button.conditional) {
              return step.step;
            }
          }
        })();
      } else if (step.conditionalNext != undefined) {
        button.nextStepId = stepIndex + 1;
      } else {
        button.nextStepId = (() => {
          for (step of stepsObject) {
            if (step.step > stepIndex && step.conditional == undefined) {
              return step.step;
            }
          }
        })();
      }
    });
  });

  console.log(stepsObject);

  return stepsObject;
}
