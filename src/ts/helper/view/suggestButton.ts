// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Helper
function toggle(btn: HTMLElement, mode: string) {
  // Toggle
  helper.classListToggle({
    el: btn,
    class: sfgClass,
    mode: mode,
    closest: {
      parent: config.LABEL_SELECTOR,
      allowParent: { equals: 'LABEL', tagName: true },
    },
  });
}

// Export
const errPath = (s: any) =>
  `${helper.errorName(s)}suggestButton.ts -> init -> `;
const sfgClass = `suggested`;
export default function init(state: any) {
  // * Add events *
  const eventFunctionArrays = state.view.eventsFunctionArrays;
  helper.addEventsInfrastrucutre(state, 'ButtonSuggestion');
  helper.addEventsInfrastrucutre(state, 'ButtonSuggestionClear');

  // * Code *

  // Add arrow left / right sdk support
  function keyboardSuggest(slideId: number, mode: number) {
    // Values
    const btns = model.state[state.sdk.i].sdk.slideLogic[slideId].btns;

    // Guard
    if (!btns) return;

    // Guard 2
    if (btns.length === 1) return;

    // Values
    let buttonId = -1;

    // Loop for suggested button
    btns.every((btn: any) => {
      // Logic
      if (btn.suggested) {
        // Update
        buttonId = btn.i;

        // Break
        return false;
      }

      // Continue
      return true;
    });

    // Guard
    if (buttonId === -1) {
      // Suggest 0
      suggest(slideId, 0);

      // Skip code below
      return;
    }

    // New button id
    const newButtonId = Math.min(Math.max(buttonId + mode, 0), btns.length - 1);

    // Clear & select
    if (newButtonId !== buttonId) {
      state.sdk.clearSuggestedButton(slideId, buttonId);
      suggest(slideId, newButtonId);
    }
  }
  state.sdk.suggestNext = function (slideId: number) {
    keyboardSuggest(slideId, -1);
  };
  state.sdk.suggestPrev = function (slideId: number) {
    keyboardSuggest(slideId, 1);
  };

  // Add sdk event trigger
  state.sdk.suggestButton = function (slideId: number, buttonId: number) {
    suggest(slideId, buttonId);
  };
  state.sdk.clearAllSuggestedButton = function (slideId: number) {
    // Clear all
    const btns = model.state[state.sdk.i].sdk.slideLogic[slideId].btns;

    // Guard
    if (!btns) return;

    // Loop
    btns.forEach((btn: any) => {
      // Logic
      if (btn.suggested) {
        // Update
        clear(slideId, btn.i);
      }
    });
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

    // Mark a click action
    state.view.suggestDoubleClick = true;
    btn.el.click();
    state.view.suggestDoubleClick = false;

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
