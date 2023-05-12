// + Imports +
import * as config from '../config.js';
import stepRequirementsPassed from '../utils/view/logics/stepRequirementsPassed.js';
import animateStepTransition from '../utils/view/visuals/animateStepTransition.js';
import selectButton from '../utils/view/visuals/selectButton.js';
import progressBarView from './progressBarView.js';
import anchorView from './anchorView.js';
import removeOtherSteps from '../utils/view/logics/removeOtherSteps.js';
import initQuizMode from '../utils/view/logics/initQuizMode.js';
import performVisualSubmit from '../utils/view/visuals/performVisualSubmit.js';

// + Classes +
class StepView {
  addHandlers(stateData) {
    // Fix the this Keyword
    const thisClass = this;

    // Find next
    stateData.handlers.findNextStep = (triggeredBySwipe = false) => {
      thisClass.#findNext(stateData, triggeredBySwipe);
    };

    // Go to next
    // stateData.handlers.goToNextStep = () => {
    //   thisClass.#goToNext(stateData, stepIndex, buttonIndex);
    // };

    // Go to prev
    stateData.handlers.goToPreviousStep = (triggeredBySwipe = false) => {
      thisClass.#goToPrev(stateData, triggeredBySwipe);
    };

    // Submit form
    stateData.handlers.submit = () => {
      thisClass.#submitForm(stateData);
    };

    // Fire anchor
    stateData.handlers.anchorFunctionality = () => {
      anchorView.functionality(stateData);
    };

    // Initialize progress bar
    anchorView.init(stateData);

    // Update progress bar
    stateData.handlers.updateProgressBar = (isSubmit = false) => {
      progressBarView.update(stateData, isSubmit);
    };

    // Initialize progress bar
    stateData.handlers.updateProgressBar();
  }

  // - Find next -
  #findNext(stateData, triggeredBySwipe) {
    // Variables
    const currentStepId =
        stateData.clickRecord[stateData.clickRecord.length - 1].step, // Get current click record entry
      object = stateData.stepLogic[currentStepId];

    // Prevent swipe gestures when turned off on step
    if (triggeredBySwipe && object.swipeAllowed.toLowerCase() == 'false') {
      return;
    } // Check if swipe gesture is allowed in stepLogicObject

    // Elements
    const $currentStep = object.$, // find step with that id
      $clickedButton = $currentStep.find(
        `[${config.MARK_CLICK_ELEMENT_ATTRIBUTE} = "true"]`
      ), // find button with got clicked attribute
      clickedButtonId = $clickedButton.attr(config.CLICK_ELEMENT_ID_ATTRIBUTE);

    // Logic
    if ($clickedButton.length == 1) {
      if (stepRequirementsPassed(stateData.elements.$formBlock, $currentStep)) {
        this.#goToNext(stateData, currentStepId, clickedButtonId);
      }
    } else {
      // Select button number 1
      if (stateData.autoDetectNextStep)
        selectButton(stateData, 0, $currentStep);

      // Update next button
      this.#updateNextButton(stateData, currentStepId);
    }

