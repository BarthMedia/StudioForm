// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (state: any) {
  // Consider that checkbox and radio requirements should work different when they are required
  // When required, have the value euqal = '', else 'off' else 'on'

  // Loop
  state.sdk.slideLogic.forEach((slide: { el: HTMLElement }) => {
    // Elements
    const inputs = slide.el.querySelectorAll('input');

    // Loop
    inputs.forEach(input => {
      // Guard
      if (input.type !== 'checkbox' && input.type !== 'radio') return;

      // Elements
      const el = input.closest('label, [studio-form="label"]') || input;
      const allElements: any[] = [el];
      el.querySelectorAll('*').forEach(node => allElements.push(node));

      // Guard
      let isOn = input.hasAttribute('checked');
      let isTimeout = false;

      // Checkbox case
      if (input.type === 'checkbox') {
        // Add 'sf-selected' class
        if (isOn)
          allElements.forEach((element: HTMLElement) =>
            element.classList.add('sf-selected')
          );
        else {
          if (input.hasAttribute('required')) input.value = '';
          else input.value = 'off';
        }
      }

      // Event listener
      el.addEventListener('click', () => {
        // Timeout guard
        if (isTimeout) return;
        else {
          isTimeout = true;
          setTimeout(() => {
            isTimeout = false;
          }, 1);
        }

        // * Radio / Checkbox logic

        // Radio
        if (input.type === 'radio') {
          // Elements
          const otherGroupRadios: NodeListOf<HTMLInputElement> =
            state.elements.mask.querySelectorAll(
              `input[type="radio"][name="${input.name}"]:not([value="${input.value}"])`
            );
          const otherElements: HTMLElement[] = [];
          otherGroupRadios.forEach(radio => {
            // Elements
            const parent =
              radio.closest('label, [studio-form="label"]') || input;

            // Push
            otherElements.push(parent as HTMLElement);

            // Loop
            parent
              .querySelectorAll('*')
              .forEach(node => otherElements.push(node as HTMLElement));
          });

          // * Add *

          // Class
          allElements.forEach((element: HTMLElement) =>
            element.classList.add('sf-selected')
          );

          // Attribute
          input.setAttribute('data-selected', '');

          // * Remove *

          // Class
          otherElements.forEach((element: HTMLElement) =>
            element.classList.remove('sf-selected')
          );

          // Attribute
          otherGroupRadios.forEach(radio =>
            radio.removeAttribute('data-selected')
          );
        }

        // Checkbox
        if (input.type === 'checkbox') {
          // Data logic & class switch
          if (isOn) {
            // Remove it
            allElements.forEach((element: HTMLElement) =>
              element.classList.remove('sf-selected')
            );

            // Logic
            if (input.hasAttribute('required')) input.value = '';
            else input.value = 'off';
            isOn = false;
          } else {
            // Add it
            allElements.forEach((element: HTMLElement) =>
              element.classList.add('sf-selected')
            );

            // Logic
            input.value = 'on';
            isOn = true;
          }
        }
      });
    });
  });
}
