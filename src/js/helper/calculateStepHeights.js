// + Imports +

// + Exports +
export default function (stateData) {
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

      // Childrenloop
      $step.children().each(function () {
        // Elements
        const $child = $(this);

        // Itterate
        stepHeight += $child.outerHeight(true);
      });

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
