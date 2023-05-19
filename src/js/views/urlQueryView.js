// + Imports +
import * as config from '../config.js';

// + Classes +
class UrlQueryView {
  // Function
  init(stateData) {
    // Define
    var url = new URL(window.location.href);
    var q1 = url.searchParams.get('q1');

    // Guard 1
    if (q1 === null || q1 === '') return;

    // Elements
    const button = document.querySelector(
      `[${config.CONDITIONAL_ATTRIBUTE}="${q1}"]`
    );

    // Guard 2
    if (button === null) return;

    // Click
    button.click();

    // Log
    console.log(button, `[${config.CONDITIONAL_ATTRIBUTE}="${q1}"]`);
  }
}

// + Exports +
export default new UrlQueryView();
