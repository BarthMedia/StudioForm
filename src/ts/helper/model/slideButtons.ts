// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (
  type: string,
  slide: HTMLElement,
  slideId: number,
  instanceName: string,
  mask: HTMLElement,
  slideLogicLength: number
) {
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
      get next() {
        return utils.returnLogicTo(
          instanceName,
          slideId,
          button,
          slideLogicLength
        );
      },
      defaultText: button.innerHTML,
    };

    // Accessibility
    const next = obj.next;
    viewUtils.setAccessibility(
      button,
      next === 'done' ? 'submit' : next,
      null,
      mask,
      true,
      slideLogicLength
    );

    console.log("u can't have prev buttons be wrongly selected again!");

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
