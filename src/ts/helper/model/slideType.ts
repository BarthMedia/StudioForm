// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (slide: HTMLElement) {
  // Elements
  const inputs = slide.querySelectorAll(viewUtils.INPUTS_SELECTOR);
  const buttons = slide.querySelectorAll(viewUtils.BUTTON_SELECTOR);

  // Values
  let isRadioOnly = buttons.length < 1;

  // Radio loop
  if (isRadioOnly)
    inputs.forEach(input => {
      if (input.getAttribute('type') !== 'radio') isRadioOnly = false;
    });

  // Type
  let type = 'standard';
  if (isRadioOnly) type = 'radio';

  // Return
  return type;
}
