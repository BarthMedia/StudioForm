// Imports
import * as config from '../../config';
import * as utils from './utils';

// utils
const sfsVal = 'selected';

// Export
export default function (instance: StudioFormInstance) {
  console.log(
    'CREATE OBSEVER, THAT TESTS FOR NEW HTML ELEMENT CHANGES, AND ADJUSTS THESE 3 utils FILES ACCORDINGLY!',
    'done',
    'now respect, that these changes actually happen!'
  );

  // Consider that checkbox and radio requirements should work different when they are required
  // When required, have the value euqal = '', else 'off' else 'on'

  // Loop
  instance.logic.forEach(slide => {
    // Elements
    const inputs = slide.element.querySelectorAll(
      ['checkbox', 'radio'].map(str => `input[type="${str}"]`).join()
    ) as NodeListOf<HTMLInputElement>;

    // Loop
    inputs.forEach(input => {
      // Guard
      console.log(input);

      // Class list toggle options
      const element = utils.closestCascader(input);
      const cltOptions = {
        element: input,
        class: sfsVal,
        closest: { cascader: true },
      };

      // Elements

      // Guard
      let isOn = input.hasAttribute('checked');
      let isTimeout = false;

      // Checkbox case
      if (input.type === 'checkbox') {
        // Add 'sf-selected' class
        if (isOn) utils.classListToggle({ ...cltOptions, mode: 'add' });
        else {
          if (input.hasAttribute('required')) input.value = '';
          else input.value = 'off';
        }
      }

      // Event listener
      element.addEventListener('click', event => {
        // Guard
        if (event.target?.['tagName'] === 'A') return;

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
          const otherGroupRadios: HTMLInputElement[] = [];
          document
            .querySelectorAll(`input[type="radio"][name="${input.name}"]`)
            .forEach((_input: any) => {
              if (_input !== input) otherGroupRadios.push(_input);
            });
          function otherCltOptions(mode: string) {
            return otherGroupRadios.map(radio => {
              return {
                element: radio as HTMLElement,
                class: sfsVal,
                mode: mode,
                closest: { cascader: true },
              };
            });
          }

          // * Add *

          // Class
          utils.classListToggle({ ...cltOptions, mode: 'add' });

          // Attribute
          input.setAttribute(sfsVal, '');

          // * Remove *

          // Class
          utils.classListToggle(...otherCltOptions('remove'));

          // Attribute
          otherGroupRadios.forEach(radio => radio.removeAttribute(sfsVal));
        }

        // Checkbox
        if (input.type === 'checkbox') {
          // Data logic & class switch
          if (isOn) {
            // Remove it
            utils.classListToggle({ ...cltOptions, mode: 'remove' });

            // Logic
            if (input.hasAttribute('required')) input.value = '';
            else input.value = 'off';
            isOn = false;
          } else {
            // Add it
            utils.classListToggle({ ...cltOptions, mode: 'add' });

            // Logic
            input.value = 'on';
            isOn = true;
          }
        }
      });
    });
  });
}
