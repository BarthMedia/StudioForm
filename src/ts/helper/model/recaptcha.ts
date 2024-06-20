// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as model from '../../model';
import * as config from '../../config';
import dataForm from './dataForm';

// Helper
const errPath = (n: string | StudioFormInstance) =>
  `${controllerUtils.errorName(n)} recaptcha.ts:`;

// Export
export default async function (instance: StudioFormInstance) {
  // Values
  const recaptchaKey = model.state.api['config'].recaptchaKey;

  // Guard
  if (recaptchaKey == '' || !instance.config.modes.recaptcha) return;

  // Load logic
  if (!window.grecaptcha) {
    // Create promise
    const recaptchaReadyPromise = new Promise<void>(resolve => {
      // Load script
      controllerUtils.scriptLoader(
        'https://www.google.com/recaptcha/api.js?render=' + recaptchaKey,
        resolve
      );
    });

    // Resolve & await promise when reCAPTCHA is ready
    await recaptchaReadyPromise;
  }

  // Create promise
  const recaptchaReadyPromise = new Promise<string | undefined>(resolve => {
    // @ts-ignore
    grecaptcha.ready(() => {
      try {
        // @ts-ignore
        grecaptcha
          .execute(recaptchaKey, { action: 'submit' })
          .then((token: string) => {
            // Resolve the promise with the token
            resolve(token);
          })
          .catch((err: any) => {
            throw err;
          });
      } catch (err) {
        controllerUtils.warn(errPath(instance), err);
        resolve(undefined);
      }
    });
  });

  // Return
  return await recaptchaReadyPromise;
}
