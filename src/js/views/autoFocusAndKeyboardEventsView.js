// + Imports +
import * as config from '../config.js';
import selectButton from '../utils/view/visuals/selectButton.js';

// + Classes +

// - - Handle bmg autofocus & keyboard events - -
class AutoFocusAndKeyboardEventsView {
  init(stateData) {
    // Elements
    const $formBlock = stateData.elements.$formBlock;

    // Initialize autofocus attribute on 1st form
    if (stateData.formBlockIndex == 0) {
      $formBlock.attr(config.AUTO_FOCUS_ATTRIBUTE, true);
    }

    // Allow key board controls only on the recently clicked form
    $formBlock.mouseenter(() => {
      $formBlock.attr(config.AUTO_FOCUS_ATTRIBUTE, false);
      $formBlock.attr(config.AUTO_FOCUS_ATTRIBUTE, true);
    });

    // Keyboard variables
    const escEvent = (
        $formBlock.attr(config.ESC_EVENT_ATTRIBUTE) || config.ESC_EVENT_DEFAULT
      ).split(', '),
      enterEvent = (
        $formBlock.attr(config.ENTER_EVENT_ATTRIBUTE) ||
        config.ENTER_EVENT_DEFAULT
      ).split(', '),
      leftEvent = (
        $formBlock.attr(config.LEFT_EVENT_ATTRIBUTE) ||
        config.LEFT_EVENT_DEFAULT
      ).split(', '),
      rightEvent = (
        $formBlock.attr(config.RIGHT_EVENT_ATTRIBUTE) ||
        config.RIGHT_EVENT_DEFAULT
      ).split(', ');

    // - Initialize keyboard events -
    document.onkeydown = function (evt) {
      // Assign event
      evt = evt || window.event;

      // Check if keyboard is turned off on current step
      const currentStepId =
          stateData.clickRecord[stateData.clickRecord.length - 1].step,
        $currentStep = stateData.elements.$form.find(
          `[${config.STEP_INDEX_ATTRIBUTE} = "${currentStepId}"]`
        );

      if (
        $currentStep.attr(config.KEYBOARD_EVENTS_ON_STEP_ATTRIBUTE) == 'false'
      ) {
        return;
      }

      if (
        'key' in evt &&
        stateData.keyEventsAllowed &&
        $formBlock.attr(config.AUTO_FOCUS_ATTRIBUTE) == 'true'
      ) {
        // Variables
        const key = evt.key.toLowerCase();

        if (escEvent.includes(key)) {
          stateData.handlers.goToPreviousStep();
        } else if (enterEvent.includes(key) && !evt.shiftKey) {
          // Only if shift is not pressed
          stateData.handlers.findNextStep();
        } else if (leftEvent.includes(key) && !evt.shiftKey) {
          // Only if shift is not pressed
          findNextButton(-1);
        } else if (rightEvent.includes(key) && !evt.shiftKey) {
          // Only if shift is not pressed
          findNextButton(1);
        }
      }
    };

    // - Select next button -
    const isInfinity =
      stateData.styles['leftRightKeyEventInfinityAllowed'] == 'true'
        ? true
        : false;

    function findNextButton(directionInt = 1) {
      // Variables
      const currentStepId =
          stateData.clickRecord[stateData.clickRecord.length - 1].step, // Get current click record entry
        object = stateData.stepLogic[currentStepId],
        $currentStep = object.$, // find step with that id
        buttonLength =
          $currentStep.find(`[${config.CLICK_ELEMENT_ID_ATTRIBUTE}]`).length -
          1,
        $clickedButton = $currentStep.find(
          `[${config.MARK_CLICK_ELEMENT_ATTRIBUTE} = "true"]`
        ), // find button with got clicked attribute
        clickedButtonId = parseInt(
          $clickedButton.attr(config.CLICK_ELEMENT_ID_ATTRIBUTE) || -2
        );
      let x = clickedButtonId == -2 ? 0 : clickedButtonId + directionInt;

      // Logic
      if (isInfinity) {
        x = x > buttonLength ? 0 : x;
        x = x < 0 ? buttonLength : x;
      } else {
        x = x > buttonLength ? buttonLength : x;
        x = x < 0 ? 0 : x;
      }

      // Action
      selectButton(stateData, x, $currentStep);
    }
  }
}

// + Exports +
export default new AutoFocusAndKeyboardEventsView();
