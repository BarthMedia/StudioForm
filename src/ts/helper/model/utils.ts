// + Imports +

// Base
import { async } from 'regenerator-runtime';

// Custom
import * as config from '../../config';
import * as model from '../../model';

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
  const ghost = model.state.ghostInstances[instance.name];
  const modes = instance.config.modes;

  // Instnace guard
  const pass = () => {
    // Warn guard - 0
    if (instance.isAwaiting) {
      const msg = `${errPath(instance)} Awaiting resolve!`;
      console.warn(msg);
      return false;
    }

    // Warn guard - 1
    if (
      (modes.awaitAnimations || options.awaitAnimations) &&
      instance.isTransitioning
    ) {
      const msg = `${errPath(instance)} Animation is not yet finished!`;
      console.warn(msg);
      return false;
    }

    // Is to
    if (to) return true;

    // Guard - 2
    if (ghost.suggest.doubleClick) return false;

    // Warn guard - 3
    if (instance.isDone) {
      const msg = `${errPath(instance)} Form already submitted!`;
      console.warn(msg);
      return false;
    }

    // Is submit
    if (submit) return true;

    // Warn guard - 4 - Slider mode guard
    if (modes.slider) {
      const msg = `${errPath(
        instance
      )} Slider mode does not allow submissions!`;
      console.warn(msg);
      return false;
    }

    // Default
    return true;
  };

  // Return
  if (!pass) return false;

  // Test requirements
  if (
    reportValidity &&
    modes.reportValidity &&
    (modes.onPrevReportValidity || !prev)
  )
    return instance.reportValidity();

  // Default
  return true;
};
