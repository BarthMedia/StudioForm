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
