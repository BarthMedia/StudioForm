// + Imports +

// Base

// Custom
import * as config from '../config.js';

// + Classes +

// Base WebflowView
class WebflowView {
  // ELements
  #body = $(config.BODY_SELECTOR);

  // Values
  string = 'hello, world!';

  // Functions

  // Test
  consoleLog(message = this.string) {
    console.log(this.#body, message);
  }

  // Event listeners
  addHandler(handler) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }
}

// + Exports +

// WebflowView object
export default new WebflowView();
