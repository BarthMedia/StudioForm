// + Imports +
import * as config from '../config.js';

// + Classes +

// - - Handle bmg autofocus & keyboard events - -
class AutoFocusAndKeyboardEventsView {
  init(stateData) {
    // Initialize autofocus attribute on 1st form
    if (formBlockIndex == 0) {
      $formBlock.attr(autoFocusAttribute, true);
    }

    // Allow key board controls only on the recently clicked form
    $formBlock.mouseenter(() => {
      $(formBlockSelctor).attr(autoFocusAttribute, false);
      $formBlock.attr(autoFocusAttribute, true);
    });

    // Keyboard variables
    let escEvent = (
        $formBlock.attr(escEventAttribute) || escEventDefault
      ).split(', '),
      enterEvent = (
        $formBlock.attr(enterEventAttribute) || enterEventDefault
      ).split(', '),
      leftEvent = (
        $formBlock.attr(leftEventAttribute) || leftEventDefault
      ).split(', '),
      rightEvent = (
        $formBlock.attr(rightEventAttribute) || rightEventDefault
      ).split(', ');

    // - Initialize keyboard events -
    document.onkeydown = function (evt) {
      // Assign event
      evt = evt || window.event;

      // Check if keyboard is turned off on current step
      let currentStepId = clickRecord[clickRecord.length - 1].step,
        $currentStep = $form.find(
          `[${stepIndexAttribute} = "${currentStepId}"]`
        );

      if ($currentStep.attr(keyboardEventsOnStepAttribute) == 'false') {
        return;
      }

      if (
        'key' in evt &&
        keyEventsAllowed &&
        $formBlock.attr(autoFocusAttribute) == 'true'
      ) {
        // Variables
        let key = evt.key.toLowerCase();

        if (escEvent.includes(key)) {
          goToPrevStep();
        } else if (enterEvent.includes(key) && !evt.shiftKey) {
          // Only if shift is not pressed
          findNext();
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
    let isInfinity =
      stylesObject[formBlockIndex]['leftRightKeyEventInfinityAllowed'] == 'true'
        ? true
        : false;

    function findNextButton(directionInt = 1) {
      // Variables
      let currentStepId = clickRecord[clickRecord.length - 1].step, // Get current click record entry
        object = stepLogicObject[currentStepId],
        $currentStep = object.$, // find step with that id
        buttonLength =
          $currentStep.find(`[${clickElementIdAttribute}]`).length - 1,
        $clickedButton = $currentStep.find(
          `[${markClickElementAttribute} = "true"]`
        ), // find button with got clicked attribute
        clickedButtonId = parseInt(
          $clickedButton.attr(clickElementIdAttribute) || -2
        ),
        x = clickedButtonId == -2 ? 0 : clickedButtonId + directionInt;

      // Logic
      if (isInfinity) {
        x = x > buttonLength ? 0 : x;
        x = x < 0 ? buttonLength : x;
      } else {
        x = x > buttonLength ? buttonLength : x;
        x = x < 0 ? 0 : x;
      }

      // Action
      selectButton(x, $currentStep, $formBlock);
    }
  }
}

// + Exports +
export default new AutoFocusAndKeyboardEventsView();
