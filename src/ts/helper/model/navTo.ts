// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as model from '../../model';
import * as config from '../../config';

// Navigation
import navSubmit from './navSubmit';

// Animate
import * as transition from '../view/animateTransition';
import animateCurrent from '../view/animateCurrent';
import animateProgress from '../view/animateProgress';
import scrollTo from '../view/scrollTo';

// Promise resolve
import animatePromiseResolve from '../view/animatePromiseResolve';

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
  const ghost = utils.returnGhost(instance);
  const isToDone = slideIdentification === 'done';
  const currentId = instance.isDone ? 'done' : utils.currentSlideId(instance);
  const currentIdIsNumber = currentId !== 'done';

  // Guard - 0
  if (!['string', 'number'].includes(typeof slideIdentification)) {
    const msg = `${errPath(instance)} Invalid type of slide identification: `;
    console.error(msg, slideIdentification);
    return false;
  }

  // Manipulate to number
  if (
    typeof slideIdentification === 'string' &&
    /^\d+$/.test(slideIdentification)
  )
    slideIdentification = parseInt(slideIdentification);

  // Test if valid string or valid number
  if (!isToDone) {
    // Values
    let found = false;
    const isString = typeof slideIdentification === 'string';

    // Loop
    instance.logic.every(slide => {
      // Logic
      if (slide[isString ? 'name' : 'index'] === slideIdentification) {
        // Overwrite
        if (isString) slideIdentification = slide.index;
        found = true;

        // Break
        return false;
      }

      // Default
      return true;
    });

    // Guard - 1 - invalid search key
    if (!found) {
      const msg = `${errPath(instance)} Invalid slide identification: `;
      console.error(msg, slideIdentification);
      return false;
    }
  }

  // Guard - 1 - is equal!
  if (currentId === slideIdentification) {
    const msg = `${errPath(
      instance
    )} New slide identification cannot equal the current slide identification!`;
    controllerUtils.warn(msg);
    return false;
  }

  // Calculate if it is submit & animation direction
  const nextId =
    typeof slideIdentification === 'number' ? slideIdentification : 'done';
  const nextIdIsNumber = nextId !== 'done';
  const isPrev = !currentIdIsNumber || (nextIdIsNumber && currentId > nextId);

  //  + + + Preperation + + +

  // Guard - 3 - Nav
  if (
    !utils.navGuard(
      instance,
      errPath,
      options,
      { to: true, prev: isPrev },
      !navSubmitCommand
    )
  )
    return false;

  // Await promise resolve
  if (
    modes.promiseResolve &&
    (!isPrev || modes.onPrevPromiseResolve) &&
    (!isToDone || modes.onSubmitPromiseResolve)
  ) {
    // Await
    const response = await animatePromiseResolve(
      instance,
      {
        direction: isPrev ? 'prev' : isToDone ? 'done' : 'next',
        current: currentId,
        next: slideIdentification,
      },
      internal
    );

    // Guard
    if (!response) return false;
  }

  // + + + Execution + + +

  // * Submission *

  // If next -> done
  if (isToDone && !navSubmitCommand) {
    // Fetch
    const res = await navSubmit(instance, options, internal, true);

    // Logic
    if (!res) return false;
  }

  // * Update root state *
  ghost.root.isDone = isToDone;

  // * Jump back / next / prev logic *

  // Loop
  if (nextIdIsNumber) {
    // Values
    let recordSurpassed: false | number = false;

    // Loop
    instance.record.every((int, index) => {
      // Logic
      if (nextId <= int) {
        recordSurpassed = index;
        return false;
      }

      // Default
      return true;
    });

    // Logic
    if (recordSurpassed === false) ghost.record.push(nextId);
    else {
      // Slice
      ghost.record.length = recordSurpassed + 1;
    }
  }

  // * Accessability *

  // Success message
  const tabindex = 'tabindex';
  const doneMessageElement = instance.elements.done;
  if (doneMessageElement) {
    // Logic
    if (!isToDone && doneMessageElement.getAttribute(tabindex) !== '-1')
      doneMessageElement.setAttribute(tabindex, '-1');
    else if (isToDone) {
      doneMessageElement.setAttribute(tabindex, '0');
    }
  }

  // Area hidden
  const areaHidden = 'aria-hidden';
  if (nextIdIsNumber)
    instance.logic[nextId].element.removeAttribute(areaHidden);
  if (currentIdIsNumber)
    instance.logic[currentId].element.setAttribute(areaHidden, 'true');

  // * Calculate animation properties
  transition.data(instance, currentId, nextId, options);

  // * Transition event
  const event = viewUtils.dispatchEvent(instance, 'transition', internal, true);
  const doNotAnimateTranistion = !modes.transition || event.defaultPrevented;

  // * Animate *

  // Elements & values
  const aData = instance.data.animation;
  const currentSlide = aData.currentElement;

  // Main
  if (!doNotAnimateTranistion) {
    // Transition
    transition.animate(instance);

    // Progress bar
    animateProgress(instance);

    // * Test if current slide top is visible

    // Logic
    const currentSlideTopVisible = viewUtils.isElementTopVisible(
      instance,
      currentSlide
    );

    // * Call anchor animation *
    if (!modes.scrollIfTopNotVisible || !currentSlideTopVisible)
      setTimeout(
        () => {
          scrollTo(instance, aData.nextElement, internal);
        },
        aData.currentHeight < aData.nextHeight
          ? aData.currentTime * 1000 + 1
          : aData.timeBoth * 1000 + 1
      );
  }

  // Combo clases
  animateCurrent(instance, aData.currentTime);

  // * Redirect *
  const redirect = instance.data.fetch.redirect;
  if (isToDone && modes.redirect && redirect)
    console.log(
      "Make redirect-timeout (default = aData.timeBoth / aData.time) asdjustable, so that you can better build 'fetched' ->  3,2,1   functionality",
      'Restructure naming logic of animation Data !!!'
    );

  setTimeout(() => {
    // Redirect
    location.href = redirect;
  }, aData.timeBoth * 1000);

  // * Default *
  return true;
}

