// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (type: string, slide: HTMLElement, state: any) {
  // Elements
  const inputs = slide.querySelectorAll(config.INPUTS_SELECTOR);
  const buttons = slide.querySelectorAll(config.BUTTON_SELECTOR);

  // Define
  const arr: any[] = [];

  // Helper
  function modifyObj(btn: HTMLElement | Element | null, i: number) {
    // Values
    const obj: any = {};

    // Modify
    obj.i = i;
    obj.el = btn;
    obj.conditional =
      btn?.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}conditional`) || '';
    obj.next = btn?.getAttribute(config.PRODUCT_NAME) !== 'submit';

    // Push
    arr.push(obj);
  }

  // Radio loop
  if (type === 'radio') {
    inputs.forEach((input, index) => {
      // Elments
      const button = input.closest(config.LABEL_SELECTOR);

      // Modify
      modifyObj(button, index);
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
