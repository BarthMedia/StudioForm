// + Imports +
import * as config from '../config.js';
import { state } from '../model.js';
import { jQueryToJs } from '../helper.js';

// + Exports +

// - - Initialize click state for input fields - -
export default function ($elements, styleObjectIndex, $parent) {
  // Local variables
  const styles = state.data[`form${styleObjectIndex}`].styles,
    cssActive = styles['cssActive'],
    cssInactive = styles['cssInactive'],
    cssInactiveSet = styles['setCssInactive'],
    isRadio =
      $parent.attr(config.STEP_TYPE_ATTRIBUTE) == 'radio' ? true : false,
    elements = jQueryToJs($elements);

  // Functions
  gsap.set(elements, cssInactiveSet); // Init

  if (isRadio) {
    $elements.each(function () {
      const $element = $(this);

      $element.click(() => {
        // Animation
        gsap.to(elements, cssInactive);
        gsap.to($element[0], cssActive);

        // Attributes
        $elements.removeAttr(config.ELEMENT_GOT_CHECKED_ATTRIBUTE);
        $element.attr(config.ELEMENT_GOT_CHECKED_ATTRIBUTE, true);
      });
    });
  } // Is checkbox
  else {
    $elements.each(function () {
      const $element = $(this);
      let firstClick = true,
        preventDoubleClick = false;

      // Skip element if that is specified
      if ($element.attr(config.CSS_ACTIVE_ATTRIBUTE) == 'none') {
        return true;
      }

      // Click event
      $element.click(() => {
        // Prevent double clicking
        if (!preventDoubleClick) {
          setTimeout(() => {
            preventDoubleClick = false;
          }, 10);

          // Call checkbox click logic
          if (firstClick) {
            // Animation
            gsap.to($element[0], cssActive);

            // Attributes
            $element.attr(config.ELEMENT_GOT_CHECKED_ATTRIBUTE, true);

            // Logic
            firstClick = false; // Int 2nd click
          } // Reset
          else {
            // Animation
            gsap.to($element[0], cssInactive);

            // Attributes
            $element.removeAttr(config.ELEMENT_GOT_CHECKED_ATTRIBUTE);

            // Logic
            firstClick = true;
          }
        }

        preventDoubleClick = true;
      });
    });
  }
}
