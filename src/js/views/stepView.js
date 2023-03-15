// + Imports +

// + Classes +
class StepView {
  addHandlers(stateData) {
    // Find next
    stateData.handlers.findNextStep = this.#findNext(
      stateData,
      triggeredBySwipe,
      autoDetectNextStep
    );

    // Go to next
    stateData.handlers.goToNextStep = this.#goToNext(
      stateData,
      stepIndex,
      buttonIndex
    );

    // Go to prev
    stateData.handlers.goToPreviousStep = this.#goToPrev(
      stateData,
      triggeredBySwipe
    );

    // Submit form
    stateData.handlers.submit = this.#submitForm(stateData);
  }

  // - Find next -
  #findNext(triggeredBySwipe = false, autoDetectNextStep = true) {
    // Variables
    let currentStepId = clickRecord[clickRecord.length - 1].step, // Get current click record entry
      object = stepLogicObject[currentStepId];

    // Prevent swipe gestures when turned off on step
    if (triggeredBySwipe && object.swipeAllowed.toLowerCase() == 'false') {
      return;
    } // Check if swipe gesture is allowed in stepLogicObject

    // Elements
    let $currentStep = object.$, // find step with that id
      $clickedButton = $currentStep.find(
        `[${markClickElementAttribute} = "true"]`
      ), // find button with got clicked attribute
      clickedButtonId = $clickedButton.attr(clickElementIdAttribute);

    // Logic
    if ($clickedButton.length == 1) {
      if (stepRequirementsPassed($formBlock, $currentStep)) {
        goToNextStep(currentStepId, clickedButtonId);
      }
    } else {
      // Select button number 1
      if (autoDetectNextStep) selectButton(0, $currentStep, $formBlock);

      // Update next button
      updateNextButton(currentStepId);
    }
  }

  // - Go to next step -
  #goToNext(stepIndex, buttonIndex) {
    // Variable
    let nextStepId = stepLogicObject[stepIndex].buttons[buttonIndex].nextStepId;

    // Activate back button
    gsap.to(backButtons, stylesObject[formBlockIndex]['cssBackForthActive']);

    // Submit if last step
    if (stepLogicObject[stepIndex].isLast) {
      submitForm();
    } else {
      // Variables
      let $currentStep = stepLogicObject[stepIndex].$;
      $nextStep = stepLogicObject[nextStepId].$;

      // Functions

      // Update click record
      clickRecord.push({ step: nextStepId });

      // Call transition animation
      animateStepTransition($currentStep, $nextStep, $form, devMode);

      // Update next button
      updateNextButton(nextStepId);

      // Update progres bar
      updateProgressBar();

      // Perfomr anchor functionality
      anchorFunctionality();
    }

    // Dev mode
    if (devMode > 0.5) {
      console.log(`Dev mode ${devMode}; Click record: `, clickRecord);
    }
  }

  // - Go to prev step -
  #goToPrev(triggeredBySwipe = false) {
    // Variables
    let currentStepId = clickRecord[clickRecord.length - 1].step,
      prevStepId = clickRecord[Math.max(clickRecord.length - 2, 0)].step;

    // Prevent swipe gestures when turned off on step
    if (
      triggeredBySwipe &&
      stepLogicObject[currentStepId].swipeAllowed.toLowerCase() == 'false'
    ) {
      return;
    }

    // Prevent going before first step
    if (currentStepId != prevStepId) {
      // Elements
      let $currentStep = $form.find(
          `[${stepIndexAttribute} = "${currentStepId}"]`
        ),
        $prevStep = $form.find(`[${stepIndexAttribute} = "${prevStepId}"]`);

      // Functions
      clickRecord.pop(); // Remove last element
      animateStepTransition($currentStep, $prevStep, $form, devMode);
    }

    if (clickRecord.length <= 1 && $backButton.length > 0) {
      // Is approaching first step
      // Inactivate back button
      gsap.to(
        backButtons,
        stylesObject[formBlockIndex]['cssBackForthInactive']
      );
    }

    // Update next button
    updateNextButton(prevStepId);

    // Update progres bar
    updateProgressBar();

    // Perfomr anchor functionality
    anchorFunctionality();

    // Dev mode
    if (devMode > 0.5) {
      console.log(`Dev mode ${devMode}; Click record: `, clickRecord);
    }
  }

  // - - Submit Form - -
  #submitForm() {
    // - Requirement logic -

    // Variables
    let currentStepId = clickRecord[clickRecord.length - 1].step, // Get current click record entry
      object = stepLogicObject[currentStepId],
      $currentStep = object.$;

    // Request
    if (!stepRequirementsPassed($formBlock, $currentStep)) {
      return false; // Break
    }

    // Turn off keyboard form navigation
    keyEventsAllowed = false;

    // Remove all steps that are not part of the click record before submitting
    removeOtherSteps(stepLogicObject, clickRecord, $formBlock);

    // Initialize quiz mode
    initQuizMode($formBlock, clickRecord);

    // Update progress bar
    updateProgressBar(true);

    // Hide back & next buttons
    gsap.to(
      [backButtons, nextButtons],
      stylesObject[formBlockIndex]['cssHide']
    );

    // Submit
    performVisualSubmit($formBlock, $form, devMode);
  }
}

// + Exports +
export default new StepView();
