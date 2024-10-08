// Imports
import * as utils from './utils';
import * as viewUtils from '../view/utils';
import * as eventUtils from '../view/utilsEvents';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// View
import animatePromiseResolve from '../view/animatePromiseResolve';

// Fetch
import fetch from './fetch';
import navTo from './navTo';

// Error
const errPath = (i: StudioFormInstance) =>
  `${controllerUtils.errorName(i)} submit.ts:`;

// Export
export default async function (
  instance: StudioFormInstance,
  options: SFONav,
  internal = false,
  navToCommand = false
) {
  // Guard - Nav
  if (
    !utils.navGuard(instance, errPath, options, { submit: true }, !navToCommand)
  )
    return false;

  // Values
  const modes = instance.config.modes;

  // Hide fail for resubmit
  const tabindex = 'tabindex';
  const failMessageElement = instance.elements.fail;
  if (modes.autoShowFail && failMessageElement) {
    failMessageElement.style.display = '';
    failMessageElement.setAttribute(tabindex, '-1');
  }

  // Listen SFONav options!
  if (options.fake) return true;

  // Fetch
  const response = await animatePromiseResolve(
    instance,
    {},
    internal,
    true,
    async () => {
      return fetch(instance, {}, internal);
    }
  );

  // Values
  const responseData = instance.data.fetch.response;
  const responseOk = responseData?.ok || false;

  // If fetch was prevented / not executed
  if (!response) return false;

  // If repsone not ok
  if (!responseOk) {
    // Display block
    if (modes.autoShowFail && failMessageElement) {
      failMessageElement.style.display = 'block';
      failMessageElement.setAttribute(tabindex, '0');
    }

    // Write error messages
    instance.elements.errors.forEach(el => {
      el.innerHTML = responseData?.error?.message || '';
    });

    // On click event error message
    if (modes.autoHideFail)
      document.body.addEventListener(
        'click',
        function () {
          if (failMessageElement) {
            failMessageElement.style.display = '';
            failMessageElement.setAttribute(tabindex, '-1');
          }
        },
        { once: true }
      );

    // Dispatch fail event
    eventUtils.dispatchEvent(instance, 'failed', internal);
  }

  // Dispatch resolve event
  eventUtils.dispatchEvent(instance, 'fetched', internal, false, {
    success: responseData?.ok,
  });

  // Call navTo
  if (!navToCommand && responseOk)
    await navTo(instance, 'done', options, internal, true);

  // Default
  return responseOk;
}
