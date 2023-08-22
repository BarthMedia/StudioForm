// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (type: string, slide: HTMLElement, state: any) {
  // Elements
  const inputs = slide.querySelectorAll('input, select, textarea');
  const buttons = slide.querySelectorAll(
    '[studio-form="next"], .w-button:not([studio-form="Not a Button"], [studio-form="no-button"])'
  );

  // Define
  const arr: any[] = [];

  // Helper
  function modifyObj(btn: HTMLElement | Element | null, i: number) {
    // Values
    const obj: any = {};

    // Modify
    obj.i = i;
    obj.el = btn;
    obj.conditional = btn?.getAttribute('data-conditional') || '';
    obj.next = btn?.getAttribute('studio-form') !== 'submit';

    // Push
    arr.push(obj);
  }

  // Radio loop
  if (type === 'radio') {
    inputs.forEach((input, index) => {
      // Elments
      const button = input.closest('label, [studio-form="label"]');

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
