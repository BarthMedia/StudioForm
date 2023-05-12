// + Imports +
import * as config from '../../config.js';
import autoEagerLoadRichTextImages from './autoEagerLoadRichTextImages.js';

// + Exports +
export default function (stateData) {
  // Auto eager load rich text images
  autoEagerLoadRichTextImages(stateData);

  // Values
  const method =
    stateData.elements.$formBlock.attr(
      config.STEP_HEIGHT_CALCULATION_METHOD_ATTRIBUTE
    ) || 'step -> children';

  // Define callable function
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

      if (method == 'vanilla js') {
        const styles = getComputedStyle($step[0]);
        stepHeight = parseFloat(styles.height);
      } else if (method == 'step -> children') {
        // === 'step children'
        // Childrenloop
        $step.children().each(function () {
          // Elements
          const $child = $(this);

          // Itterate
          stepHeight += $child.outerHeight(true);
        });
      } else {
        //method == 'step'
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
