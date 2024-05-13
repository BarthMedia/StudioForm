// Imports
import * as attributeUtils from '../view/utilsAttributes';
import * as config from '../../config';
import * as model from '../../model';

// Export
export default function (wrapper: HTMLElement, mask: HTMLElement) {
  // + Helper +

  // action, method, accept, contentType, redirect

  // Attribute
  function getAttribute(str: string, native = true, alternativeValue?: string) {
    // Values
    let val = attributeUtils.getAttribute(str, mask, wrapper);
    if (!val && native) val = mask.getAttribute(str);

    // Return
    return val || alternativeValue || '';
  }

  // Object
  const obj = {
    get action() {
      return getAttribute('action');
    },
    get method() {
      return getAttribute('method');
    },
    get accept() {
      return getAttribute('accept', false);
    },
    get contentType() {
      return getAttribute('content-type', false);
    },
    get redirect() {
      return getAttribute('redirect');
    },
    get timeout() {
      return parseFloat(
        attributeUtils.getAttribute('timeout', mask, wrapper) ||
          config.TIMEOUT_SEC + ''
      );
    },
    get valueSeparator() {
      return getAttribute('value-separator', false, ', ');
    },
  };

  // Expose to api & handle change requests
  return obj;
}
