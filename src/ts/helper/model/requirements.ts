// Imports
import * as utils from './utils';
import * as viewUtils from '../view/utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// Error
const errPath = (s: StudioFormInstance) =>
  `${controllerUtils.errorName(s)} requirements.ts:`;

// Helper
const sfidAttr = `${config.PRODUCT_NAME_SHORT}-input-id`;

// Notes:
// console.log('Respect disabled attribute!');
// console.log('Respect readonly attribute!');

// Export
export default function (instance: StudioFormInstance) {
  // Values
  const ghost = utils.returnGhost(instance);
  const currentSlide = instance.logic[utils.currentSlideId(instance)];
  const currentSlideElement = currentSlide.element;
  const targetInputs: SFValidityData[] = [];

  // Cases
  const response = (() => {
    // * * * Empty case * * *
    if (currentSlide.type === 'empty') return true;

    // Radio helper
    function checkRadio(indexed = false) {
      // Elements
      const radios: NodeListOf<HTMLInputElement> =
        currentSlideElement.querySelectorAll('input[type="radio"]');
      const groups: string[] = [];

      // Values
      let returnVal = true;

      // Find all available groups
      radios.forEach(radio => {
        if (groups.indexOf(radio.name) === -1) groups.push(radio.name);
      });

      // Group loop
      groups.forEach(str => {
        // Elements
        const radios: NodeListOf<HTMLInputElement> =
          currentSlideElement.querySelectorAll(
            `input[type="radio"][name="${str}"]`
          );

        // Values
        let selectedFound = false;

        // Loop
        radios.forEach(radio => {
          if (radio.checked) selectedFound = true;
        });

        // Logic
        if (!selectedFound) {
          // Overwrite
          returnVal = false;

          // Push
          radios.forEach(radio =>
            targetInputs.push({
              input: radio,
              index: indexed
                ? parseInt(radio.getAttribute(sfidAttr) || '')
                : undefined,
              message: 'unchecked',
            })
          );
        }
      });

      // Logic
      return returnVal;
    }

    // * * * Radio case * * *
    if (currentSlide.type === 'radio') {
      return checkRadio();
    }

    // * * * Standard case * * *
    if (currentSlide.type === 'standard') {
      // Elements
      const inputs = currentSlideElement.querySelectorAll(
        viewUtils.INPUTS_SELECTOR
      ) as NodeListOf<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >;

      // * Index every index correctly *
      inputs.forEach((input, index) => {
        input.setAttribute(sfidAttr, index + '');
      });

      // * Radio logic *
      checkRadio(true);

      // * Other input types loop *
      inputs.forEach(input => {
        // Don't test radios
        if (input.type === 'radio') return;

        // Required checking
        if (!input.hasAttribute('required')) return;

        // Values
        const index = parseInt(input.getAttribute(sfidAttr) || '');

        // File
        if (input.type === 'file') {
          // Push
          if (!viewUtils.getAttribute('attached'))
            targetInputs.push({
              input: input,
              index: index,
              message: 'no attachments',
            });

          // Skip code below
          return;
        }

        // Is empty
        if (input.value === '') {
          // Push
          targetInputs.push({
            input: input,
            index: index,
            message: 'empty',
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
              input: input,
              index: index,
              message: res,
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
            input: input,
            index: index,
            message: lenghtRes,
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
                input: input,
                index: index,
                message: 'invalid pattern',
                regex: regExp,
              });

              // Skip code below
              return;
            } else {
              // On success skip code below
              return;
            }
          } catch (err) {
            controllerUtils.warn(
              `${errPath(instance)} forEach() callback: Invalid regex test!`,
              err,
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
              input: input,
              index: index,
              message: 'invalid email',
              regex: regExp,
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
              input: input,
              index: index,
              message: 'invalid tel',
              regex: regExp,
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
              input: input,
              index: index,
              message: 'invalid number',
              regex: regExp,
            });

            // Skip code below
            return;
          }
        }

        // Default - success
      });

      // Sort target input based on DOM index
      targetInputs.sort((a, b) => a.index! - b.index!);

      // * Remove input indexing *
      inputs.forEach(input => {
        input.removeAttribute(sfidAttr);
      });

      console.log(
        'Figure out some internal variable way of not having to rely DOM attribute logic communication',
        'maybe temporary key based object!'
      );

      // Logic
      if (targetInputs.length > 0) {
        // Logic
        return false;
      }

      // Default
      return true;
    }

    // * * * Custom case / If type unkown case * * *
    if (viewUtils.getAttribute('requirements', currentSlideElement) === 'true')
      return true;
    else return false;
  })();

  // Root - Values
  const validityArray = ghost.validity;

  // Reset
  validityArray.length = 0;

  // Push
  targetInputs.forEach(target =>
    validityArray.push(model.createReadMostlyProxy(target) as SFValidityData)
  );

  // Return
  return response;
}

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

// Notes:

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
