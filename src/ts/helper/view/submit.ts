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

  // Update model
  state.sdk.isSubmitted = true;

  // Set all submit buttons to data-wait
  const currentButtons = state.sdk.slideLogic[currentSlideId].btns;
  if (currentButtons)
    currentButtons.forEach((btn: any) => {
      // Guard
      if ((btn.el.getAttribute('data-wait') || '') === '') return;

      // Set data default
      btn.textDefault = btn.el.innerText;

      // Overwrite text
      btn.el.innerHTML = btn.el.getAttribute('data-wait');

      console.log(btn.textDefault, btn.el.getAttribute('data-wait'));
    });

  // Await
  const res: JSON = await state.model.post();

  // Print to form elements
  state.elements.responseData.forEach((el: HTMLElement) => {
    el.style.whiteSpace = 'pre-wrap';
    el.innerHTML = JSON.stringify(res, null, 2);
  });

  console.log(res, ' <---- add responseData to sdk');

  // If status !== 200 make revert to text Default and allow submissions again

  // Fire post request
  console.log(
    '- state.model.post(stateId -- gather data from all steps without deleting any --- allows for resuablity)'
  );

  // Make other small form to studio form as well. StudioForm === Webflow Forms
  // Ano one normal form -- learn to perfectly immitate

  // Figure out webflow submit url maybe --- or don't -- probably data not exaccesable
  // Oh boy. Yes indeed you can. With data-wf-site on the html tag

  // Post
  // https://webflow.com/api/v1/form/628dde3ef202a7571db2ff6e
  // 628dde3ef202a7571db2ff6e

  // Simply stringify the response and put it into the success / failure message
  // And also the sdk

  // Find all submit buttons
  console.log('Find all submit buttons and apply data-wait if applicable');

  // On the other request. Format DATA exactly the way webflow would do!
  // Properly track what was clicked and what not

  console.log(
    "Add 'sf-hide' to all elements that are not the success message. Depending on the success of the response message - if error, remove all sf-hide classes and display the error message and make  submission possible again"
  );
  console.log('Await response before you submit. Make it webflow like');

  // Log
  console.log(
    '// Activate Xano mode everytime an action url is set -- do not fire when xano is turned off via attributes'
  );
}
