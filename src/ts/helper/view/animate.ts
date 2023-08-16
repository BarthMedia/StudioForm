// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (index: number, options: Options) {
  // Values
  const state = model.state[index];
  const cId = options.currentSlideId;
  const nId = options.nextSlideId;

  // Guard
  if (typeof cId !== 'number' || typeof nId !== 'number')
    throw new Error(
      `StudioForm[${state.sdk.i}] -> animate.ts -> default: options.currentSlideId and/or options.nextSlideId are not numbers!`
    );

  // Logic
  if (cId === nId) {
    console.warn(
      `StudioForm[${state.sdk.i}] -> animate.ts -> default: options.currentSlideId (${cId}) and options.nextSlideId (${nId}) are equal!`
    );
    return;
  }

  // Fire animateProgress.ts
  console.log('Fire progress animation');
}
