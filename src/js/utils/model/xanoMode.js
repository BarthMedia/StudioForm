// + Imports +
import * as config from '../../config.js';
import { jQueryToJs } from '../../helper.js';

// + Export functions +
export const init = function (stateData) {
  // Guard
  if (!stateData.xanoMode) return;

  // Elements
  const form = stateData.elements.$form;

  // Values
  const actionUrl = new URL(form.attr('action')),
    apiGroupBaseUrl = `${actionUrl.protocol}//${actionUrl.hostname}/${
      actionUrl.pathname.split('/')[1]
    }`,
    urlEndpoint = `/${actionUrl.pathname.split('/')[2]}`;

  // console.log(actionUrl);

  // Xano
  const xano = new XanoClient({
    apiGroupBaseUrl: apiGroupBaseUrl,
  });

  // Submit event listener
  form.submit(function (e) {
    e.preventDefault();

    // Elements & data
    const $form = $(this); // The submitted form
    const $submit = $('[type=submit]', $form); // Submit button of form
    const buttonText = $submit.val(); // Original button text
    const buttonWaitingText = $submit.attr('data-wait'); // Waiting button text value
    const formRedirect = $form.attr('data-redirect'); // Form redirect location

    const formData = getFormData($form); // Form data

    // Set waiting text
    if (buttonWaitingText) {
      $submit.val(buttonWaitingText);
    }

    // Append files if existend
    $form.find('input[type="file"]').each(function () {
      // Values & elements
      const $fileInput = $(this),
        filesList = $fileInput[0].files,
        name = $fileInput.attr('name');

      // Guard
      if (filesList.length < 1) return true;

      // Has multiple
      if ($fileInput.is('[multiple]')) {
        formData[name] = filesList;
      } else {
        formData[name] = filesList[0];
      }
    });

    // formData.append('section', 'general');
    // formData.append('action', 'previewImg');
    // console.log(formData);

    // Assume form method is post
    xano.post(urlEndpoint, formData).then(response => {
      if (stateData.devMode > 0) console.log(response);

      // Guard
      if (response.status !== 200)
        throw new Error(`Xano Status: ${response.status}`);

      // If form redirect setting set, then use this and prevent any other actions
      if (formRedirect) {
        window.location = formRedirect;
        return;
      }

      // Reset text
      $submit.val(buttonText);
    }),
      error => {
        $form
          .siblings('.w-form-done')
          .hide() // Hide success
          .siblings('.w-form-fail')
          .show(); // show failure;

        // Reset text
        $submit.val(buttonText);
      };
  });
};

//

//

//

//

//

//

//

//

//

//

//

//

//

//

//

//

//

//

//

//

//

//

//

//

// Check xano mode
export const isXanoMode = function (elements) {
  // Elements
  const form = elements.$form,
    formBlock = elements.$formBlock;

  // Check attribute
  if (['true', 'True'].includes(formBlock.attr(config.XANO_MODE_ATTRIBUTE)))
    return true;

  // Values
  let actionUrl;
  try {
    actionUrl = new URL(form.attr('action'));
  } catch {
    return false;
  }

  return actionUrl.hostname.includes('xano.io');
};

// + Helper +
function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}
