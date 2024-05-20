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

  // Update slide id
  const testSlideIdentification = utils.returnTo(
    instance,
    slideIdentification,
    errPath
  );
  if (testSlideIdentification === false) return false;
  slideIdentification = testSlideIdentification;

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
  const direction = isPrev ? 'prev' : isToDone ? 'done' : 'next';
  if (
    !options.fake &&
    modes.promiseResolve &&
    (!isPrev || modes.onPrevPromiseResolve) &&
    (!isToDone || modes.onSubmitPromiseResolve)
  ) {
    // Await
    const response = await animatePromiseResolve(
      instance,
      {
        direction: direction,
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

  // * Animate *

  // Elements & values
  const aData = instance.data.animation;
  const currentSlide = aData.currentElement;

  // * Transition event
  const event = viewUtils.dispatchEvent(
    instance,
    'transition',
    internal,
    true,
    { current: currentId, next: nextId, direction: direction }
  );
  const doNotAnimateTranistion = !modes.transition || event.defaultPrevented;

  // Main
  if (!doNotAnimateTranistion) {
    // Transition
    transition.animate(instance);

    // Progress bar
    animateProgress(instance);

    // * Test if current slide top is visible

    // * Call anchor animation *
    setTimeout(
      () => {
        // Variable
        const wrapperTopVisible = viewUtils.isElementTopVisible(
          instance,
          instance.elements.wrapper
        );

        // Logic
        if (modes.forceScrollToTop || (modes.scrollToTop && !wrapperTopVisible))
          scrollTo(instance, aData.nextElement, internal);
      },
      aData.currentHeight < aData.nextHeight
        ? aData.currentTime * 1000 + 1
        : aData.totalTime * 1000 + 1
    );
  }

  // Combo clases
  animateCurrent(instance, aData.currentTime);

  // * Redirect *
  const redirect = instance.data.fetch.redirect;
  if (isToDone && redirect) {
    setTimeout(() => {
      // Redirect
      location.href = redirect;
    }, instance.config.animations.redirectDelay * 1000);
  }

  // * Default *
  return true;
}
