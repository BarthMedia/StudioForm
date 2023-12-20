// Imports
import * as attributeUtils from '../view/utilsAttributes';
import * as config from '../../config';
import * as model from '../../model';

// Export
export default function (wrapper: HTMLElement, mask: HTMLElement) {
  // + Helper +

  // action, method, accept, contentType, redirect

  // Attribute
  function getAttribute(str: string, native = true) {
    // Values
    let val = attributeUtils.getAttribute(str, mask, wrapper);
    if (!val && native) val = mask.getAttribute(str);

    // Return
    return val || '';
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
  };

  // Expose to api & handle change requests
  return obj;
}
