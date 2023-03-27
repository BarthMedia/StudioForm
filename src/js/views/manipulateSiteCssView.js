// + Imports +
import * as config from '../config.js';

// + Classes +

// - - Handle mobile swipe gestures - -
class ManipulateSiteCssView {
  init(stateData) {
    console.log('Hola!');

    const isFormBlockSetToOverFlowHidden = this.#isFormBlockSetToOverFlowHidden(
      stateData.elements.$formBlock
    );
  }

  #isFormBlockSetToOverFlowHidden($formBlock) {}
}

// + Exports +
export default new ManipulateSiteCssView();
