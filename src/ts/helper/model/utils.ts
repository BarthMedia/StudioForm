// + Imports +

// Base
import { async } from 'regenerator-runtime';

// Custom
import * as config from '../../config';
import * as model from '../../model';

// Timeout
export const timeout = function (s: number, mode = 'standard') {
  // Return
  return new Promise(function (_, reject) {
    // Timeout
    setTimeout(function () {
      // Create error
      reject(
        new Error(
          `Request took too long! Timeout after ${
            s / (mode === 'quick' ? 10 : 1)
          } second`
        )
      );
    }, (s * 1000) / (mode === 'quick' ? 10 : 1));
  });
};

// Return JSON
export const getJson = async function (
  url: string,
  init: object = {},
  timeoutSec = config.TIMEOUT_SEC
) {
  try {
    // Values
    const res: any = await Promise.race([
      fetch(url, init),
      timeout(timeoutSec),
    ]);
    let data = { message: 'Unable to format response as JSON.' };

    // Check if the Content-Type header is set to text/html
    const contentType = res.headers.get('Content-Type');

    // Expect HTML
    if (contentType && contentType.includes('text/html')) {
      // Await HTML string
      data = await res.text();

      // Create a new DOMParser
      const parser = new DOMParser();

      // Parse the text data as an HTML document
      data = parser.parseFromString(data as any, 'text/html') as any;
    } else {
      // Expect JSON
      try {
        data = await res.json();
      } catch (err) {
        console.warn(`helper.ts -> getJson: `, err);
      }
    }

    // Logic
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Return
    return data;
  } catch (err) {
    throw err;
  }
};
