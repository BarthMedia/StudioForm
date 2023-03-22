// + Imports +
import * as model from '../model.js';
import { jQueryToJs } from '../helper.js';

// + Exports +

// - - Add error status - -
export default function (mode = 'add', $elements, styleIndex) {
  // Variables
  let styles = model.state.data[`form${styleIndex}`].styles,
    cssErrorStatus = styles['cssErrorStatus'],
    cssErrorStatusResolved = styles['cssErrorStatusResolved'],
    elements = jQueryToJs($elements);

  // Action
  if (mode == 'add') {
    gsap.to(elements, cssErrorStatus);
  } // mode == 'remove'
  else {
    gsap.to(elements, cssErrorStatusResolved);
  }
}
