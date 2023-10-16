// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (slide: HTMLElement, state: any) {
  // Elements
  const inputs = slide.querySelectorAll(config.INPUTS_SELECTOR);
  const buttons = slide.querySelectorAll(config.BUTTON_SELECTOR);

  // Values
  const isEmpty = inputs.length < 1;
  let isRadioOnly = buttons.length < 1;
  let isCheckboxOnly = true;

  // Radio loop
  if (isRadioOnly)
    inputs.forEach(input => {
      if (input.getAttribute('type') !== 'radio') isRadioOnly = false;
    });

  // Checkbox loop
  if (isCheckboxOnly)
    inputs.forEach(input => {
      if (input.getAttribute('type') !== 'checkbox') isCheckboxOnly = false;
    });

  // Type
  let type = 'standard';
  // if (isCheckboxOnly) type = 'checkbox'; // Legacy
  if (isRadioOnly) type = 'radio';
  if (isEmpty) type = 'empty';
  const typeAttr = slide.getAttribute(
    `${config.CUSTOM_ATTRIBUTE_PREFIX}slide-type`
  );
  if (typeAttr && typeAttr !== '') type = typeAttr;

  // Return
  return type;
}
