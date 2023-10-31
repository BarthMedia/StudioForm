// + Imports +

// Base
import { async } from 'regenerator-runtime';

// Custom
import * as config from '../config';

// + Functions +

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
type cltArgs = {
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
export const classListToggle = (args: cltArgs | cltArgs[]) => {
  // Loop logic
  const _args = Array.isArray(args) ? args : [args];

  // Loop
  _args.forEach(args => {
    // Parent
    let parent = args.el;
    if (args.closest) {
      // Define
      const arg = args.closest;
      const refEl = arg.allowParent?.refEl || args.el;
      const equals = arg.allowParent?.getAttr
        ? refEl.getAttribute(arg.allowParent.getAttr)
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
        `${config.PRODUCT_NAME_CLASS_PREFIX}${args.class}`
      )
    );
  });
};

// Get all ${sfAttr} elements
const sfAttr = 'hide';
const sfhOptions = {
  class: sfAttr,
  closest: {
    parent: `[${config.PRODUCT_NAME}="${sfAttr}"]`,
    allowParent: {
      getAttr: `${config.CUSTOM_ATTRIBUTE_PREFIX}closest-${sfAttr}`,
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
    ['window-scroll'].map(str => `[${config.PRODUCT_NAME}="${str}"]`).join(', ')
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
  const sttAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}scroll-to-target`;
  const targetSelector =
    typeof options.target === 'string'
      ? options.target
      : undefined ||
        options.attributeReferenceElement?.getAttribute(sttAttr) ||
        state.elements.wrapper?.getAttribute(sttAttr) ||
        '';
  const stoAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}scroll-to-offset`;
  const offsetSelector =
    typeof options.offset === 'string'
      ? options.offset
      : undefined ||
        options.attributeReferenceElement?.getAttribute(stoAttr) ||
        state.elements.wrapper?.getAttribute(stoAttr) ||
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

// Add events infrastructure
export function addEventsInfrastrucutre(state: any, name: string) {
  // Values
  const initEvents = state.sdk.events;
  const eventFunctionArrays = state.view.eventsFunctionArrays;

  // Create neccessary model.state.view.eventsFunctionArrays infrastructure
  eventFunctionArrays[`on${name}`] = [];
  eventFunctionArrays[`after${name}`] = [];

  // Add sdk events
  initEvents[`on${name}`] = function (...callbacks: any[]) {
    pushFunctionsOnly(callbacks, eventFunctionArrays[`on${name}`]);
  };
  initEvents[`after${name}`] = function (...callbacks: any[]) {
    pushFunctionsOnly(callbacks, eventFunctionArrays[`after${name}`]);
  };
}

// Trigger all functions
export function triggerAllFunctions(arr: any[]) {
  arr.forEach(item => item());
}

// Push function only to array
export function pushFunctionsOnly(args: any | any[], arr: any[]) {
  // Logic
  if (args['forEach']) {
    args.forEach((arg: any) => f(arg));
  } else {
    f(args);
  }

  // Define
  function f(val: any) {
    if (typeof val === 'function') arr.push(val);
  }
}

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

// String to array
export function stringToArray(
  string: string,
  splitter: any = ',',
  removeWhiteSpaces = true,
  removeQuotes = true,
  removeBrackets = true
) {
  // - Manipulation -

  // Remove brackets
  if (removeBrackets) string = string.replace(/[\[\]]/g, '');

  // Remove quotes
  if (removeQuotes) string = string.replace(/['"]/g, '');

  // Remove white spaces
  if (removeWhiteSpaces) string = string.replace(/ /g, '').replace(/\n/g, '');

  // Split
  const arr = splitter !== false ? string.split(splitter) : string;

  // Return
  return arr;
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
