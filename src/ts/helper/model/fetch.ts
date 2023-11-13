// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as model from '../../model';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${controllerUtils.errorName(s)}post.ts -> default`;
export default async function (stateId: number) {
  console.log(
    'if slide record .length 0 throw error, if slide record 1, approach single form format,'
  );
  console.log(
    'slide record .legnt >= 2 then push form data in FinSweet format to wized!'
  );

  // Values
  const state = model.state[stateId];
  const form: HTMLFormElement = state.elements.mask;
  let method = 'POST';
  let apiUrl =
    'https://webflow.com/api/v1/form/' +
    document.querySelector('html')?.getAttribute(`data-wf-site`);

  // * Find all data and store in object for post request *

  // Define payload
  const fields: { key: string; value: string }[] = [];
  const files: { key: string; value: File }[] = [];
  let payload: any = {
    name: form.getAttribute(`data-name`),
    pageId: document.querySelector('html')?.getAttribute(`data-wf-page`),
    elementId: form.getAttribute(`data-wf-element-id`),
    source: location.href,
    // test: false,
    // dolphin: false,
  };

  // * JotForm mode *
  let jotFormMode = false;
  if (
    state.modes.isJotFrom ||
    (form.getAttribute('action') || '').indexOf('jotform.com/submit') > -1
  ) {
    // Update
    jotFormMode = true;
    payload = [];
  }

  // * Make async call *

  // Find all fields
  state.sdk.slideRecord.forEach((id: number) => {
    // Values
    const slide = state.sdk.slideLogic[id];

    // Elements
    const inputs: HTMLInputElement[] = slide.el.querySelectorAll(
      viewUtils.INPUTS_SELECTOR
    );

    // Loop
    inputs.forEach(input => {
      // Values
      const key =
        input.getAttribute(`data-name`) ||
        input.getAttribute('name') ||
        input.getAttribute('id') ||
        input.getAttribute('class') ||
        input.getAttribute('type') ||
        input.tagName;

      // Radio edgecase
      if (
        input.type === 'radio' &&
        !input.hasAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}selected`)
      )
        return;

      // Logic
      if (input.type !== 'file') {
        if (!jotFormMode || input.value !== '')
          fields.push({
            key: key,
            value: input.value,
          });
      } else {
        if (input.files) {
          for (let i = 0, n = input.files.length; i < n; i++) {
            files.push({
              key: `${key}${!jotFormMode ? '][' : ''}${!jotFormMode ? i : ''}`,
              value: input.files[i],
            });
          }
        }
      }
    });
  });

  // Fields loop
  const isFiles = files.length > 0;
  fields.forEach((field: { key: string; value: any }) => {
    if (!jotFormMode) payload[`fields[${field.key}]`] = field.value;
    else payload.push(field);
  });
  files.forEach(file => {
    if (!jotFormMode) payload[`files[${file.key}]`] = file.value;
    else payload.push(file);
  });

  // Iterate through the JSON object and add properties to formData
  const formData = isFiles ? new FormData() : new URLSearchParams();
  if (!jotFormMode)
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
  else
    payload.forEach((item: { key: string; value: any }) =>
      formData.append(item.key, item.value)
    );

  // * If form has specified action attribute *
  if (form.getAttribute('action') || '' !== '') {
    // Overwrite method & url
    method = (form.getAttribute('method') || '').toUpperCase();
    apiUrl = form.getAttribute('action') || '';

    // If data-method attribute specified
    const dataMethod: string = (
      form.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}method`) ||
      state.elements.wrapper.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}method`
      ) ||
      ''
    ).toUpperCase();
    if (['GET', 'PUT', 'POST', 'PATCH', 'DELETE'].includes(dataMethod))
      method = dataMethod;
  }

  // Define headers
  const headers = {
    Accept:
      form.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}headers-accept`) ||
      'application/json, text/javascript, */*; q=0.01',
    'Content-Type':
      form.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}headers-content-type`
      ) || 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  // Custom headers || If accept header or content type specified on form
  const isCustomHeaders =
    form.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}headers-accept`) ||
    form.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}headers-content-type`)
      ? true
      : false;

  // Create the options for the fetch request
  const options: { method: string; headers?: any; body: any } = {
    method: method,
    headers: headers,
    body: isFiles ? formData : formData.toString(),
  };
  if (isFiles && !isCustomHeaders) delete options.headers;

  // + GET Request +
  if (method === 'GET') {
    // Update options
    if (!isCustomHeaders) delete options.headers;
    delete options.body;

    // + Update url +

    // Step 1: Create url
    const url = new URL(apiUrl);

    // Step 2: Create a new URLSearchParams object from the existing URL's search parameters
    const existingSearchParams = url.searchParams;

    // Step 3: Append the new key-value pairs from the JSON to the URLSearchParams object
    for (const field of fields) {
      existingSearchParams.append(field.key, field.value);
    }

    // Step 4: Update the URL's search with the modified URLSearchParams object
    url.search = existingSearchParams.toString();
    apiUrl = url.href;
  }

  // Auth token
  const authToken =
    form.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}auth-token`) || '';
  if (authToken !== '') {
    options.headers = options.headers
      ? { ...options.headers, Authorization: `Bearer ${authToken}` }
      : { Authorization: `Bearer ${authToken}` };
  }

  // Await
  let res: any;
  let status = 'done';
  try {
    // Call
    res = await helper.getJson(
      apiUrl,
      options,
      parseInt(
        state.elements.wrapper.getAttribute(
          `${config.CUSTOM_ATTRIBUTE_PREFIX}timeout`
        ) || config.TIMEOUT_SEC.toString()
      )
    );
  } catch (err) {
    console.error(`${errPath(state)} -> await fetch(): `, err);
    status = 'fail';
    res = err;
  }

  // + Redirect url +
  let redirect: undefined | string = undefined;
  if (form.getAttribute('redirect') || '' !== '') {
    try {
      // Format attribute value
      const attrVal = form.getAttribute('redirect') || '';
      let attrPrefix = '';

      // Check if the "redirect" attribute value contains a protocol (e.g., 'http' or 'https')
      if (!/^(https?:\/\/)/i.test(attrVal)) {
        // Domain or path --> url
        attrPrefix =
          location.protocol +
          '//' +
          (attrVal.startsWith('/') ? location.hostname : '');
      }

      // Values
      let url = new URL(attrPrefix + attrVal);

      // * Add params to url if wanted *
      if (state.modes.fieldParamsRedirect) {
        // Step 2: Create a new URLSearchParams object from the existing URL's search parameters
        const existingSearchParams = url.searchParams;

        // Step 3: Append the new key-value pairs from the JSON to the URLSearchParams object
        for (const field of fields) {
          existingSearchParams.append(field.key, field.value);
        }

        // Step 4: Update the URL's search with the modified URLSearchParams object
        url.search = existingSearchParams.toString();
      }

      // Overwrite redirect
      redirect = url.href;
    } catch (err) {
      console.error(
        `${errPath(state)} -> try { ... redirect url ... } catch: `,
        err
      );
    }
  }

  // Add to sdk
  state.sdk.data.endpoint = apiUrl;
  state.sdk.data.options = options;
  state.sdk.data.method = method;
  state.sdk.data.payload = payload;
  state.sdk.data.response = res;
  state.sdk.data.status = status;
  state.sdk.data.redirect = redirect;

  // Return
  return res;
}
