// + Import +
import * as config from '../../config';

// + Export +
export default function init(state: any) {
  // Loop
  state.sdk.slideLogic.forEach((slide: any) => {
    console.log(
      'CREATE OBSEVER, THAT TESTS FOR NEW HTML ELEMENT CHANGES, AND ADJUSTS THESE 3 HELPER FILES ACCORDINGLY!'
    );

    console.log(
      'Create sf- / studio-form-value attribute for checkboxes & groups, and only after that fall back to native value value!'
    );

    // Genereate checkbox groups
    const groups: Set<string> = new Set();
    slide.el
      .querySelectorAll(`[${config.CUSTOM_ATTRIBUTE_PREFIX}group]`)
      .forEach((input: HTMLInputElement) => {
        // Values
        const val = input.getAttribute(
          `${config.CUSTOM_ATTRIBUTE_PREFIX}group`
        );

        // Ensure the value is unique before adding it to the Set
        if (val && !groups.has(val)) {
          groups.add(val);
        }
      });

    // Loop
    groups.forEach(str => {
      // Elements
      const selector = `[${config.CUSTOM_ATTRIBUTE_PREFIX}group="${str}"]`;
      const inputs: NodeListOf<HTMLInputElement> | HTMLInputElement[] =
        slide.el.querySelectorAll(`${selector} input, input${selector}`);

      // Clean up inputs
      const checkboxes: HTMLInputElement[] = [];
      inputs.forEach((checkbox: HTMLInputElement) => {
        // Guard
        if (checkbox.type !== 'checkbox') return;

        // Push
        checkboxes.push(checkbox);
      });

      // Elements
      const source =
        checkboxes[0].closest(config.LABEL_SELECTOR) ||
        (checkboxes[0] as HTMLElement);

      // Values
      let min = parseInt(
        source.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}min`) || ''
      );
      if (isNaN(min)) min = 1;
      let max: number | undefined = parseInt(
        source.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}max`) || ''
      );
      if (isNaN(max)) max = undefined;

      // Value logic function
      function valueLogic(checkbox: HTMLInputElement) {
        // Await Studio Forms value correction
        setTimeout(() => {
          const addValue = checkbox.classList.contains(
            `${config.PRODUCT_NAME_CLASS_PREFIX}selected`
          )
            ? true
            : false;
          checkbox.value = addValue
            ? checkbox.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}value`) ||
              'on'
            : '';
        }, 1);
      }

      // Loop
      checkboxes.forEach(checkbox => {
        // Reset
        checkbox.removeAttribute('required');
        checkbox.value = checkbox.hasAttribute('checked')
          ? checkbox.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}value`) ||
            'on'
          : '';

        // Event listener
        checkbox.addEventListener('click', () => {
          valueLogic(checkbox);
        });
      });

      // Require toggle
      function toggle(mode: string) {
        checkboxes.forEach(checkbox => {
          // Values
          const args = ['required'];
          if (mode === 'set') args.push('');

          // Fire
          checkbox[mode + 'Attribute'](...args);
        });
      }

      // SF skd event listener
      state.sdk.events.onCheckSlideRequirements(() => {
        // Values & loop
        let count = 0;
        checkboxes.forEach(checkbox => {
          // Math
          count += checkbox.value !== '' ? 1 : 0;
        });
        let isValid = count >= min;
        if (max !== undefined) isValid = isValid && count <= max;

        // Logic
        if (isValid) {
          toggle('remove');
        } else {
          toggle('set');
        }
      });
    });
  });
}
