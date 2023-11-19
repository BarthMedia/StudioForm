// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${helper.errorName(s)}submit.ts -> default: `;
export default async function (stateId: number, options: Options) {
  console.log('If submission .ok == true, then set resolve to true or false!');
  console.log('Submission are promises and resolves!');

  // Values
  const state = model.state[stateId];
  const currentSlideId: number =
    state.sdk.slideRecord[state.sdk.slideRecord.length - 1];

  console.log('Console.log! New allow show error message mode!');
  console.log('MAKE IT OPTIONAL, THAT ERROR MESSAGE IS EVEN SHOWN !');
  console.log(
    'ERROR AND SUCCESS MESSAGES ARE NO LISTS!',
    'nope, no lists! this can be alternatively achieved by Wized users listening to sf-after-submit!'
  );

  console.log(
    'CONSIDER, firing sf-submit event instead of submit native event, in case that causes any troubles!'
  );

  console.log(`Prevent default, fires the submit event, but does never start the submission.

  Make StudioForm behave like this ○`);

  // Slider mode guard
  if (state.modes.isSlider === true) {
    const msg = `${errPath(state)}Slider mode doesn't allow for submission!`;
    console.warn(msg);
    return msg;
  }

  // Guard 0 - Let animations finish
  if (
    state.modes.waitForAnimations === true &&
    options.doNotWaitForAnimations !== true &&
    state.view.gsapTimeline.isRunning === true
  ) {
    const msg = `${errPath(state)}The animation is not yet finished!`;
    console.warn(msg);
    return msg;
  }

  // Warn guard
  if (state.sdk.isSubmitted === true) {
    const msg = `${errPath(state)}Form already submitted!`;
    console.warn(msg);
    return msg;
  }

  // Check step requirements
  if (
    !state.sdk.slideRequirements(currentSlideId, options) &&
    !options.doNotCheckSlideRequirements
  ) {
    return;
  }

  // Hide error message
  state.elements.errorMsg.style.display = '';

  // Update model
  state.sdk.isSubmitted = true;

  // Set all submit buttons to data-wait
  const waitAttr = 'data-wait';
  const sfsClass = 'submit';
  const currentButtons = state.sdk.slideLogic[currentSlideId].btns;
  if (currentButtons)
    currentButtons.forEach((btn: any) => {
      // Class toggle
      helper.classListToggle({ el: btn.el, class: sfsClass, mode: 'add' });

      // Guard
      if ((btn.el.getAttribute(waitAttr) || '') === '') return;

      // Set data default
      if (!btn.textDefault) btn.textDefault = btn.el.innerHTML;

      // Overwrite text
      btn.el.innerHTML = btn.el.getAttribute(waitAttr);
    });

  console.log(
    'Still have after submit event, to allow users to perform timely actions on the submit data',
    'but only after it was applied and user manipulation could not further break the script'
  );

  // Await response & print to sdk & DOM
  const res: JSON = await state.model.post();
  let resVal: string | undefined;
  try {
    if (res instanceof Document) {
      resVal = JSON.stringify(
        {
          message: `<b>${config.PRODUCT_NAME_CAMEL_CASE}[0].events.afterSubmit(</b> ...yourCallBackFunctions <b>)</b> states:<br><b>${config.PRODUCT_NAME_CAMEL_CASE}[${state.sdk.i}].data.response</b> is an instance of Document.`,
        },
        null,
        2
      );
    } else {
      resVal =
        state.sdk.data.status === 'fail'
          ? state.sdk.data.response.message
          : JSON.stringify(res, null, 2);
    }
  } catch (err) {
    const msg = `${errPath(state)}Unable to produce "resVal: string" value!`;
    console.warn(msg, err);
  }

  // * Print to form elements *
  if (typeof resVal === 'string')
    // Loop
    state.elements.responseData.forEach((el: HTMLElement) => {
      el.style.whiteSpace = 'pre-wrap';
      el.innerHTML = resVal!;
    });

  // * Form failed *
  if (state.sdk.data.status !== 'done' && options.forceDone !== true) {
    // SDK Logic

    // Reset buttons
    if (currentButtons)
      currentButtons.forEach((btn: any) => {
        // Class toggle
        helper.classListToggle({ el: btn.el, class: sfsClass, mode: 'remove' });

        // Guard
        if ((btn.el.getAttribute(waitAttr) || '') === '') return;

        // Overwrite text
        btn.el.innerHTML = btn.textDefault;
      });

    // Show error message
    state.elements.errorMsg.style.display = 'block';

    // On click event error message
    if (state.modes.hideErrorMessageOnClick)
      document.body.addEventListener(
        'click',
        function () {
          state.elements.errorMsg.style.display = '';
        },
        { once: true }
      );

    // Allow for new submmission
    state.sdk.isSubmitted = undefined;

    // Skip code below

    // Return
    const msg = `${errPath(state)}Form submission not successful!`;
    return msg;
  }

  // * Form success *

  // Add sf-hide to everything but the success, error & form
  state.elements.wrapper.childNodes.forEach((node: HTMLElement) => {
    // Guard
    if (
      node === state.elements.mask ||
      node === state.elements.errorMsg ||
      node === state.elements.successMsg
    )
      return;

    // Add class
    helper.addSfHide(node);
  });

  // Add sf-hide to every indexed ${config.PRODUCT_NAME} element
  document
    .querySelectorAll(`[${config.PRODUCT_NAME}-${state.sdk.i}]`)
    .forEach(el => helper.addSfHide(el as HTMLElement));

  // Animate
  state.view.animate({
    ...options,
    currentSlideId: currentSlideId,
    isSubmit: true,
  });

  // Redirect
  if (typeof state.sdk.data.redirect === 'string') {
    setTimeout(() => {
      location.href = state.sdk.data.redirect;
    }, state.sdk.animationData.timeBoth * 1000 + 1);
  }

  // Trigger events
  helper.triggerAllFunctions(state.view.eventsFunctionArrays.afterSubmit);

  // Default return
  const msg = `${errPath(state)}Form submission successful!`;
  return msg;
}
