// + Imports +
import * as config from '../../config.js';

// + Exports +
export default function (stateData) {
  // Values
  const method =
    stateData.elements.$formBlock.attr(
      config.STEP_HEIGHT_CALCULATION_METHOD_ATTRIBUTE
    ) || 'step -> children';
  // Define
  const calculateStepHeights = function () {
    // Values
    const arr = [],
      { elements } = stateData,
      displayCss = stateData.styles.firstStepDisplayCss;

    // Loop
    elements.$steps.each(function () {
      // Values
      let stepHeight = 0;

      // Elements
      const $step = $(this);

      // Show
      $step.css('display', displayCss);

      // + + + Method based calculation + + +
      if (method !== 'step') {
        // === 'step children'
        // Childrenloop
        $step.children().each(function () {
          // Elements
          const $child = $(this);

          // Itterate
          stepHeight += $child.outerHeight(true);
        });
      } else {
        stepHeight = $step.outerHeight(true);
      }

      // Hide
      $step.hide();

      // Populate array
      arr.push(stepHeight);
    });

    // console.log(arr);

    // Reset & Return
    stateData.stepHeights = arr;
  };

  // Initialize
  calculateStepHeights();

  // Event listener
  $(window).resize(calculateStepHeights);
}
