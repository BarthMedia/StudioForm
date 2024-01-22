// + Imports +

// Base
import { async } from 'regenerator-runtime';

// Custom
import * as config from '../../config';
import * as model from '../../model';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as attributeUtils from '../view/utilsAttributes';

// Vadility
import reportValidity from '../view/reportValidity';

// Timeout
export const timeout = function (s: number) {
  // Return
  return new Promise(function (_, reject) {
    // Timeout
    setTimeout(function () {
      // Create error
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

// Return next to
export const returnLogicTo = function (
  instanceName: string,
  slideId: number,
  referenceElement: HTMLElement,
  instanceLength: number
) {
  // Overwrite
  slideId += 1;

  // Values
  const instance = model.state.instances[instanceName];

  // Sf to overwriting
  const to = attributeUtils.getAttribute('to', referenceElement);
  const toVal = to
    ? returnTo(
        instance,
        to,
        (i: StudioFormInstance) =>
          controllerUtils.errorName(i) + ' model/utils.ts:'
      )
    : false;

  // Values
  const val =
    toVal !== false
      ? toVal
      : attributeUtils.getAttribute(null, referenceElement) === 'submit'
      ? 'done'
      : instanceLength > slideId
      ? slideId
      : 'done';

  // Return
  return val;
};

// Calculate to
export const returnTo = function (
  instance: StudioFormInstance,
  slideIdentification: string | number,
  errPath: (i: StudioFormInstance) => string
) {
  // Values
  const isToDone = slideIdentification === 'done';
  const currentId = instance.isDone ? 'done' : currentSlideId(instance);

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

  // Return
  return slideIdentification as 'done' | number;
};

// Return ghost
export const returnGhost = function (instance: StudioFormInstance) {
  return model.state.ghostInstances[instance.name];
};

// Current slide id
export const currentSlideId = function (
  instance: StudioFormInstance,
  subtract = 1
) {
  // Return
  return instance.record[instance.record.length - subtract];
};

// Navigation guard
export const navGuard = function (
  instance: StudioFormInstance,
  errPath: (instance: StudioFormInstance) => string,
  options: SFONav,
  { to, submit, prev }: { to?: true; submit?: true; prev?: boolean } = {},
  reportValidity = false
) {
  // Values
  const ghost = returnGhost(instance);
  const modes = instance.config.modes;

  // Instnace guard
  const pass = (() => {
    // Warn guard - 0
    if (instance.isAwaiting) {
      const msg = `${errPath(instance)} Awaiting resolve!`;
      controllerUtils.warn(msg);
      return false;
    }

    // Warn guard - 1
    if (
      (modes.awaitAnimations || options.awaitAnimations) &&
      instance.isTransitioning
    ) {
      const msg = `${errPath(instance)} Animation is not yet finished!`;
      controllerUtils.warn(msg);
      return false;
    }

    // Is to
    if (to) return true;

    // Guard - 2
    if (ghost.focus.doubleClick) return false;

    // Warn guard - 3
    if (instance.isDone) {
      const msg = `${errPath(instance)} Form already submitted!`;
      controllerUtils.warn(msg);
      return false;
    }

    // Is submit
    if (submit) return true;

    // Warn guard - 4 - Slider mode guard
    if (modes.slider) {
      const msg = `${errPath(
        instance
      )} Slider mode does not allow submissions!`;
      controllerUtils.warn(msg);
      return false;
    }

    // Default
    return true;
  })();

  // Return
  if (!pass) return false;

  // Test requirements
  if (
    !options.skipRequirements &&
    reportValidity &&
    modes.reportValidity &&
    (modes.onPrevReportValidity || !prev)
  )
    return instance.reportValidity();

  // Default
  return true;
};
