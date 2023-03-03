// + Imports +

// Base
import { async } from 'regenerator-runtime';

// Custom
import * as config from './config.js';
import { getJson } from './helper';

// + Objects +

// State
export const state = {
  data: {},
};

// + Functions +

// Test data
export const testData = async function () {
  try {
    // Values
    const data = await getJson(config.API_URL);

    // Update
    state.data = data;
  } catch (err) {
    throw err;
  }
};
