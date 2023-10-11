// + Import +
import * as config from '../../config';

// + Export +
export default function init(state: any) {
  // Loop
  state.sdk.slideLogic.forEach((slide: any) => {
    // Genereate checkbox groups
    const groups: Set<string> = new Set();
    slide.el
      .querySelectorAll('[data-group]')
      .forEach((input: HTMLInputElement) => {
        // Values
        const val = input.getAttribute('data-group');

        // Ensure the value is unique before adding it to the Set
        if (val && !groups.has(val)) {
          groups.add(val);
        }
      });

    // Loop
    groups.forEach(str => {
      // Elements
      const selector = `[data-group="${str}"]`;
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
      let min = parseInt(source.getAttribute('data-min') || '');
      if (isNaN(min)) min = 1;
      let max: number | undefined = parseInt(
        source.getAttribute('data-max') || ''
      );
      if (isNaN(max)) max = undefined;

      // Value logic function
      function valueLogic(checkbox: HTMLInputElement) {
        // Await Studio Forms value correction
        setTimeout(() => {
          const addValue = checkbox.classList.contains('sf-selected')
            ? true
            : false;
          checkbox.value = addValue
            ? checkbox.getAttribute('data-value') || 'on'
            : '';
        }, 1);
      }

      // Loop
      checkboxes.forEach(checkbox => {
        // Reset
        checkbox.removeAttribute('required');
        checkbox.value = checkbox.hasAttribute('checked')
          ? checkbox.getAttribute('data-value') || 'on'
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
