// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// Navigation
import navSubmit from './navSubmit';

// Error
const errPath = (i: StudioFormInstance) =>
  `${controllerUtils.errorName(i.name)} to.ts:`;

// Export
export default async function (
  instance: StudioFormInstance,
  slideIdentification: string | number,
  options: SFONav,
  internal = false,
  navSubmitCommand = false
) {
  // + + + Input + + +

  // Values
  const modes = instance.config.modes;
  const isToDone = slideIdentification === 'done';

  // Guard - 0
  if (!['string', 'number'].includes(typeof slideIdentification)) {
    const msg = `${errPath(instance)} Invalid type of slide identification: `;
    console.error(msg, slideIdentification);
    return false;
  }

  // Guard - 1 - is done!
  if (instance.isDone && isToDone) {
    const msg = `${errPath(instance)} Form already submitted!`;
    console.warn(msg);
    return false;
  }

  // Manipulate to number
  if (
    typeof slideIdentification === 'string' &&
    /^\d+$/.test(slideIdentification)
  )
    slideIdentification = parseInt(slideIdentification);

  // Test if valid id

  // Test if valid string
  const validStrings = ['done'];

  // Calculate if it is submit & animation direction
  const currentId = instance.isDone ? 'done' : utils.currentSlideId(instance);
  const isPrev = false; // If "negative" value exist in prev path

  //  + + + Preperation + + +

  // Guard - 2 - Nav
  if (
    !utils.navGuard(
      instance,
      errPath,
      options,
      { to: true, prev: isPrev },
      true
    )
  )
    return false;

  // Await promise resolve
  if (
    modes.promiseResolve &&
    (!isPrev || modes.onPrevPromiseResolve) &&
    (!isToDone || modes.onSubmitPromiseResolve)
  ) {
    const response = await instance.promise();
    if (!response) return false;
  }

  //   console.log(
  //     "Resolve event has to include direction, 'prev, 'next, 'submit, 'custom'"
  //   );

  // + + + Execution + + +

  // * Submission *

  // If next -> done
  if (isToDone && !navSubmitCommand) {
    // Fetch
    const res = await navSubmit(instance, options, internal, true);

    // Logic
    if (!res) return false;
  }

  // * Jump back logic *

  // * Next / prev *

  // * Animate *

  // * Default *
  return true;

  //   // Logic
  //   state.sdk.slideRecord.pop();

  //   // * Animate *

  //   // Main
  //   state.view.animate({
  //     ...options,
  //     currentSlideId: currentSlideId,
  //     nextSlideId: next,
  //   });

  //   // Prev buttons
  //   if (index === 0)
  //     state.elements.prevBtns.forEach((btn: HTMLElement) => {
  //       // Style init
  //       helper.addSfHide(btn);
  //     });

  //   // Trigger events
  //   helper.triggerAllFunctions(state.view.eventsFunctionArrays.afterPrev);
  // }

  // Guard

  console.log(
    'if slideIdentification pattern matches numbers exclusively, turn into numbers. Or if already number'
  );

  //*

  /**
   *
   *
   *
   *
   *
   */
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
  if (state.sdk.isToDoneted === true) {
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
  const currentSlideId = utils.currentSlideId(instance);
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
