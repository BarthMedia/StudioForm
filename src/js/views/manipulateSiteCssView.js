// + Imports +
import * as config from '../config.js';

// + Classes +

// - - Handle mobile swipe gestures - -
class ManipulateSiteCssView {
  init(stateData) {
    this.#handleOverflowStyle(stateData);

    this.#handlePositionStyle(stateData);

    this.#removeVisualDividers(stateData);

    this.#handleResize(stateData);
  }

  // Handle screen resize
  #handleResize(stateData) {
    // Logic guard
    if (stateData.devMode >= 2) {
      console.log(`Dev mode ${devMode}: Step heihgts not calculated ...`);
      return;
    }

    // If dev mode is 200% or higher, do not:

    // Values
    const { elements } = stateData,
      { styles } = stateData;

    // Define
    const changeDom = function () {
      // Values
      const { stepHeights } = stateData,
        { clickRecord } = stateData,
        currentStepId = clickRecord[clickRecord.length - 1].step;

      // Hide
      elements.$steps.hide();

      // Resize action
      elements.$form.css({
        height: stepHeights[currentStepId],
      });

      // Show
      elements.$steps
        .eq(currentStepId)
        .css('display', styles.firstStepDisplayCss);
    };

    // Initialize
    changeDom();

    // Event listener
    $(window).resize(changeDom);
  }

  // Delete visual dividers
  #removeVisualDividers(stateData) {
    // Values
    const { devMode } = stateData,
      { elements } = stateData;

    // Logic guard
    if (devMode >= 2) {
      console.log(`Dev mode ${devMode}: Visual dividers not removed ...`);
      return;
    }

    // If dev mode is 200% or higher, do not:
    elements.$form.find(config.DIVIDER_SELCTOR).remove();
  }

  #handlePositionStyle(stateData) {
    // Values
    const { elements } = stateData;

    // Action
    elements.$form.css({
      position: 'relative',
      // height: elements.$steps.eq(0).outerHeight(true),
    });

    elements.$steps.css({
      position: 'absolute',
      top: '0%',
      right: '0%',
      bottom: '0%',
      left: '0%',
    });
  }

  #handleOverflowStyle(stateData) {
    // Elements
    const $formBlock = stateData.elements.$formBlock,
      $closestSection = $formBlock.closest('section');

    // Values
    const formBlockOverflowCss = $formBlock.css('overflow');

    // Logic
    if ($closestSection.length === 1 && formBlockOverflowCss === 'visible') {
      $closestSection.css('overflow', 'hidden');
    } else if (formBlockOverflowCss === 'visible') {
      $formBlock.css('overflow', 'hidden');
    }
  }
}

// + Exports +
export default new ManipulateSiteCssView();
