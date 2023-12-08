// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (type: string, slide: HTMLElement) {
  // Elements
  const inputs = slide.querySelectorAll(
    viewUtils.INPUTS_SELECTOR
  ) as NodeListOf<HTMLElement>;
  const buttons = slide.querySelectorAll(
    viewUtils.BUTTON_SELECTOR
  ) as NodeListOf<HTMLElement>;

  // Define
  const arr: StudioFormButtonLogic[] = [];

  // Helper
  function modifyObj(button: HTMLElement, i: number) {
    // Values
    const obj: StudioFormButtonLogic = {
      index: i,
      element: button,
      conditional: viewUtils.getAttribute('conditional', button) || '',
      next: viewUtils.getAttribute(null, button) !== 'submit',
      defaultText: button.innerHTML,
    };

    // Push
    arr.push(obj);
  }

  // Radio loop
  if (type === 'radio') {
    inputs.forEach((input, index) => {
      // Elments
      const button = viewUtils.closestCascader(input);

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
