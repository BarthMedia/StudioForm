// + Imports +

// Base
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Custom
import view from './views/view.js';
import * as model from './model.js';

// + Functions +

// Control test
const controlTest = async function () {
  try {
    // 1st view test
    view.consoleLog('loading...');

    // Model test
    await model.testData();

    // Log test data
    console.log(model.state.data);

    // 2nd view test
    view.consoleLog();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

// + Initialize +
const init = function () {
  view.addHandler(controlTest);
};
init();
