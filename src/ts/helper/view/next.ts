// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (index: number, options: Options) {
  // Values
  const state = model.state[index];
  let next: number | undefined | boolean;
  const currentSlideId: number =
    state.sdk.slideRecord[state.sdk.slideRecord.length - 1];

  // Button click case
  if (options.btn) {
    next = options.btn.next;
  }

  // If no button click
  if (!options.btn) {
    // Values
    const currentSlide = state.sdk.slideLogic[currentSlideId];

    // Guard
    if (!currentSlide)
      throw new Error(
        `StudioForm[${state.sdk.i}] -> next.ts -> default: Unable to find the current slide!`
      );

    // No buttons case
    if (currentSlide.btns === false) {
      next = currentSlide.next;
    } else if (currentSlide.btns.length === 1) {
      next = currentSlide.btns[0].next;
    } else {
      // Values
      let suggestedBtnFound = false;

      // Loop for suggested button
      currentSlide.btns.every((btn: any) => {
        // Logic
        if (btn.suggested) {
          // Update
          next = btn.next;
          suggestedBtnFound = true;

          // Break
          return false;
        }

        // Continue
        return true;
      });

      // If not found suggest the first button
      if (!suggestedBtnFound) {
        // Suggest btn[0]
        state.sdk.suggestButton(currentSlideId, 0);

        // Skip code below
        return {
          msg: `StudioForm[${state.sdk.i}] -> state.sdk.slideLogic[${currentSlide.i}] -> .btns[0] was suggested!`,
          slideId: currentSlide.i,
          buttonId: 0,
        };
      }
    }
  }

  // * Logic *

  // Guard
  if (typeof next !== 'number' && next !== false)
    throw new Error(
      `StudioForm[${state.sdk.i}] -> next.ts -> default: Unable to find a logical next slide!`
    );

  // If next === false call submit event
  if (next === false) {
    state.sdk.submit();
    return;
  }

  // Jump back logic   currentSlideId
  if (next < currentSlideId) {
    // Values
    const i = state.sdk.slideRecord.indexOf(next);

    // Guard
    if (i < 0)
      throw new Error(
        `StudioForm[${state.sdk.i}] -> next.ts -> default -> if (next < currentSlideId) { ... }: Unable to find a logical next slide!`
      );

    // Slice
    state.sdk.slideRecord = state.sdk.slideRecord.slice(0, i + 1);
  }

  console.log(next);

  // Test for requirements
  if (options.checkStepRequirements !== false) {
    console.log(
      'I test for step requirments!  === "sf-required" ;;; On label/parent click --- remove everything'
    );
    console.log(
      'or remove everything when someone tries step requirements again, Store currently active elements is SDK'
    );
  }

  console.log(
    "On requirements checking. If closest('label') overs a label take it. --- if mode is given. ... if not just add css class for children and fire sdk event"
  );
  console.log('on and after suggest button');
}