    // If no button exists
    const $currentStepButtons = $currentStep.find(
      `[${config.CLICK_ELEMENT_ID_ATTRIBUTE}]`
    );
    if ($currentStepButtons.length === 0) {
      if (stepRequirementsPassed(stateData.elements.$formBlock, $currentStep)) {
        this.#goToNext(stateData, currentStepId, null);
      }
    }
  }

  // - Update next button -
  #updateNextButton(stateData, stepId) {
    // Security return check
    if (stateData.elements.$nextButton.length < 1) return;

    // If slider mode && not last slide
    if (stateData.sliderMode && !stateData.stepLogic[stepId].isLast) {
      // Animate
      gsap.to(
        stateData.elements.nextButtons,
        stateData.styles['cssBackForthActive']
      );
      return;
    } else if (stateData.sliderMode) {
      gsap.to(
        stateData.elements.nextButtons,
        stateData.styles['cssBackForthInactive']
      );
      return;
    }

    // Elements
    const $step = stateData.elements.$form.find(
        `[${config.STEP_INDEX_ATTRIBUTE} = "${stepId}"]`
      ),
      $clickedButton = $step.find(
        `[${config.MARK_CLICK_ELEMENT_ATTRIBUTE} = "true"]`
      );

    // Action logic
    if (
      $clickedButton.length > 0 &&
      stepRequirementsPassed(stateData.elements.$formBlock, $step)
    ) {
      // If a clicked button exists
      gsap.to(
        stateData.elements.nextButtons,
        stateData.styles['cssBackForthActive']
      );
    } else {
      gsap.to(
        stateData.elements.nextButtons,
        stateData.styles['cssBackForthInactive']
      );
    }
  }

  // - Go to next step -
  #goToNext(stateData, stepIndex, buttonIndex) {
    // Variable
    let nextStepId;

    // If no buttons exist
    if (buttonIndex === null) {
      // if last
      if (!stateData.stepLogic[stepIndex].isLast) nextStepId = stepIndex + 1;
    } else {
      // Variable
      nextStepId =
        stateData.stepLogic[stepIndex].buttons[buttonIndex].nextStepId;
    }

    // Activate back button
    gsap.to(
      stateData.elements.backButtons,
      stateData.styles['cssBackForthActive']
    );

    // Submit if last step
    if (stateData.stepLogic[stepIndex].isLast) {
      stateData.handlers.submit();
    } else {
      // Variables
      const $currentStep = stateData.stepLogic[stepIndex].$,
        $nextStep = stateData.stepLogic[nextStepId].$;

      // Functions

      // Update click record
      stateData.clickRecord.push({ step: nextStepId });

      // Call transition animation
      animateStepTransition(stateData, $currentStep, $nextStep);

      // Update next button
      this.#updateNextButton(stateData, nextStepId);

      // Update progres bar
      stateData.handlers.updateProgressBar();

      // Perfomr anchor functionality
      stateData.handlers.anchorFunctionality();
    }

    // Dev mode
    if (stateData.devMode > 0.5) {
      console.log(`Dev mode ${devMode}; Click record: `, clickRecord);
    }
  }

  // - Go to prev step -
  #goToPrev(stateData, triggeredBySwipe) {
    // Variables
    const currentStepId =
        stateData.clickRecord[stateData.clickRecord.length - 1].step,
      prevStepId =
        stateData.clickRecord[Math.max(stateData.clickRecord.length - 2, 0)]
          .step;

    // Prevent swipe gestures when turned off on step
    if (
      triggeredBySwipe &&
      stateData.stepLogic[currentStepId].swipeAllowed.toLowerCase() == 'false'
    ) {
      return;
    }

    // Prevent going before first step
    if (currentStepId != prevStepId) {
      // Elements
      const $currentStep = stateData.elements.$form.find(
          `[${config.STEP_INDEX_ATTRIBUTE} = "${currentStepId}"]`
        ),
        $prevStep = stateData.elements.$form.find(
          `[${config.STEP_INDEX_ATTRIBUTE} = "${prevStepId}"]`
        );

      // Functions
      stateData.clickRecord.pop(); // Remove last element
      animateStepTransition(stateData, $currentStep, $prevStep);
    }

    if (
      stateData.clickRecord.length <= 1 &&
      stateData.elements.$backButton.length > 0
    ) {
      // Is approaching first step
      // Inactivate back button
      gsap.to(
        stateData.elements.backButtons,
        stateData.styles['cssBackForthInactive']
      );
    }

    // Update next button
    this.#updateNextButton(stateData, prevStepId);

    // Update progres bar
    stateData.handlers.updateProgressBar();

    // Perfomr anchor functionality
    stateData.handlers.anchorFunctionality();

    // Dev mode
    if (stateData.devMode > 0.5) {
      console.log(`Dev mode ${devMode}; Click record: `, clickRecord);
    }
  }

  // - - Submit Form - -
  #submitForm(stateData) {
    // - Requirement logic -

    // Variables
    const currentStepId =
        stateData.clickRecord[stateData.clickRecord.length - 1].step, // Get current click record entry
      object = stateData.stepLogic[currentStepId],
      $currentStep = object.$;

    // Slider mode
    if (stateData.sliderMode) return;

    // Request
    if (!stepRequirementsPassed(stateData.elements.$formBlock, $currentStep)) {
      return false; // Break
    }

    // Turn off keyboard form navigation
    stateData.keyEventsAllowed = false;

    // Remove all steps that are not part of the click record before submitting
    removeOtherSteps(
      stateData.stepLogic,
      stateData.clickRecord,
      stateData.elements.$formBlock
    );

    // Initialize quiz mode
    initQuizMode(stateData);

    // Update progress bar
    stateData.handlers.updateProgressBar(true);

    // Hide back & next buttons
    gsap.to(
      [stateData.elements.backButtons, stateData.elements.nextButtons],
      stateData.styles['cssHide']
    );

    // Submit
    performVisualSubmit(stateData);
  }
}

// + Exports +
export default new StepView();
