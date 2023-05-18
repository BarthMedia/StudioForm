// + Imports +

// Base

// Custom
import * as config from './config.js';

// + Functions +

// External script loader
export function scriptLoader(externalScript = 'foo.js', callback) {
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

// Mark click element
export function markClickElement($buttons, $button = false) {
  $buttons.attr(config.MARK_CLICK_ELEMENT_ATTRIBUTE, false);
  if ($button) {
    $button.attr(config.MARK_CLICK_ELEMENT_ATTRIBUTE, true);
  }
}

// jQuery to native JS
export function jQueryToJs($elements, errorMessage = '[not-findable]') {
  // Guard
  if ($elements.length === 0) return errorMessage;

  // Vars
  let nodeList = [];

  $elements.each(function () {
    nodeList.push(this);
  });

  return nodeList;
}

// - - Return child elements - -
export function returnChildElements(
  $element,
  selector,
  eqValue = 'false',
  notSelector = 'false'
) {
  // Values
  const $foundElements = $element.find(selector);
  let $childElements = $element.children();

  // Logic
  if ($foundElements.length > 0) {
    return $foundElements;
  }

  if (notSelector != 'false') {
    $childElements = $childElements.not(notSelector);
  }

  if (eqValue != 'false') {
    $childElements = $childElements.eq(eqValue);
  }

  return $childElements;
}

// - - Development mode - -
export function returnDevModeIndex($element) {
  // Local variables
  let attrString = $element.attr(config.DEV_MODE_ATTRIBUTE),
    returnValue = 0;

  // Local function
  config.DEV_MODE_OBJECT.forEach(item => {
    // Loop through
    item.names.forEach(name => {
      if (name == attrString) {
        returnValue = item.value;
      }
    });
  });

  return returnValue;
}

// - - String related functions - -

// - Get attribute values -
export function getJsonAttrVals(
  $element,
  attribute,
  defaultVals,
  objectMode = true
) {
  let val =
    ($element.attr(attribute) || '{}') == '{}'
      ? { ...defaultVals }
      : JSON.parse(preJsonParse($element.attr(attribute), objectMode));

  return val;
}

// - Prepare for JSON parse -
function preJsonParse(string, objectMode = true) {
  let array = trimBothStringSides(string.replace(/\, /g, ',')).split(','),
    newString = '',
    arrayLength = array.length - 1;

  array.forEach((item, i) => {
    item
      .replace(/\'/g, '')
      .replace(/\: /g, ':')
      .split(':')
      .forEach((item, i2) => {
        newString += `"${item}"${i2 > 0 ? '' : ': '}`;
      });

    newString += i < arrayLength ? ', ' : '';
  });

  if (objectMode) {
    return `{${newString}}`;
  } else {
    return newString;
  }
}

// Removes curly brackets
function trimBothStringSides(string) {
  return string.substring(1).slice(0, -1);
}
