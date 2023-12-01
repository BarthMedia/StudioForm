// + Imports +

// Custom
import * as config from '../../config';
import * as model from '../../model';

// + Exports +

// Dispatch events
export function dispatchEvent(
  instanceName: string,
  eventName: string,
  cancelable = false,
  detail?: unknown,
  internal = true
) {
  // Values
  const mask = model.state.instances[instanceName].elements.mask;
  let payload = detail && typeof detail === 'object' ? detail : {};
  payload = { ...payload, instanceName: instanceName };
  const globalConfig = model.state.api['config'];

  // Event
  const event = new CustomEvent(
    globalConfig.eventPrefix +
      eventName +
      (internal ? '' : globalConfig.externalEventSuffix),
    {
      bubbles: globalConfig.eventBubbles,
      cancelable: cancelable,
      detail: payload,
    }
  );

  // Dispatch
  mask.dispatchEvent(event);

  // Return
  return event;
}

// Get input key
export function getInputKey(input: HTMLInputElement) {
  return (
    getAttributeOr(input, 'data-name', 'name', 'id', 'class', 'type') ||
    input.tagName
  ).replace(/[!'()*]/g, '_');
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

// Button & others selector
export const INPUTS_SELECTOR = `input, select, textarea`;
console.log('REBUILD LABEL INTO CASCADER, AND MAKE LABEL LESS RELEVANT!');
export const LABEL_SELECTOR = 'label, ' + createSelector(null, 'label');
export const BUTTON_SELECTOR =
  createSelector(null, 'submit', 'next') +
  ',.w-button' +
  createSelector(null, 'no-next', 'no-button')
    .split(',')
    .map(str => `:not(${str})`)
    .join('');

// Ultimate query string creator
export function createSelector(
  instanceName: string | null,
  ...strings: string[]
) {
  // Values
  let val = '';

  // Loop
  strings.forEach((str, i) => {
    // Values
    const base = [
      `[${config.PRODUCT_NAME_SHORT}="${str}"]`,
      `[${config.PRODUCT_NAME_LONG}="${str}"]`,
    ];
    const wrapper = `[${config.PRODUCT_NAME_SHORT}-id="${instanceName}"]`;
    const advanced = [
      `[${config.PRODUCT_NAME_SHORT}-${instanceName}="${str}"]`,
      `[${config.PRODUCT_NAME_LONG}-${instanceName}="${str}"]`,
    ];

    // Logic
    if (!instanceName) {
      val += base.join() + (i < strings.length - 1 ? ',' : '');
      return;
    }

    // Else
    val += base.map(str => `${wrapper} ${str}`).join() + ',';
    val += advanced.join() + (i < strings.length - 1 ? ',' : '');
  });

  // Return
  return val;
}

// Classlist toggle
type classListToggleArgs = {
  element: HTMLElement;
  otherEls?: HTMLElement[];
  mode: string;
  class: string;
  closest?: {
    cascader: boolean;
  };
};

// Cloest cascader
export const closestCascader = (element: HTMLElement) => {
  // Values
  const cascader = element.closest(
    createSelector(null, 'cascader')
  ) as HTMLElement | null;
  const label = ['checkbox', 'radio'].includes(
    element.getAttribute('type') || ''
  )
    ? element.closest('label')
    : null;

  // Return
  return cascader || label || element;
};

// Class list toggle
export const classListToggle = (...args: classListToggleArgs[]) => {
  // Loop
  args.forEach(args => {
    // Parent
    let parent = args.element;
    if (args.closest) {
      // Overwrite
      parent = closestCascader(parent);
    }

    const elements: (HTMLElement | Element)[] = [parent];
    if (args.otherEls) args.otherEls.forEach(_el => elements.push(_el));

    // Find child elements
    if (model.state.api['config'].classCascading)
      parent.querySelectorAll('*').forEach(el => elements.push(el));

    // Add / remove ${sfAttr}
    elements.forEach(el =>
      el.classList?.[args.mode](
        `${model.state.api['config'].comboClassPrefix}${args.class}`
      )
    );
  });
};

// Get all ${sfAttr} elements
const sfAttr = 'hide';
const sfhOptions = {
  class: sfAttr,
  closest: {
    cascader: true,
  },
};
function _sfHide(element: HTMLElement, mode: string) {
  // Toogle
  classListToggle({ ...sfhOptions, element: element, mode: mode });
}

// Add sf hide
export const addSfHide = (element: HTMLElement) => {
  _sfHide(element, 'add');
};

// Remove sf hide
export const removeSfHide = (element: HTMLElement) => {
  _sfHide(element, 'remove');
};

// Check if element top is visible
export function isElementTopVisible(
  element: HTMLElement,
  state: any,
  options: SFOScrollTo,
  isFullyVisibleMode = false
) {
  console.log('Think about window-scroll if that is the correct name??');

  // Elements
  const scrollToElement: HTMLElement | null = state.elements.wrapper.closest(
    createSelector(null, 'window-scroll')
  );

  // Get the position of the element relative to the viewport
  const elementRect = element.getBoundingClientRect();
  const containerRect = scrollToElement?.getBoundingClientRect();

  // Get offset
  const offset = returnTargetAndOffset(state, options).offset;

  // Calculate the height of the scrollable container
  const containerHeight = containerRect?.height || window.innerHeight;

  // Check if the top of the element is visible in the viewport or the specified container
  return (
    elementRect.top - (containerRect?.top || 0) - offset >= -1 && // Allowance: -1
    elementRect.top - (containerRect?.top || 0) < containerHeight &&
    (!isFullyVisibleMode
      ? true
      : elementRect.bottom - (containerRect?.bottom || 0) < containerHeight)
  );
}

// Return target element and offset number
export function returnTargetAndOffset(state: any, options: SFOScrollTo) {
  // Selector
  const sttAttr = `scroll-to-target`;
  const targetSelector =
    typeof options.target === 'string'
      ? options.target
      : undefined ||
        getAttribute(
          sttAttr,
          state.elements.wrapper,
          options.attributeReferenceElement as HTMLElement
        ) ||
        '';
  const stoAttr = `scroll-to-offset`;
  const offsetSelector =
    typeof options.offset === 'string'
      ? options.offset
      : undefined ||
        getAttribute(
          stoAttr,
          state.elements.wrapper,
          options.attributeReferenceElement as HTMLElement
        ) ||
        '';

  // Elements
  const target: HTMLElement = isElement(options.target)
    ? options.target
    : targetSelector !== ''
    ? document.querySelector(targetSelector) || state.elements.wrapper
    : state.elements.wrapper;
  let offset: any = isElement(options.offset)
    ? options.target
    : offsetSelector !== ''
    ? document.querySelector(
        typeof options.offset === 'string' ? options.offset : offsetSelector
      )
    : null;
  offset =
    typeof options.offset === 'number'
      ? options.offset
      : offset?.offsetHeight || config.DEFAULT_OFFSET;

  // Return
  return { target: target, offset: offset as number };
}

// Returns true if it is a DOM element
export function isElement(o: any) {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement // DOM2
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string';
}
