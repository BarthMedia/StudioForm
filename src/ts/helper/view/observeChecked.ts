// Imports
import * as config from '../../config';
import elements from './elements';
import * as utils from './utils';
import * as eventListenerUtils from './utilsEventListener';
import * as attributeUtils from './utilsAttributes';

// utils
const sfsVal = 'checked';

// Export
export default function (
  instance: StudioFormInstance,
  radioInputs: HTMLInputElement[],
  checkboxInputs: HTMLInputElement[]
) {
  // Guard
  if (!checkboxInputs.length && !radioInputs.length) return;

  // + Define +

  // Class list toggle
  function toggle(input: HTMLInputElement, mode = 'remove') {
    // Add / remove checked
    // const attr = `${config.PRODUCT_NAME_SHORT}-checked`;
    // mode === 'add'
    //   ? input.setAttribute(attr, 'true')
    //   : input.removeAttribute(attr);

    // Toggle
    utils.classListToggle({
      element: input,
      class: sfsVal,
      mode: mode,
      closest: { cascader: true },
    });
  }

  // Closest slide
  function closestSlide(element: HTMLElement) {
    // Start from the given element and move up the DOM hierarchy
    while (element && element.parentElement) {
      // Check if the parent element is instance.elements.mask
      if (element.parentElement === instance.elements.mask) {
        // Return the current element if the condition is met
        return element;
      }
      // Move up to the next parent element
      element = element.parentElement;
    }

    // Return null if no matching parent is found
    return null;
  }

  // Radios
  radioInputs.forEach(input => {
    // Values
    const cascader = utils.closestCascader(input);

    // Event listener
    eventListenerUtils.addEventListener(instance, cascader, 'click', e => {
      // Guard
      if (e?.target?.['tagName'] !== 'INPUT') return;

      // Elements
      const inputs = closestSlide(input)?.querySelectorAll(
        `input[name="${input.name}"][type="radio"]`
      ) as NodeListOf<HTMLInputElement> | undefined;

      // Loop
      inputs?.forEach(otherInput => {
        // Guard
        if (otherInput === input) return;

        // Deselect
        toggle(otherInput);
      });

      // Select
      toggle(input, 'add');
    });
  });

  // Checkboxes
  checkboxInputs.forEach(input => {
    // Save initial state
    const attr = `${config.PRODUCT_NAME_SHORT}-required`;
    if (!input.hasAttribute(attr))
      input.setAttribute(attr, input.hasAttribute('required') + '');

    // Getter
    function isRequired() {
      return input.getAttribute(attr) === 'true';
    }

    // Has attribute checked
    checkState(input.hasAttribute('checked'));

    // Define toggle
    function checkState(checked: boolean) {
      // Group
      const inputs = closestSlide(input)?.querySelectorAll(
        `input[name="${input.name}"][type="checkbox"]`
      ) as NodeListOf<HTMLInputElement> | undefined;

      // Guard
      if (!inputs) return;

      // Single checkbox
      if (inputs.length < 2) {
        input.required = isRequired();
      }

      // Checkbox group
      if (inputs.length > 1) {
        // Values
        let min = parseInt(
          attributeUtils.getAttribute('min', ...inputs) || '1'
        );
        min = isNaN(min) ? 1 : min;
        let max: number | null = parseInt(
          attributeUtils.getAttribute('max', ...inputs) || ''
        );
        max = isNaN(max) ? null : max;

        // Define
        function requirementToggle(
          inputs: NodeListOf<HTMLInputElement>,
          bool: boolean
        ) {
          inputs.forEach(input => (input.required = bool));
        }

        // Math
        let count = 0;
        inputs.forEach(input => (count += input.checked ? 1 : 0));

        // Logic
        let isValid = count >= min;
        if (max !== null) isValid = count <= max;
        requirementToggle(inputs, !isValid);
      }

      // Toggle
      if (checked) {
        input.value = attributeUtils.getAttribute('value', input) || 'on';
        toggle(input, 'add');
      } else {
        input.value =
          input.hasAttribute('required') || inputs.length > 1 ? '' : 'off';
        toggle(input, 'remove');
      }
    }

    // Elements
    const cascader = utils.closestCascader(input);

    // Event listener
    eventListenerUtils.addEventListener(instance, cascader, 'click', e => {
      // Guard
      if (e?.target?.['tagName'] !== 'INPUT') return;

      // Toggle
      checkState(input.checked);
    });
  });
}
