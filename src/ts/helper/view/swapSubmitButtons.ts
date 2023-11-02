// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (
  slide: HTMLElement,
  modes: { [name: string]: boolean }
) {
  // Guard
  if (!modes.swapSubmitButtons) return;

  // Elements
  const submits = slide.querySelectorAll('input[type="submit"]');

  // Guard
  if (submits.length < 1) return;

  // Loop
  submits.forEach(submit => {
    // Step 2: Extract input element attributes
    const attributes = submit.attributes;
    const attributesObj = {};

    for (const attr of attributes) {
      attributesObj[attr.name] = attr.value;
    }

    // Create
    const btn = document.createElement('a');
    for (const attrName in attributesObj) {
      btn.setAttribute(attrName, attributesObj[attrName]);
    }
    btn.removeAttribute('type');
    btn.removeAttribute('value');
    btn.setAttribute(config.PRODUCT_NAME_SHORT, 'submit');
    btn.innerHTML = submit.getAttribute('value') || '';

    // Swap
    submit.after(btn);
    submit.remove();
  });
}
