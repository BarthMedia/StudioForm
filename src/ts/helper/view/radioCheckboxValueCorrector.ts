// Imports
import * as config from '../../config';
import * as helper from '../helper';

// Export
const sfsAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}selected`;
const sfsClass = 'selected';
export default function (state: any) {
  // Consider that checkbox and radio requirements should work different when they are required
  // When required, have the value euqal = '', else 'off' else 'on'

  console.log('THIS CAN NOT FIRE, WHEN CLICK EVENT TARGET IS ANCHOR!');

  // Loop
  state.sdk.slideLogic.forEach((slide: { el: HTMLElement }) => {
    // Elements
    const inputs = slide.el.querySelectorAll('input');

    // Loop
    inputs.forEach(input => {
      // Guard
      if (input.type !== 'checkbox' && input.type !== 'radio') return;

      // Class list toggle options
      const el = (input.closest(config.LABEL_SELECTOR) || input) as HTMLElement;
      const cltOptions = {
        el: input,
        class: sfsClass,
        closest: { parent: config.LABEL_SELECTOR },
      };

      // Elements

      // Guard
      let isOn = input.hasAttribute('checked');
      let isTimeout = false;

      // Checkbox case
      if (input.type === 'checkbox') {
        // Add 'sf-selected' class
        if (isOn) helper.classListToggle({ ...cltOptions, mode: 'add' });
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
          const otherGroupRadios: HTMLInputElement[] = [];
          document
            .querySelectorAll(`input[type="radio"][name="${input.name}"]`)
            .forEach((_input: any) => {
              if (_input !== input) otherGroupRadios.push(_input);
            });
          function otherCltOptions(mode: string) {
            return otherGroupRadios.map(radio => {
              return {
                el: radio as HTMLElement,
                class: sfsClass,
                mode: mode,
                closest: { parent: config.LABEL_SELECTOR },
              };
            });
          }

          // * Add *

          // Class
          helper.classListToggle({ ...cltOptions, mode: 'add' });

          // Attribute
          input.setAttribute(sfsAttr, '');

          // * Remove *

          // Class
          helper.classListToggle(otherCltOptions('remove'));

          // Attribute
          otherGroupRadios.forEach(radio => radio.removeAttribute(sfsAttr));
        }

        // Checkbox
        if (input.type === 'checkbox') {
          // Data logic & class switch
          if (isOn) {
            // Remove it
            helper.classListToggle({ ...cltOptions, mode: 'remove' });

            // Logic
            if (input.hasAttribute('required')) input.value = '';
            else input.value = 'off';
            isOn = false;
          } else {
            // Add it
            helper.classListToggle({ ...cltOptions, mode: 'add' });

            // Logic
            input.value = 'on';
            isOn = true;
          }
        }
      });
    });
  });
}
