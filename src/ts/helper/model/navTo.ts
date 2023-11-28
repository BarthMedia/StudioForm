// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${helper.errorName(s)}prev.ts -> default: `;
export default function (stateId: number, options: Options) {
  console.log(
    "THIS CAN'T MAKE A MOVE IF THERE IS CURRENTLY AN ACTIVE PROMISE!"
  );

  console.log('Fire animateCurrent within the animate section!');

  console.log(
    "THIS works with 'done', however the target has to be different from the current position!"
  );

  console.log(
    "Make sure, the native event get's fired on the correct .to() operation",
    "make sure, that event next, prev, submit, to and their api version's have the apropriate defaultPrevented functionality!"
  );

  console.log('! update slide now and slide next!');

  // Values
  const state = model.state[stateId];

  console.log('Should very well have a sf-name feature!');

  console.log('Major importance & logic shall happen in this file!');

  console.log(
    'I SHALL WORK BASED ON THE .elements.tos.forEach().forEach() functionality!'
  );

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

  console.log(
    '.focus, on the new current slide!!!!!',
    'Make it possible to programmatically insert super custom transitions!'
  );

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
