// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (stateId: number, slideId: number, options: Options) {
  // Positive guard
  if (options.doNotCheckSlideRequirements === true) return true;

  // Values
  const state = model.state[stateId];
  const currentSlide = state.sdk.slideLogic[slideId];
  const targetInputs: any[] = [];

  // Input loop
  currentSlide.el
    .querySelectorAll('input, textarea, select')
    .forEach(
      (input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        // Required checking
        if (!input.hasAttribute('required')) return;

        // Is empty
        if (input.value === '') {
          // Push
          targetInputs.push({ el: input, msg: 'empty', regExp: undefined });

          // Skip code below
          return;
        }

        // Regex test
        if (input.getAttribute('data-reg-exp')) {
          try {
            // Values
            const regExp = new RegExp(input.getAttribute('data-reg-exp') || '');

            // Logic
            if (!regExp.test(input.value)) {
              // Push
              targetInputs.push({
                el: input,
                msg: 'custom regular expression',
                regExp: regExp,
              });

              // Skip code below
              return;
            } else {
              // On success skip code below
              return;
            }
          } catch (err) {
            console.warn(
              `StudioForm[${state.sdk.i}] -> requirements.ts -> default -> forEach() callback: Unvalid regex test!`,
              input
            );
          }
        }

        // Email case
        if (input.type === 'email') {
          // Values
          const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

          // Logic
          if (!regExp.test(input.value)) {
            // Push
            targetInputs.push({ el: input, msg: 'email', regExp: regExp });

            // Skip code below
            return;
          }
        }

        // Tel case
        if (input.type === 'tel') {
          // Values
          const regExp = /^[\d\s\-\+\(\)\.\/*#]+$/;

          // Logic
          if (!regExp.test(input.value)) {
            // Push
            targetInputs.push({ el: input, msg: 'telephone', regExp: regExp });

            // Skip code below
            return;
          }
        }

        // Email case
        if (input.type === 'number') {
          // Values
          const regExp = /^-?(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/;

          // Logic
          if (!regExp.test(input.value)) {
            // Push
            targetInputs.push({ el: input, msg: 'number', regExp: regExp });

            // Skip code below
            return;
          }
        }

        // Default - success
      }
    );

  // SDK
  state.sdk.slideRequirementsData = targetInputs;

  // Logic
  if (targetInputs.length > 0) {
    // Visual
    state.view.renderRequirements(targetInputs);

    // Logic
    return false;
  }

  // Default
  return true;
}
