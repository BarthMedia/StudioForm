// + Imports +

// Custom
import * as config from '../../config';
import * as model from '../../model';
import * as modelUtils from '../model/utils';

// + Exports +

// Get smw attribute
export function getSlideMaskWrapperAttribute(
  str: string,
  wrapper: HTMLElement,
  mask: HTMLElement
) {
  // Elements
  const sfId = getAttribute('id', wrapper);
  const instance = model.state.instances[sfId + ''] as
    | StudioFormInstance
    | undefined;
  const slide = instance?.logic[modelUtils.currentSlideId(instance)].element;

  // Values
  const elements = [mask, wrapper];
  if (slide) elements.unshift(slide);

  // Return
  return getAttribute(str, ...elements);
}

// Get attribute ||
export function getAttributeOr(element: HTMLElement, ...strings: string[]) {
  // Values
  let returnVal: string | null = null;

  // Loop
  strings.every(str => {
    // Values
    const val = element.getAttribute(str);

    // Logic
    if (val) {
      returnVal = val;
      return false;
    }

    // Default
    return true;
  });

  // Return
  return returnVal as string | null;
}

// Get attribute strings
export function getAttributeStrings(str: string | null) {
  return [
    `${config.PRODUCT_NAME_SHORT}${str === null ? '' : `-${str}`}`,
    `${config.PRODUCT_NAME_LONG}${str === null ? '' : `-${str}`}`,
  ];
}

// Get attribute
export function getAttribute(
  str: string | null,
  ...elements: (HTMLElement | null)[]
) {
  // Values
  const querys = getAttributeStrings(str);
  let val: string | null = null;

  // Loop
  querys.forEach(str => {
    // Values
    let attr: string | null = null;

    // Loop
    elements.every(el => {
      // Logic
      const getAttr = el?.getAttribute(str);
      if (getAttr) {
        attr = getAttr;
        return false;
      }

      // Default
      return true;
    });

    // Overwrite
    if (attr) val = attr;
  });

  // Return
  return val as string | null;
}
