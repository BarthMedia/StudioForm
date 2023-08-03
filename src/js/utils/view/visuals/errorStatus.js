// + Imports +
import * as model from '../../../model.js';
// import * as config from '../config.js';
import { jQueryToJs } from '../../../helper.js';

// + Exports +

// - - Add error status - -
export default function (mode = 'add', $elements, styleIndex) {
  // // ZHAW file upload adjustment
  // $elements.each(function (index) {
  //   if ($(this).eq(0).attr('type') === 'file') {
  //     const label = document.querySelector(
  //       `[for="${$(this).eq(0).attr('id')}"]`
  //     );

  //     // mode = 'add';

  //     // Overwrite
  //     $elements[index] = label;
  //   }
  // });

  // Variables
  const stateData = model.state.data[`form${styleIndex}`],
    styles = stateData.styles,
    cssErrorStatus = styles['cssErrorStatus'],
    cssErrorStatusResolved = styles['cssErrorStatusResolved'];
  let elements = jQueryToJs(
    $elements,
    '[not-findable = "errorStatus.js -> $elements"]'
  );

  // ZHAW file upload adjustment
  elements.forEach(function (element, index) {
    if (element.getAttribute('type') === 'file') {
      const label = document.querySelector(
        `[for="${element.getAttribute('id')}"]`
      );

      // mode = 'add';

      // Overwrite
      elements[index] = label;
    }
  });

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

    // ZHAW file upload adjustment
    // let elements0 = elements[0];
    // if ($elements.eq(0).attr('type') === 'file') {
    //   elements0 =
    //     document.querySelector(`[for="${$elements.eq(0).attr('id')}"]`) ||
    //     elements0;
    // }

    // console.log(elements0);

    const y =
      window.pageYOffset +
      elements[0].getBoundingClientRect().top -
      stateData.styles.errorAnchorOffset -
      32;
    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
    // gsap.to(stateData.elements.anchorScrollTarget || window, {
    //   scrollTo: {
    //     y: elements[0],
    //     offsetY: stateData.styles.errorAnchorOffset,
    //   },
    //   duration: duration,
    // });

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
