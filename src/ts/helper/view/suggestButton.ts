// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Helper
function toggle(btn: HTMLElement, mode: string) {
  // * Select all relevant elments *

  // Elements
  const parent =
    btn.tagName === 'LABEL' || !btn.closest(config.LABEL_SELECTOR)
      ? btn
      : (btn.closest(config.LABEL_SELECTOR) as HTMLElement);
  const elements = [parent];

  // Push loop
  parent.querySelectorAll('*').forEach(el => elements.push(el as HTMLElement));

  // * Add class to button elements *
  elements.forEach(el => el.classList[mode](sfgClass));
}

// Export
const errPath = (s: any) =>
  `${helper.errorName(s)}suggestButton.ts -> init -> `;
const sfgClass = 'sf-suggested';
export default function init(state: any) {
  // * Add events *
  const eventFunctionArrays = state.view.eventsFunctionArrays;
  helper.addEventsInfrastrucutre(state, 'ButtonSuggestion');
  helper.addEventsInfrastrucutre(state, 'ButtonSuggestionClear');

  // * Code *

  // Add sdk event trigger
  state.sdk.suggestButton = function (slideId: number, buttonId: number) {
    suggest(slideId, buttonId);
  };
  state.sdk.clearSuggestedButton = function (
    slideId: number,
    buttonId: number
  ) {
    clear(slideId, buttonId);
  };

  // * Define functions *

  // Suggest
  function suggest(slideId: number, buttonId: number) {
    // Trigger
    helper.triggerAllFunctions(eventFunctionArrays.onButtonSuggestion);

    // Values
    const slide = state.sdk.slideLogic[slideId];
    const btn = slide.btns[buttonId];

    // Guard
    if (!slide || !btn)
      throw new Error(
        `${errPath(state)}suggest: Unable to find slide and/or button!`
      );

    // Event listener
    if (state.modes.autoRemoveButtonSuggestion) {
      setTimeout(() => {
        document.body.addEventListener(
          'click',
          function () {
            setTimeout(() => {
              clear(slideId, buttonId);
            }, 1);
          },
          { once: true }
        );
      }, 1);
    }

    // Alter slideLogic
    btn.suggested = true;

    // * Select all relevant elments *

    toggle(btn.el, 'add');

    // * Scroll towards button *
    if (
      !helper.isElementTopVisible(
        btn.el,
        state,
        {
          attributeReferenceElement: slide.el,
        },
        true
      )
    )
      state.sdk.scrollTo({
        target: btn.el,
        attributeReferenceElement: slide.el,
      });

    // Trigger
    helper.triggerAllFunctions(eventFunctionArrays.afterButtonSuggestion);
  }

  // Clear
  function clear(slideId: number, buttonId: number) {
    // Trigger
    helper.triggerAllFunctions(eventFunctionArrays.onButtonSuggestionClear);

    // Values
    const slide = state.sdk.slideLogic[slideId];
    const btn = slide.btns[buttonId];

    // Guard
    if (!slide || !btn) {
      console.warn(
        `${errPath(state)}clear: Unable to find slide and/or button!`
      );
      return;
    }

    // Alter slideLogic
    btn.suggested = undefined;

    // * Select all relevant elments *

    toggle(btn.el, 'remove');

    // Trigger
    helper.triggerAllFunctions(eventFunctionArrays.afterButtonSuggestionClear);
  }
}
