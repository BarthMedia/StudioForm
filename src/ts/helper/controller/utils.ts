// + Imports +

// Custom
import * as config from '../../config';
import * as model from '../../model';

// + Exports +

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
export const errorName = (name: any) =>
  `${config.PRODUCT_NAME_CAMEL_CASE}[${name}] ->`;
