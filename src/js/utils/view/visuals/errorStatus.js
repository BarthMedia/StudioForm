// + Imports +
import * as model from '../../../model.js';
// import * as config from '../config.js';
import { jQueryToJs } from '../../../helper.js';

// + Exports +

// - - Add error status - -
export default function (mode = 'add', $elements, styleIndex) {
  // Variables
  const stateData = model.state.data[`form${styleIndex}`],
    styles = stateData.styles,
    cssErrorStatus = styles['cssErrorStatus'],
    cssErrorStatusResolved = styles['cssErrorStatusResolved'],
    elements = jQueryToJs(
      $elements,
      '[not-findable = "errorStatus.js -> $elements"]'
    );

  // Action
  if (mode == 'add') {
    // General error animation
    gsap.to(elements, cssErrorStatus);
  }
  // Scroll to
  else if (mode == 'scroll') {
    // Anchor logic
    // stateData.handlers.anchorFunctionality();

    let duration;
    try {
      duration = stateData.anchorData.anchorAnimationTime;
    } catch {
      duration = stateData.styles.animationSTime;
    }

    gsap.to(stateData.elements.anchorScrollTarget || window, {
      scrollTo: {
        y: elements[0],
        offsetY: stateData.styles.errorAnchorOffset,
      },
      duration: duration,
    });

    // console.log(elements);

    // console.log(
    //   'The individual select items shall have event listeneres that make the error go away once value changed. Make the event listener go away as well'
    // );

    // console.log('I shall scroll!');

    // General error animation
    gsap.to(elements, cssErrorStatus);
  }
  // mode == 'remove'
  else {
    gsap.to(elements, cssErrorStatusResolved);
  }
}
