// + Imports +

// Base
import { async } from 'regenerator-runtime';

// Custom
import * as config from '../config';
import * as model from '../model';

// + Functions +

// Get attribute
export function getAttribute(str: string | null, ...elements: HTMLElement[]) {
  // Values
  const querys = [
    `${config.PRODUCT_NAME_SHORT}${str === null ? '' : `-${str}`}`,
    `${config.PRODUCT_NAME_LONG}${str === null ? '' : `-${str}`}`,
  ];
  let val: string | null = null;

  // Loop
  querys.forEach(str => {
    // Values
    let attr: string | null = null;

    // Loop
    elements.every(el => {
      // Logic
      const getAttr = el.getAttribute(str);
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

// Button selector
export const INPUTS_SELECTOR = `input, select, textarea`;
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
    const wrapper = `[${config.PRODUCT_NAME_SHORT}-name="${instanceName}"]`;
    const advanced = [
      `[${config.PRODUCT_NAME_SHORT}-${instanceName}="${str}"]`,
      `[${config.PRODUCT_NAME_LONG}-${instanceName}="${str}"]`,
    ];

    // Logic
    if (!instanceName) {
      val += base.join(',') + (i < strings.length - 1 ? ',' : '');
      return;
    }

    // Else
    val += base.map(str => `${wrapper} ${str}`).join(',') + ',';
    val += advanced.join(',') + (i < strings.length - 1 ? ',' : '');
  });

  // Return
  return val;
}

// Return product name
export const errorName = (name: any) =>
  `${config.PRODUCT_NAME_CAMEL_CASE}[${name}] ->`;

// Classlist toggle
type classListToggleArgs = {
  el: HTMLElement;
  otherEls?: HTMLElement[];
  mode: string;
  class: string;
  closest?: {
    parent: string;
    allowParent?: {
      refEl?: HTMLElement;
      getAttr?: string;
      tagName?: true;
      equals: string;
    };
  };
};
export const classListToggle = (...args: classListToggleArgs[]) => {
  // Loop
  args.forEach(args => {
    // Parent
    let parent = args.el;
    if (args.closest) {
      // Define
      const arg = args.closest;
      const refEl = arg.allowParent?.refEl || args.el;
      const equals = arg.allowParent?.getAttr
        ? getAttribute(arg.allowParent.getAttr, refEl)
        : refEl.tagName;

      // Logic
      if (!arg.allowParent || equals === arg.allowParent.equals)
        parent = args.el.closest(arg.parent) || parent;
    }

    const elements: (HTMLElement | Element)[] = [parent];
    if (args.otherEls) args.otherEls.forEach(_el => elements.push(_el));

    // Find child elements
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
    parent: createSelector(null, sfAttr),
    allowParent: {
      getAttr: `closest-${sfAttr}`,
      equals: 'false',
    },
  },
};
function _sfHide(element: HTMLElement, mode: string) {
  // Toogle
  classListToggle({ ...sfhOptions, el: element, mode: mode });
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
  options: Options,
  isFullyVisibleMode = false
) {
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
export function returnTargetAndOffset(state: any, options: Options) {
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

// + + +

// Allows for loading other scripts
export function scriptLoader(externalScript = 'foo.js', callback: () => void) {
  const scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    document.head.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = externalScript;
  });

  scriptPromise.then(callback);
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

// Timeout
export const timeout = function (s: number, mode = 'standard') {
  // Return
  return new Promise(function (_, reject) {
    // Timeout
    setTimeout(function () {
      // Create error
      reject(
        new Error(
          `Request took too long! Timeout after ${
            s / (mode === 'quick' ? 10 : 1)
          } second`
        )
      );
    }, (s * 1000) / (mode === 'quick' ? 10 : 1));
  });
};

// Return JSON
export const getJson = async function (
  url: string,
  init: object = {},
  timeoutSec = config.TIMEOUT_SEC
) {
  try {
    // Values
    const res: any = await Promise.race([
      fetch(url, init),
      timeout(timeoutSec),
    ]);
    let data = { message: 'Unable to format response as JSON.' };

    // Check if the Content-Type header is set to text/html
    const contentType = res.headers.get('Content-Type');

    // Expect HTML
    if (contentType && contentType.includes('text/html')) {
      // Await HTML string
      data = await res.text();

      // Create a new DOMParser
      const parser = new DOMParser();

      // Parse the text data as an HTML document
      data = parser.parseFromString(data as any, 'text/html') as any;
    } else {
      // Expect JSON
      try {
        data = await res.json();
      } catch (err) {
        console.warn(`helper.ts -> getJson: `, err);
      }
    }

    // Logic
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Return
    return data;
  } catch (err) {
    throw err;
  }
};
