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

  // Slider mode guard
  if (state.modes.isSlider === true) return true;

  // * * * Empty case * * *
  if (currentSlide.type === 'empty') return true;

  // * * * Checkbox case * * *
  if (currentSlide.type === 'checkbox') {
    // Elements
    const checkboxes: NodeListOf<HTMLInputElement> =
      currentSlide.el.querySelectorAll('input[type="checkbox"]');

    // Values
    let selectedFound = false;

    // Loop
    checkboxes.forEach(checkbox => {
      // Logic
      if (checkbox.value === 'on') selectedFound = true;
    });

    // SDK - Default
    state.sdk.slideRequirementsData = targetInputs;

    // Logic
    if (selectedFound) return true;
    else {
      // Fill up targetInputs
      checkboxes.forEach(checkbox =>
        targetInputs.push({
          el: checkbox,
          msg: 'nothing checked',
          regExp: undefined,
        })
      );

      // SDK
      state.sdk.slideRequirementsData = targetInputs;

      // Visual
      state.view.renderRequirements(targetInputs);

      // Logic
      return false;
    }
  }

  // * * * Radio case * * *
  if (currentSlide.type === 'radio') {
    // Elements
    const radios: NodeListOf<HTMLInputElement> =
      currentSlide.el.querySelectorAll('input[type="radio"]');

    // Values
    let selectedFound = false;

    // Loop
    radios.forEach(radio => {
      // Logic
      if (radio.hasAttribute('data-selected')) selectedFound = true;
    });

    // SDK - Default
    state.sdk.slideRequirementsData = targetInputs;

    // Logic
    if (selectedFound) return true;
    else {
      // Fill up targetInputs
      radios.forEach(radio =>
        targetInputs.push({
          el: radio,
          msg: 'nothing selected',
          regExp: undefined,
        })
      );

      // SDK
      state.sdk.slideRequirementsData = targetInputs;

      // Visual
      state.view.renderRequirements(targetInputs);

      // Logic
      return false;
    }
  }

  // * * * Standard case * * *
  if (currentSlide.type === 'standard') {
    // * Index every index correctly *
    currentSlide.el
      .querySelectorAll('input, select, textarea')
      .forEach(
        (
          input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
          index: number
        ) => {
          input.setAttribute('data-sf-input-id', index.toString());
        }
      );

    // * Radio logic *
    const radios: NodeListOf<HTMLInputElement> =
      currentSlide.el.querySelectorAll('input[type="radio"]');
    const groups: string[] = [];

    // Find all available groups
    radios.forEach(radio => {
      if (groups.indexOf(radio.name) === -1) groups.push(radio.name);
    });

    // Test each group if it has at least one 'data-selected'
    groups.forEach(str => {
      // Elements
      const radios: NodeListOf<HTMLInputElement> =
        currentSlide.el.querySelectorAll(`input[type="radio"][name="${str}"]`);

      // Values
      let selectedFound = false;

      // Loop
      radios.forEach(radio => {
        if (radio.hasAttribute('data-selected')) selectedFound = true;
      });

      // Logic
      if (!selectedFound)
        radios.forEach(radio =>
          targetInputs.push({
            el: radio,
            i: parseInt(radio.getAttribute('data-sf-input-id') || ''),
            msg: 'nothing selected',
            regExp: undefined,
          })
        );
    });

    // * Other input types loop *
    currentSlide.el
      .querySelectorAll('input, select, textarea')
      .forEach(
        (input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
          // Don't test radios
          if (input.type === 'radio') return;

          // Required checking
          if (!input.hasAttribute('required')) return;

          // Is empty
          if (input.value === '') {
            // Push
            targetInputs.push({
              el: input,
              i: parseInt(input.getAttribute('data-sf-input-id') || ''),
              msg: 'empty',
              regExp: undefined,
            });

            // Skip code below
            return;
          }

          // Regex test
          if (input.getAttribute('data-reg-exp')) {
            try {
              // Values
              const regExp = new RegExp(
                input.getAttribute('data-reg-exp') || ''
              );

              // Logic
              if (!regExp.test(input.value)) {
                // Push
                targetInputs.push({
                  el: input,
                  i: parseInt(input.getAttribute('data-sf-input-id') || ''),
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
              targetInputs.push({
                el: input,
                i: parseInt(input.getAttribute('data-sf-input-id') || ''),
                msg: 'email',
                regExp: regExp,
              });

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
              targetInputs.push({
                el: input,
                i: parseInt(input.getAttribute('data-sf-input-id') || ''),
                msg: 'telephone',
                regExp: regExp,
              });

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
              targetInputs.push({
                el: input,
                i: parseInt(input.getAttribute('data-sf-input-id') || ''),
                msg: 'number',
                regExp: regExp,
              });

              // Skip code below
              return;
            }
          }

          // Default - success
        }
      );

    // Sort target input based on DOM index
    targetInputs.sort((a, b) => a.i - b.i);

    // * Remove input indexing *
    currentSlide.el
      .querySelectorAll('input, select, textarea')
      .forEach(
        (input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
          input.removeAttribute('data-sf-input-id');
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

  // * * * Custom case / If type unkown case * * *
  if (currentSlide.el.getAttribute('data-requirements', 'true')) return true;
  else return false;
}
