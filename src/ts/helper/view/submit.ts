// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (index: number, options: Options) {
  // Values
  const state = model.state[index];

  // Log
  console.log(
    '// Activate Xano mode everytime an action url is set -- do not fire when xano is turned off via attributes'
  );
}
