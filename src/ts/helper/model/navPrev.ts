// Imports
import * as utils from './utils';
import * as model from '../../model';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${helper.errorName(s)}prev.ts -> default: `;
export default function (stateId: number, options: Options) {
  console.log("can't go previous or next if instance == done = true !");

  // Values
  const state = model.state[stateId];

  console.log(
    "Resolve event has to include direction, 'prev, 'next, 'submit, 'custom'"
  );

  // Guard 0 - Let animations finish
  if (
    state.modes.waitForAnimations === true &&
    options.doNotWaitForAnimations !== true &&
    state.view.gsapTimeline.isRunning === true
  ) {
    const msg = `${errPath(state)}The animation is not yet finished!`;
    console.warn(msg);
    return msg;
  }

  // Warn guard
  if (state.sdk.isSubmitted === true) {
    const msg = `${errPath(state)}Form already submitted!`;
    console.warn(msg);
    return msg;
  }

  // Length === 1 guard
  if (state.sdk.slideRecord.length <= 1) {
    // Visual
    state.elements.prevBtns.forEach((btn: HTMLElement) => {
      // Style init
      helper.addSfHide(btn);
    });

    // Programmatically
    const msg = `${errPath(state)}Can't navigate backwards any further!`;
    console.warn(msg);
    return msg;
  }

  // Define
  const currentSlideId: number =
    state.sdk.slideRecord[state.sdk.slideRecord.length - 1];
  const next: number = state.sdk.slideRecord[state.sdk.slideRecord.length - 2];
  const index = state.sdk.slideRecord.indexOf(next);

  // Logic
  state.sdk.slideRecord.pop();

  // * Animate *

  // Main
  state.view.animate({
    ...options,
    currentSlideId: currentSlideId,
    nextSlideId: next,
  });

  // Prev buttons
  if (index === 0)
    state.elements.prevBtns.forEach((btn: HTMLElement) => {
      // Style init
      helper.addSfHide(btn);
    });

  // Trigger events
  helper.triggerAllFunctions(state.view.eventsFunctionArrays.afterPrev);
}
