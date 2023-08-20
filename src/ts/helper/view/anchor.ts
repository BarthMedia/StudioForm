// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (stateId: number, options: Options) {
  // Values
  const state = model.state[stateId];

  // Mode guard
  if (options.scrollToActive !== true && !state.modes.scrollToActive) return;

  // Log
  console.log(
    'If attribute reference element is not given, simply directly jump to Wrapper'
  );
  console.log('Hello ', ' ANCHOR.ts');
}
