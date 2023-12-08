// + Imports +

// Custom
import * as config from '../../config';
import * as model from '../../model';

// + Exports +

// Warn
export const warn = function (...args: unknown[]) {
  if (model.state.api['config'].warn) console.warn(...args);
};

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

// Return product name
export const errorName = (name: string | StudioFormInstance) =>
  `${config.PRODUCT_NAME_CAMEL_CASE}["${
    typeof name === 'string' ? name : name.name
  }"] ->`;
