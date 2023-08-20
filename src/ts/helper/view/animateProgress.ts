// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (stateId: number, options: Options) {
  // Values
  const state = model.state[stateId];

  // Guard
  if (
    state.elements.progress.bars.length < 1 &&
    state.elements.progress.currentSlides.length < 1 &&
    state.elements.progress.minMaxSlides.length < 1 &&
    state.elements.progress.minSlides.length < 1 &&
    state.elements.progress.maxSlides.length < 1 &&
    !state.modes.calculateProgress
  )
    return;

  // Calculate progress
  state.model.generateProgressData();
  const data = state.sdk.pathProgressData;

  // Guard
  if (data === undefined) return;

  // Log
  console.log('Hello ', data);
}
