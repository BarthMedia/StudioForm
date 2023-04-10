// + Imports +
import * as model from '../model.js';
// import * as config from '../config.js';
import { jQueryToJs } from '../helper.js';

// + Exports +

// - - Add error status - -
export default function (mode = 'add', $elements, styleIndex) {
  // Variables
  const stateData = model.state.data[`form${styleIndex}`],
    styles = stateData.styles,
    cssErrorStatus = styles['cssErrorStatus'],
    cssErrorStatusResolved = styles['cssErrorStatusResolved'],
    elements = jQueryToJs($elements);

  // Action
  if (mode == 'add') {
    // General error animation
    gsap.to(elements, cssErrorStatus);
  }
  // Scroll to
  else if (mode == 'scroll') {
    // Anchor logic
    gsap.to(stateData.elements.anchorScrollTarget, {
      scrollTo: {
        y: elements[0].offsetTop - styles.errorAnchorOffset,
      },
      duration: stateData.anchorData.anchorAnimationTime,
    });

    // General error animation
    gsap.to(elements, cssErrorStatus);
  }
  // mode == 'remove'
  else {
    gsap.to(elements, cssErrorStatusResolved);
  }
}
