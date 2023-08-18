// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (index: number, options: Options) {
  // Values
  const state = model.state[index];
  let next: number | undefined | boolean;
  const currentSlideId: number =
    state.sdk.slideRecord[state.sdk.slideRecord.length - 1];

  // Warn guard
  if (state.sdk.isSubmitted === true) {
    const msg = `StudioForm[${state.sdk.i}] -> prev.ts -> default: Form already submitted!`;
    console.warn(msg);
    return msg;
  }

  console.log('Backwards, I need to be programmed!');
}
