// + Imports +
import * as config from '../config';

// + Exports +

// - - Create next steps object - -
export default function ($steps) {
  // Local variables
  const stepsObject = [];

  // Initialize stepsObject
  $steps.each(function (stepIndex) {
    // Local elements
    const $step = $(this),
      $buttons = $step.find(`[${config.CLICK_ELEMENT_ID_ATTRIBUTE}]`),
      buttonsObject = [];

    $buttons.each(function () {
      // Element
      const $button = $(this);

      // Populate buttons object
      buttonsObject.push({
        id: parseInt($button.attr(config.CLICK_ELEMENT_ID_ATTRIBUTE)),
        conditional: $button.attr(config.CONDITIONAL_ATTRIBUTE),
      });
    });

    // Populate steps object
    stepsObject.push({
      $: $step,
      index: stepIndex,
      swipeAllowed: $step.attr(config.SWIPE_ALLOWED_ATTRIBUTE) || 'true',
      conditional: $step.attr(config.CONDITIONAL_ATTRIBUTE),
      conditionalNext: $step.attr(config.CONDITIONAL_NEXT_ATTRIBUTE),
      buttons: buttonsObject,
    });
  });

  // Add logic to stepsObject
  const stepsCount = stepsObject.length;

  stepsObject.forEach(step => {
    // Local val
    const stepIndex = step.index,
      relativeLast = step.$.attr(config.LAST_STEP_ATTRIBUTE);

    // Conditional last logic
    step.isLast = stepIndex === stepsCount - 1 ? true : false;
    if (relativeLast === 'true') step.isLast = true;

    // Set last step attribute
    if (step.isLast) step.$.attr(config.LAST_STEP_ATTRIBUTE, 'true');

    // Next id logic
    step.buttons.forEach(button => {
      // If a conditional is set, set the the button next step id to it
      if (button.conditional !== undefined) {
        button.nextStepId = (() => {
          for (step of stepsObject) {
            if (step.conditional === button.conditional) {
              return step.index;
            }
          }
        })();
      }

      // If conditional next is set, return next step index
      else if (
        stepsObject[!step.isLast ? stepIndex + 1 : stepIndex]
          .conditionalNext !== undefined
      ) {
        button.nextStepId = stepIndex + 1;
      }

      // Else return the next step that is unconditional & not conditional next
      else {
        button.nextStepId = (() => {
          for (step of stepsObject) {
            if (
              step.index > stepIndex &&
              step.conditional === undefined &&
              step.conditionalNext === undefined
            ) {
              return step.index;
            }
          }
        })();
      }
    });
  });

  // console.log(stepsObject);

  return stepsObject;
}
