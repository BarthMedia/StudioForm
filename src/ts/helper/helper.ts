// + Imports +

// Base
import { async } from 'regenerator-runtime';

// Custom
import * as config from '../config';

// + Functions +

// Check if element top is visible
export function isElementTopVisible(
  element: HTMLElement,
  state: any,
  options: Options,
  isFullyVisibleMode = false
) {
  // Get the position of the element relative to the viewport
  const elementRect = element.getBoundingClientRect();

  // Get offset
  const offset = returnTargetAndOffset(state, options).offset;

  // Check if the top of the element is visible in the viewport
  return (
    elementRect.top - offset > 0 &&
    elementRect.top < window.innerHeight &&
    (!isFullyVisibleMode ? true : elementRect.bottom < window.innerHeight)
  );
}

// Return target element and offset number
export function returnTargetAndOffset(state: any, options: Options) {
  // Selector
  const targetSelector =
    typeof options.target === 'string'
      ? options.target
      : undefined ||
        options.attributeReferenceElement?.getAttribute(
          'data-scroll-to-target'
        ) ||
        state.elements.wrapper?.getAttribute('data-scroll-to-target') ||
        '';
  const offsetSelector =
    typeof options.offset === 'string'
      ? options.offset
      : undefined ||
        options.attributeReferenceElement?.getAttribute(
          'data-scroll-to-offset'
        ) ||
        state.elements.wrapper?.getAttribute('data-scroll-to-offset') ||
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
    try {
      data = await res.json();
    } catch (err) {
      console.warn(`helper.ts -> getJson: `, err);
    }

    // Logic
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Return
    return data;
  } catch (err) {
    throw err;
  }
};
