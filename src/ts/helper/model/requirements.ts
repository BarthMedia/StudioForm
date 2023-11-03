// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// + Helper +

// Text
function validateLength(
  inputElement: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
) {
  const value = inputElement.value;
  const minLength = inputElement.getAttribute('minlength');
  const maxLength = inputElement.getAttribute('maxlength');

  if (minLength !== null && value.length < parseInt(minLength)) {
    // The input doesn't meet the minlength requirement.
    return `Minimum length required: ${minLength} characters.`;
  }

  if (maxLength !== null && value.length > parseInt(maxLength)) {
    // The input exceeds the maxlength requirement.
    return `Maximum length allowed: ${maxLength} characters.`;
  }

  // The input meets the length requirements.
  return true;
}

// Number
function validateNumberInput(inputElement: HTMLInputElement) {
  const value = parseFloat(inputElement.value); // Convert input value to a floating-point number
  const min = parseFloat(inputElement.getAttribute('min') || '');
  const max = parseFloat(inputElement.getAttribute('max') || '');
  const step = parseFloat(inputElement.getAttribute('step') || '');

  if (!isNaN(value)) {
    // Check "min" attribute
    if (!isNaN(min) && value < min) {
      return `Value must be greater than or equal to ${min}.`;
    }

    // Check "max" attribute
    if (!isNaN(max) && value > max) {
      return `Value must be less than or equal to ${max}.`;
    }

    // Check "step" attribute
    if (!isNaN(step) && (value - min) % step !== 0) {
      return `Value must be in increments of ${step}.`;
    }

    // If all checks pass, the value is valid
    return true;
  } else {
    // If the input is not a valid number, return an error message
    return 'Please enter a valid number.';
  }
}

// Export
const errPath = (s: any) => `${helper.errorName(s)}requirements.ts -> default`;
const sfidAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}${config.PRODUCT_NAME_CLASS_PREFIX}input-id`;
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

  console.log('Respect disabled attribute!');
  console.log('Respect readonly attribute!');

  // // * * * Checkbox case * * * // Legacy
  // if (currentSlide.type === 'checkbox') {
  //   // Elements
  //   const checkboxes: NodeListOf<HTMLInputElement> =
  //     currentSlide.el.querySelectorAll('input[type="checkbox"]');

  //   // Values
  //   let selectedFound = false;

  //   // Loop
  //   checkboxes.forEach(checkbox => {
  //     // Logic
  //     if (checkbox.value === 'on') selectedFound = true;
  //   });

  //   // SDK - Default
  //   state.sdk.slideRequirementsData = targetInputs;

  //   // Logic
  //   if (selectedFound) return true;
  //   else {
  //     // Fill up targetInputs
  //     checkboxes.forEach(checkbox =>
  //       targetInputs.push({
  //         el: checkbox,
  //         msg: 'nothing checked',
  //         regExp: undefined,
  //       })
  //     );

  //     // SDK
  //     state.sdk.slideRequirementsData = targetInputs;

  //     // Visual
  //     state.view.renderRequirements(targetInputs);

  //     // Logic
  //     return false;
  //   }
  // }

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
      if (radio.hasAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}selected`))
        selectedFound = true;
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
      .querySelectorAll(config.INPUTS_SELECTOR)
      .forEach(
        (
          input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
          index: number
        ) => {
          input.setAttribute(sfidAttr, index.toString());
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

    // Test each group if it has at least one '${config.CUSTOM_ATTRIBUTE_PREFIX}selected'
    groups.forEach(str => {
      // Elements
      const radios: NodeListOf<HTMLInputElement> =
        currentSlide.el.querySelectorAll(`input[type="radio"][name="${str}"]`);

      // Values
      let selectedFound = false;

      // Loop
      radios.forEach(radio => {
        if (radio.hasAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}selected`))
          selectedFound = true;
      });

      // Logic
      if (!selectedFound)
        radios.forEach(radio =>
          targetInputs.push({
            el: radio,
            i: parseInt(radio.getAttribute(sfidAttr) || ''),
            msg: 'nothing selected',
            regExp: undefined,
          })
        );
    });

    // * Other input types loop *
    currentSlide.el
      .querySelectorAll(config.INPUTS_SELECTOR)
      .forEach(
        (input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
          // Don't test radios
          if (input.type === 'radio') return;

          // Required checking
          if (!input.hasAttribute('required')) return;

          // Values
          const index = parseInt(input.getAttribute(sfidAttr) || '');

          // Is empty
          if (input.value === '') {
            // Push
            targetInputs.push({
              el: input,
              i: index,
              msg: 'empty',
              regExp: undefined,
            });

            // Skip code below
            return;
          }

          // Validate number
          if (input.type === 'number') {
            // Values
            const res = validateNumberInput(input as HTMLInputElement);

            // Throw if
            if (res !== true) {
              // Push
              targetInputs.push({
                el: input,
                i: index,
                msg: res,
                regExp: undefined,
              });

              // Skip code below
              return;
            }
          }

          // Length check
          const lenghtRes = validateLength(input);
          if (lenghtRes !== true) {
            // Push
            targetInputs.push({
              el: input,
              i: index,
              msg: lenghtRes,
              regExp: undefined,
            });

            // Skip code below
            return;
          }

          // Regex test
          if (input.getAttribute('pattern')) {
            try {
              // Values
              const regExp = new RegExp(input.getAttribute('pattern') || '');

              // Logic
              if (!regExp.test(input.value)) {
                // Push
                targetInputs.push({
                  el: input,
                  i: index,
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
                `${errPath(state)} -> forEach() callback: Unvalid regex test!`,
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
                i: index,
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
                i: index,
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
                i: index,
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
      .querySelectorAll(config.INPUTS_SELECTOR)
      .forEach(
        (input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
          input.removeAttribute(sfidAttr);
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
  if (
    currentSlide.el.getAttribute(
      `${config.CUSTOM_ATTRIBUTE_PREFIX}requirements`,
      'true'
    )
  )
    return true;
  else return false;
}
