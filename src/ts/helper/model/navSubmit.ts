// Imports
import * as utils from './utils';
import * as viewUtils from '../view/utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// View
import animatePromiseResolve from '../view/animatePromiseResolve';
import reset from '../view/reset';

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
  const currentSlideId = utils.currentSlideId(instance);
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

  // Set all submit buttons to data-wait
  const waitAttr = 'data-wait';
  const currentButtons = instance.logic[currentSlideId].buttons;
  if (currentButtons)
    currentButtons.forEach(btn => {
      // Values
      const wait = btn.element.getAttribute(waitAttr) || '';

      // Guard
      if (wait === '') return;

      // Overwrite text
      btn.element.innerHTML = wait;
    });

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

  // Reset buttons
  if (currentButtons)
    currentButtons.forEach(btn => {
      // Guard
      if ((btn.element.getAttribute(waitAttr) || '') === '') return;

      // Overwrite text
      btn.element.innerHTML = btn.defaultText;
    });

  // Values
  const responseData = instance.data.fetch.response;
  const responseOk = responseData?.ok || false;

  // Respect wized reset
  if (modes.reset) reset(instance, internal, 0, options);

  // If fetch was prevented / not executed
  if (!response || modes.preventDefault) return false;

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
    viewUtils.dispatchEvent(instance, 'failed', internal);
  }

  // Dispatch resolve event
  viewUtils.dispatchEvent(instance, 'fetched', internal, false, {
    success: responseData?.ok,
  });

  // Call navTo
  if (!navToCommand && responseOk)
    await navTo(instance, 'done', options, internal, true);

  // Default
  return responseOk;
}
