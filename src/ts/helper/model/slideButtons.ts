// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (type: string, slide: HTMLElement) {
  // Elements
  const inputs = slide.querySelectorAll(
    helper.INPUTS_SELECTOR
  ) as NodeListOf<HTMLElement>;
  const buttons = slide.querySelectorAll(
    helper.BUTTON_SELECTOR
  ) as NodeListOf<HTMLElement>;

  // Define
  const arr: StudioFormButtonLogic[] = [];

  // Helper
  function modifyObj(button: HTMLElement, i: number) {
    // Values
    const obj: StudioFormButtonLogic = {
      index: i,
      element: button,
      conditional: helper.getAttribute('conditional', button) || '',
      next: helper.getAttribute(null, button) !== 'submit',
    };

    // Push
    arr.push(obj);
  }

  // Radio loop
  if (type === 'radio') {
    inputs.forEach((input, index) => {
      // Elments
      const button = input.closest(helper.LABEL_SELECTOR) as HTMLElement | null;

      // Modify
      modifyObj(button || input, index);
    });

    // Return
    return arr;
  }

  // Buttons loop
  buttons.forEach((button, index) => {
    // Modify
    modifyObj(button, index);
  });

  // Values

  // Return
  return arr;
}
