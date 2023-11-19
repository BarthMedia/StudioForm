// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${helper.errorName(s)} -> next.ts -> default`;
export default function (stateId: number, options: Options) {
  console.log("can't go previous or next if instance == done = true !");

  // Values
  const state = model.state[stateId];
  let next: number | undefined | boolean;
  const currentSlideId: number =
    state.sdk.slideRecord[state.sdk.slideRecord.length - 1];

  // Guard -1
  if (state.view.suggestDoubleClick) return;

  // Guard 0 - Let animations finish
  if (
    state.modes.waitForAnimations === true &&
    options.doNotWaitForAnimations !== true &&
    state.view.gsapTimeline.isRunning === true
  ) {
    const msg = `${errPath}: The animation is not yet finished!`;
    console.warn(msg);
    return msg;
  }

  // Warn guard
  if (state.sdk.isSubmitted === true) {
    const msg = `${errPath}: Form already submitted!`;
    console.warn(msg);
    return msg;
  }

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
      throw new Error(`${errPath}: Unable to find the current slide!`);

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
        // Elements
        const btnEL: HTMLElement = currentSlide.btns[0].el;

        // Suggest btn[0]
        if (state.modes.autoSuggestButtons)
          state.sdk.suggestButton(currentSlideId, 0);

        // Skip code below
        return {
          msg: `${errPath(state)} -> state.sdk.slideLogic[${
            currentSlide.i
          }] -> .btns[0] was suggested!`,
          slideId: currentSlide.i,
          buttonId: 0,
        };
      }
    }
  }

  // * Logic *

  // Undefined edgecase
  if (next === undefined) next = false;

  // Guard
  if (typeof next !== 'number' && next !== false)
    throw new Error(`${errPath(state)}: Unable to find a logical next slide!`);

  // If next === false call submit event
  if (next === false) {
    state.sdk.submit(options);
    return;
  }

  // Check step requirements
  if (!state.sdk.slideRequirements(currentSlideId, options)) {
    return;
  }

  // * Jump back logic *

  // Values
  const i = state.sdk.slideRecord.indexOf(next);
  if (next < currentSlideId) {
    // Guard
    if (i < 0)
      throw new Error(
        `${errPath(
          state
        )} -> if (next < currentSlideId) { ... }: Unable to find a logical next slide!`
      );

    // Slice
    state.sdk.slideRecord = state.sdk.slideRecord.slice(0, i + 1);
  } else if (next !== currentSlideId) {
    // Don't push duplicates
    if (i < 0) state.sdk.slideRecord.push(next);
  }

  // * Animate *

  // Main
  state.view.animate({
    ...options,
    currentSlideId: currentSlideId,
    nextSlideId: next,
  });

  // Prev buttons
  if (next > currentSlideId)
    state.elements.prevBtns.forEach((btn: HTMLElement) => {
      // Style init
      helper.removeSfHide(btn);
    });

  // Trigger events
  helper.triggerAllFunctions(state.view.eventsFunctionArrays.afterNext);
}
