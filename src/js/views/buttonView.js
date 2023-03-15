// + Imports +
import * as config from '../config.js';
import defineStepType from '../helper/defineStepType.js';
import { markClickElement } from '../helper';

// + Classes +
class ButtonView {
  // Initialze buttons
  init(stateData) {
    // Initialize back & forth buttons
    this.#initBackForthButtons(stateData.elements, stateData.styles);

    // Initialize continue buttons
    this.#initContinueButtons(stateData.elements);

    // - Backwards buttons -
    this.#addBackwardButtonHandler(stateData.elements);

    // - Next button(s) -
    this.#addNextButtonHandler(
      stateData.elements,
      stateData.autoDetectNextStep
    );

    // - Submit buttons -
    this.#addSubmitButtonHandler(stateData.elements);
  }

  // - Update next button -
  #updateNextButton(stepId) {
    // Security return check
    if ($nextButton.length < 1) return;

    // Elements
    let $step = $form.find(`[${stepIndexAttribute} = "${stepId}"]`),
      $clickedButton = $step.find(`[${markClickElementAttribute} = "true"]`);

    // Action logic
    if (
      $clickedButton.length > 0 &&
      stepRequirementsPassed($formBlock, $step)
    ) {
      // If a clicked button exists
      gsap.to(nextButtons, stylesObject[formBlockIndex]['cssBackForthActive']);
    } else {
      gsap.to(
        nextButtons,
        stylesObject[formBlockIndex]['cssBackForthInactive']
      );
    }
  }

  // - Backwards buttons -
  #addBackwardButtonHandler(elements) {
    elements.$backwardsButtons.add(elements.$backButton).each(function () {
      $(this).click(() => {
        goToPrevStep();
      });
    });
  }

  // - Next button(s) -
  #addNextButtonHandler(elements, autoDetectNextStep) {
    elements.$nextButton.each(function () {
      $(this).click(() => {
        findNext(false, autoDetectNextStep);
      });
    });
  }

  // - Submit buttons -
  #addSubmitButtonHandler(elements) {
    elements.$submitButtons.each(function () {
      $(this).click(() => {
        submitForm();
      });
    });
  }

  // Initialize back & forth buttons
  #initBackForthButtons(elements, styles) {
    // Inactivate back and forth buttons
    gsap.set([elements.backButtons, elements.nextButtons], {
      ...styles.cssBackForthInactive,
      duration: 0,
    });
  }

  // Initialize continue buttons
  #initContinueButtons(elements) {
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
            findNext();
          }

          preventDoubleClick = true;
        });
      });
    });
  }
}

// + Exports +
export default new ButtonView();
