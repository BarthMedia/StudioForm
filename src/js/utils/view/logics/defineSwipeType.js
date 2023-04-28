// + Imports +
import * as config from '../../../config.js';

// + Exports +

// - - Initialize Mobile Swipe gestures - -
export default function (stateData) {
  // Elements
  const $element = stateData.elements.$formBlock;

  // Local variables
  const type = $element.attr(config.SWIPE_TYPE_ANIMATION_ATTRIBUTE),
    styles = stateData.styles,
    slideDirection = styles['slideDirection'].toLowerCase(),
    maxScreenSize = styles['maxSwipeScreenSize'],
    minScreenSize = styles['minSwipeScreenSize'],
    width = $(window).outerWidth(true);

  // Logic: Tell DOM the swipe type
  if (width <= maxScreenSize && width >= minScreenSize) {
    if (type != undefined) {
      slideDirection = type;
    }
    $element.attr(config.SWIPE_TYPE_ANIMATION_ATTRIBUTE, slideDirection);
  } else {
    $element.attr(config.SWIPE_TYPE_ANIMATION_ATTRIBUTE, 'false');
  }
}
