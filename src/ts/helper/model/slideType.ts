// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (slide: HTMLElement, state: any) {
  // Elements
  const inputs = slide.querySelectorAll('input, select, textarea');
  const buttons = slide.querySelectorAll(
    '[studio-form="next"], .w-button:not([studio-form="Not a Button"], [studio-form="no-button"])'
  );

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
  if (isCheckboxOnly) type = 'checkbox';
  if (isRadioOnly) type = 'radio';
  if (isEmpty) type = 'empty';
  const typeAttr = slide.getAttribute('data-slide-type');
  if (typeAttr && typeAttr !== '') type = typeAttr;

  // Remove required attribute from checkboxes or radios
  if (state.modes.removeRequiredAttributeFromCheckboxAndRadioOnlys)
    if (isRadioOnly || isCheckboxOnly)
      inputs.forEach(input => input.removeAttribute('required'));

  // Return
  return type;
}
