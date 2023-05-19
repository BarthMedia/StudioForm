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
  const $notSelectedButtons = $step.find(
      `[${config.CLICK_ELEMENT_ID_ATTRIBUTE}]:not([${config.CLICK_ELEMENT_ID_ATTRIBUTE} = ${x}])`
    ),
    notSelectedButtons = jQueryToJs(
      $notSelectedButtons,
      '[not-findable = "selectButton.js -> $notSelectedButtons"]'
    ),
    $selectedButton = $step.find(
      `[${config.CLICK_ELEMENT_ID_ATTRIBUTE} = ${x}]`
    ),
    selectedButton = $selectedButton[0];

  console.log(
    'Working?, This script exists for auto selecting radio buttons ... come back later and finish. SelectButton.js ; Remember to rebuild all of this in vanilla JS!'
  );

  // Guard
  if ($notSelectedButtons.length < 1) return;

  // Actions
  markClickElement($notSelectedButtons, $selectedButton);
  gsap.to(notSelectedButtons, cssDeselect);
  gsap.to(selectedButton, cssSelect);

  // // * * * GSAP Flip action * * *
  // const deselectTime = cssDeselect.duration,
  //   selectTime = cssSelect.duration;

  // // Deselect
  // const notSelectedNodes = [];
  // notSelectedButtons.forEach(notSelectedButton => {
  //   notSelectedNodes.push(notSelectedButton);
  //   notSelectedButton
  //     .querySelectorAll('*:not(.hide)')
  //     .forEach(node => notSelectedNodes.push(node));
  // });

  // // Loop
  // notSelectedNodes.forEach(node => {
  //   // Save
  //   const state = Flip.getState(node);

  //   // Flip
  //   node.classList.remove('is-selected');
  //   Flip.from(state, { duration: deselectTime });
  // });

  // // Select
  // const selectedNodes = [selectedButton];
  // selectedButton
  //   .querySelectorAll('*:not(.hide)')
  //   .forEach(node => selectedNodes.push(node));

  // // Loop
  // selectedNodes.forEach(node => {
  //   // Save
  //   const state = Flip.getState(node);

  //   // Flip
  //   node.classList.add('is-selected');
  //   Flip.from(state, { duration: selectTime });
  // });

  // console.log(
  //   'Think about building own GSAP Flip version. As current state of GSAP Flip seems unsufficient!'
  // );

  // Log
  // console.log(notSelectedNodes, selectedNodes);
  // console.log('(de)select time', deselectTime, selectTime);
}
