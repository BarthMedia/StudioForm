// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// + utils +

// Class list toggle
function toggle(btn: HTMLElement, mode: string) {
  // Toggle
  utils.classListToggle({
    element: btn,
    class: sfgClass,
    mode: mode,
    closest: {
      cascader: true,
    },
  });

  console.log('Change this from sf-suggest to sf-focus');

  console.log(
    'Suggest has to be the logic center, that takes into account weather or not a button is set to display none or not!'
  );
}

// Error
const errPath = (s: StudioFormInstance) =>
  `${controllerUtils.errorName(s)}suggestButton.ts -> init -> `;
const sfgClass = `focus`;

// Export
export default function (state: any) {
  console.log(
    'On suggest, check that all buttons are actually uneuqal display none!'
  );
  console.log(
    'buttons structure has to be written in a way, that it is a getter',
    'espcially if more then 1 button!',
    'or it is also just enough, if you remove the button?? , nah. has to be live!',
    'button has to be visible!'
  );

  // * Add events *
  const eventFunctionArrays = state.view.eventsFunctionArrays;
  // utils.addEventsInfrastrucutre(state, 'ButtonSuggestion');
  // utils.addEventsInfrastrucutre(state, 'ButtonSuggestionClear');

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
    // Todo!
    console.log(
      'If step type radio, suggest that particular radio button.',
      "Have one mode, where it doesn't suggest, but instantly continues, and one where just suggests the last clicked radio!"
    );

    // Trigger
    // utils.triggerAllFunctions(eventFunctionArrays.onButtonSuggestion);

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
        // Event
        document.body.addEventListener(
          'click',
          function () {
            setTimeout(() => {
              clear(slideId, buttonId);
            }, 1);
          },
          { once: true }
        );

        // Alter slideLogic
        btn.suggested = true;

        // * Select all relevant elments *
        toggle(btn.el, 'add');
      }, 1);
    }

    // * Scroll towards button *
    if (
      true
      // !utils.isElementTopVisible(
      //   btn.el,
      //   state,
      //   {
      //     attributeReferenceElement: slide.el,
      //   },
      //   true
      // )
    )
      state.sdk.scrollTo({
        target: btn.el,
        attributeReferenceElement: slide.el,
      });

    // Trigger
    // utils.triggerAllFunctions(eventFunctionArrays.afterButtonSuggestion);
  }

  // Clear
  function clear(slideId: number, buttonId: number) {
    // Trigger
    // utils.triggerAllFunctions(eventFunctionArrays.onButtonSuggestionClear);

    // Values
    const slide = state.sdk.slideLogic[slideId];
    const btn = slide.btns[buttonId];

    // Guard
    if (!slide || !btn) {
      controllerUtils.warn(
        `${errPath(state)}clear: Unable to find slide and/or button!`
      );
      return;
    }

    // Alter slideLogic
    btn.suggested = undefined;

    // * Select all relevant elments *

    toggle(btn.el, 'remove');

    // Trigger
    // utils.triggerAllFunctions(eventFunctionArrays.afterButtonSuggestionClear);
  }
}
