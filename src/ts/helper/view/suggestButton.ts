// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
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
    console.log('I suggest that you un-suggest!');
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
        `StudioForm[${state.sdk.i}] -> suggestButton.ts -> init -> suggest: Unable to find slide and/or button!`
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

    // Elements
    const elements: HTMLElement[] = [];
    const parent: HTMLElement =
      btn.el.tagName === 'LABEL' ||
      !btn.el.closest('label, [studio-form="label"]')
        ? btn.el
        : btn.el.closest('label, [studio-form="label"]');

    // Push
    elements.push(parent);

    // Push loop
    parent.querySelectorAll('*').forEach((el: any) => elements.push(el));

    // * Add class to button elements *
    elements.forEach(el => el.classList.add('sf-suggested'));

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
        `StudioForm[${state.sdk.i}] -> suggestButton.ts -> init -> clear: Unable to find slide and/or button!`
      );
      return;
    }

    // Alter slideLogic
    btn.suggested = undefined;

    // * Select all relevant elments *

    // Elements
    const elements: HTMLElement[] = [];
    const parent: HTMLElement =
      btn.el.tagName === 'LABEL' ||
      !btn.el.closest('label, [studio-form="label"]')
        ? btn.el
        : btn.el.closest('label, [studio-form="label"]');

    // Push
    elements.push(parent);

    // Push loop
    parent.querySelectorAll('*').forEach((el: any) => elements.push(el));

    // * Add class to button elements *
    elements.forEach(el => el.classList.remove('sf-suggested'));

    // Trigger
    helper.triggerAllFunctions(eventFunctionArrays.afterButtonSuggestionClear);
  }
}
