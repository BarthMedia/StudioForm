// Imports
import * as viewUtils from '../view/utils';
import * as config from '../../config';
import * as model from '../../model';

// Export
export default function (wrapper: HTMLElement, mask: HTMLElement) {
  // + Helper +

  // Attribute
  function getAttribute(str: string, bool = true) {
    console.log(
      'Get most recent model version',
      'Reference most recent slide old / slide next!',
      'instanceName not needed i believe!'
    );

    // Values
    let val = viewUtils.getAttribute(str, mask, wrapper);

    // Fallback
    val = !val ? bool.toString() : val;

    // Return
    return val === 'true';
  }

  getAttribute('test');

  // Object
  const obj = {};

  // Expose to api & handle change requests
  return obj;
}