// Notes: :::

// //   // Logic
// //   state.sdk.slideRecord.pop();

// //   // * Animate *

// //   // Main
// //   state.view.animate({
// //     ...options,
// //     currentSlideId: currentSlideId,
// //     nextSlideId: next,
// //   });

// //   // Prev buttons
// //   if (index === 0)
// //     state.elements.prevBtns.forEach((btn: HTMLElement) => {
// //       // Style init
// //       helper.addSfHide(btn);
// //     });

// //   // Trigger events
// //   helper.triggerAllFunctions(state.view.eventsFunctionArrays.afterPrev);
// // }

// // Guard

// console.log(
//   'if slideIdentification pattern matches numbers exclusively, turn into numbers. Or if already number'
// );

// //*

// /**
//  *
//  *
//  *
//  *
//  *
//  */
// console.log(
//   "THIS CAN'T MAKE A MOVE IF THERE IS CURRENTLY AN ACTIVE PROMISE!"
// );

// console.log('Fire animateCurrent within the animate section!');

// console.log(
//   "THIS works with 'done', however the target has to be different from the current position!"
// );

// console.log(
//   "Make sure, the native event get's fired on the correct .to() operation",
//   "make sure, that event next, prev, submit, to and their api version's have the apropriate defaultPrevented functionality!"
// );

// console.log('! update slide now and slide next!');

// // Values
// const state = model.state[stateId];

// console.log('Should very well have a sf-name feature!');

// console.log('Major importance & logic shall happen in this file!');

// console.log(
//   'I SHALL WORK BASED ON THE .elements.tos.forEach().forEach() functionality!'
// );

// console.log(
//   "Resolve event has to include direction, 'prev, 'next, 'submit, 'custom'"
// );

// // Guard 0 - Let animations finish
// if (
//   state.modes.waitForAnimations === true &&
//   options.doNotWaitForAnimations !== true &&
//   state.view.gsapTimeline.isRunning === true
// ) {
//   const msg = `${errPath(state)}The animation is not yet finished!`;
//   controllerUtils.warn(msg);
//   return msg;
// }

// // Warn guard
// if (state.sdk.isToDoneted === true) {
//   const msg = `${errPath(state)}Form already submitted!`;
//   controllerUtils.warn(msg);
//   return msg;
// }

// // Length === 1 guard
// if (state.sdk.slideRecord.length <= 1) {
//   // Visual
//   state.elements.prevBtns.forEach((btn: HTMLElement) => {
//     // Style init
//     helper.addSfHide(btn);
//   });

//   // Programmatically
//   const msg = `${errPath(state)}Can't navigate backwards any further!`;
//   controllerUtils.warn(msg);
//   return msg;
// }

// // Define
// const currentSlideId = utils.currentSlideId(instance);
// const next: number = state.sdk.slideRecord[state.sdk.slideRecord.length - 2];
// const index = state.sdk.slideRecord.indexOf(next);

// // Logic
// state.sdk.slideRecord.pop();

// console.log(
//   '.focus, on the new current slide!!!!!',
//   'Make it possible to programmatically insert super custom transitions!'
// );

// // * Animate *

// // Main
// state.view.animate({
//   ...options,
//   currentSlideId: currentSlideId,
//   nextSlideId: next,
// });

// // Prev buttons
// if (index === 0)
//   state.elements.prevBtns.forEach((btn: HTMLElement) => {
//     // Style init
//     helper.addSfHide(btn);
//   });

// // Trigger events
// helper.triggerAllFunctions(state.view.eventsFunctionArrays.afterPrev);
