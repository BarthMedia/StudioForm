// + Imports +
import * as config from '../../../config.js';
import { jQueryToJs } from '../../../helper.js';
import { markClickElement } from '../../../helper.js';

// + Exports +

// - - Select button x - -
export default function (stateData, x, $step) {
  // Styles
  const styles = stateData.styles,
    cssDeselect = styles['cssDeselect'],
    cssSelect = styles['cssSelect'];

  //   console.log(cssDeselect, styles);

  // Elements
  let $buttons = $step.find(`[${config.CLICK_ELEMENT_ID_ATTRIBUTE}]`),
    buttons = jQueryToJs(
      $buttons,
      '[not-findable = "selectButtons.js -> $buttons"]'
    ),
    $button = $step.find(`[${config.CLICK_ELEMENT_ID_ATTRIBUTE} = ${x}]`);

  // Guard
  if ($buttons.length < 1) return;

  // Actions
  markClickElement($buttons, $button);
  gsap.to(buttons, cssDeselect);
  gsap.to($button[0], cssSelect);
}
