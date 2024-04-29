// Imports
import * as utils from './utils';
import * as viewUtils from '../view/utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// Navigation
import navTo from './navTo';

// Error
const errPath = (i: StudioFormInstance) =>
  `${controllerUtils.errorName(i)} next.ts:`;

// Export
export default async function (
  instance: StudioFormInstance,
  options: SFONav,
  internal = false
) {
  // Values
  const ghost = utils.returnGhost(instance);
  const modes = instance.config.modes;
  let next: number | 'done' = 'done';
  const currentSlideId = utils.currentSlideId(instance);

  // Guard - Nav
  if (!utils.navGuard(instance, errPath, options)) return false;

  // Double click guard
  if (ghost.focus.doubleClick) return false;

  // * * * Logic * * *

  // Button click case
  if (options.button) {
    next = options.button.next;
  }

  // If no button click
  if (!options.button) {
    // Values
    const currentSlide = instance.logic[currentSlideId];

    // No buttons case
    if (currentSlide.buttons === false) {
      next = currentSlide.next;
    } else if (currentSlide.buttons.length === 1) {
      next = currentSlide.buttons[0].next;
    } else {
      // Values
      let suggestedButtonFound = false;

      // Loop for suggested button
      currentSlide.buttons.every(button => {
        // Logic
        if (button.element === ghost.focus.button) {
          // Update
          next = button.next;
          suggestedButtonFound = true;

          // Break
          return false;
        }

        // Continue
        return true;
      });

      // If not found suggest the first button
      if (!suggestedButtonFound) {
        // Suggest button[0]
        if (modes.autoSuggestButtons) instance.focus.next();

        // Skip code below
        return 'suggest';
      }
    }
  }

  // * Logic *

  // Success
  return await navTo(instance, next, options, internal);

  // // If next === false call submit event
  // if (next === false) {
  //   instance.submit(options);
  //   return;
  // }

  // // Check step requirements
  // if (!instance.slideRequirements(currentSlideId, options)) {
  //   return;
  // }

  // // * Jump back logic *

  // // Values
  // const i = instance.slideRecord.indexOf(next);
  // if (next < currentSlideId) {
  //   // Guard
  //   if (i < 0)
  //     throw new Error(
  //       `${errPath(
  //         instance
  //       )} -> if (next < currentSlideId) { ... }: Unable to find a logical next slide!`
  //     );

  //   // Slice
  //   instance.slideRecord = instance.slideRecord.slice(0, i + 1);
  // } else if (next !== currentSlideId) {
  //   // Don't push duplicates
  //   if (i < 0) instance.slideRecord.push(next);
  // }

  // // * Animate *

  // // Main
  // instance.view.animate({
  //   ...options,
  //   currentSlideId: currentSlideId,
  //   nextSlideId: next,
  // });

  // // Prev buttons
  // if (next > currentSlideId)
  //   instance.elements.prevbuttons.forEach((button: HTMLElement) => {
  //     // Style init
  //     helper.removeSfHide(button);
  //   });

  // // Trigger events
  // helper.triggerAllFunctions(instance.view.eventsFunctionArrays.afterNext);
}
