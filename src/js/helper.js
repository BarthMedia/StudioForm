// + Imports +

// Base
import { async } from 'regenerator-runtime';

// Custom
import * as config from './config.js';

// + Functions +

// Timeout
export const timeout = function (s) {
  // Return
  return new Promise(function (_, reject) {
    // Timeout
    setTimeout(function () {
      // Create error
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Return JSON
export const getJson = async function (url) {
  try {
    // Values
    const res = await Promise.race([fetch(url), timeout(config.TIMEOUT_SEC)]);
    const data = await res.json();

    // Logic
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Return
    return data;
  } catch (err) {
    throw err;
  }
};
