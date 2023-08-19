// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default async function (index: number, options: Options) {
  // Values
  const state = model.state[index];
  const currentSlideId: number =
    state.sdk.slideRecord[state.sdk.slideRecord.length - 1];

  // Warn guard
  if (state.sdk.isSubmitted === true) {
    const msg = `StudioForm[${state.sdk.i}] -> submit.ts -> default: Form already submitted!`;
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
  const currentButtons = state.sdk.slideLogic[currentSlideId].btns;
  if (currentButtons)
    currentButtons.forEach((btn: any) => {
      // Guard
      if ((btn.el.getAttribute('data-wait') || '') === '') return;

      // Set data default
      if (!btn.textDefault) btn.textDefault = btn.el.innerText;

      // Overwrite text
      btn.el.innerHTML = btn.el.getAttribute('data-wait');
    });

  // Await response & print to sdk & DOM
  const res: JSON = await state.model.post();
  let resVal: string | undefined;
  try {
    resVal =
      state.sdk.data.status === 'fail'
        ? state.sdk.data.response.message
        : JSON.stringify(res, null, 2);
  } catch (err) {
    const msg = `StudioForm[${state.sdk.i}] -> submit.ts -> default: Unable to produce "resVal: string" value!`;
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
  if (state.sdk.data.status !== 'done') {
    // SDK Logic

    // Reset buttons
    if (currentButtons)
      currentButtons.forEach((btn: any) => {
        // Guard
        if ((btn.el.getAttribute('data-wait') || '') === '') return;

        // Overwrite text
        btn.el.innerHTML = btn.textDefault;
      });

    // Show error message
    state.elements.errorMsg.style.display = 'block';

    // Allow for new submmission
    state.sdk.isSubmitted = undefined;

    // Skip code below

    // Return
    const msg = `StudioForm[${state.sdk.i}] -> submit.ts -> default: Form submission not successful!`;
    return msg;
  }

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
    node.classList.add('sf-hide');
  });

  // Animate
  state.view.animate({
    ...options,
    currentSlideId: currentSlideId,
    isSubmit: true,
  });

  // Default return
  const msg = `StudioForm[${state.sdk.i}] -> submit.ts -> default: Form submission successful!`;
  return msg;
}
