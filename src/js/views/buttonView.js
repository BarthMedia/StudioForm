// + Imports +
import * as config from '../config.js';
import defineStepType from '../utils/view/logics/defineStepType.js';
import { markClickElement } from '../helper';

// + Classes +
class ButtonView {
  // Initialze buttons
  init(stateData) {
    // Initialize back & forth buttons
    this.#initBackForthButtons(stateData);

    // Initialize continue buttons
    this.#initContinueButtons(stateData.handlers, stateData.elements);

    // - Backwards buttons -
    this.#addBackwardButtonHandler(stateData.handlers, stateData.elements);

    // - Next button(s) -
    this.#addNextButtonHandler(
      stateData.handlers,
      stateData.elements,
      stateData.autoDetectNextStep
    );

    // - Submit buttons -
    this.#addSubmitButtonHandler(stateData.handlers, stateData.elements);
  }

  // - Backwards buttons -
  #addBackwardButtonHandler(handlers, elements) {
    elements.$backwardsButtons.add(elements.$backButton).each(function () {
      $(this).click(() => {
        // console.log('Ey, this works!');
        handlers.goToPreviousStep();
      });
    });
  }

  // - Next button(s) -
  #addNextButtonHandler(handlers, elements, autoDetectNextStep) {
    elements.$nextButton.each(function () {
      $(this).click(() => {
        // console.log('Ey, this works!');
        handlers.findNextStep(false, autoDetectNextStep);
      });
    });
  }

  // - Submit buttons -
  #addSubmitButtonHandler(handlers, elements) {
    elements.$submitButtons.each(function () {
      $(this).click(() => {
        handlers.submit();
      });
    });
  }

  // Initialize back & forth buttons
  #initBackForthButtons(stateData) {
    // Inactivate back and forth buttons
    const arr =
      stateData.sliderMode || stateData.backwardsForwardsNavigationMode
        ? [stateData.elements.backButtons]
        : [stateData.elements.backButtons, stateData.elements.nextButtons];

    // GSAP set
    gsap.set(arr, {
      ...stateData.styles.cssBackForthInactive,
      duration: 0,
    });
  }

  // Initialize continue buttons
  #initContinueButtons(handlers, elements) {
    // - For each step - Find continue buttons -
    elements.$steps.each(function (stepIndex) {
      // Local elments
      let $step = $(this),
        preventDoubleClick = false;

      // Local functions

      // Define step types
      let $buttons = defineStepType($step, stepIndex, elements.$formBlock); // Returns click elements

      // Init click elements
      markClickElement($buttons);

      // Define click actions
      $buttons.each(function (buttonIndex) {
        // Element
        let $button = $(this);

        // Help future code by indexing
        $button.attr(config.CLICK_ELEMENT_ID_ATTRIBUTE, buttonIndex);

        // Button click function
        $button.click(() => {
          // Prevent double clicking
          if (!preventDoubleClick) {
            setTimeout(() => {
              preventDoubleClick = false;
            }, 10);

            // Call function
            markClickElement($buttons, $button);
            handlers.findNextStep();
          }

          preventDoubleClick = true;
        });
      });
    });
  }
}

// + Exports +
export default new ButtonView();
