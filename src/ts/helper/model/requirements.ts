// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (stateId: number, slideId: number, options: Options) {
  // Positive guard
  if (options.doNotCheckSlideRequirements === true) return true;

  // Values
  const state = model.state[stateId];

  // Build arbitraty regex feature
  // Beats everything else

  console.log(
    'Make it available to sdk, What elements are required HTMLElement[]'
  );

  console.log(
    state,
    "requirement checking will be done here. When error is thrown this will be handled in error.ts in view --- that works with this same sweet parent label method as sf-suggestion does 'sf-required'"
  );

  // Return true or false
  return true;
}
