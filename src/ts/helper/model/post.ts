// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default async function (stateId: number) {
  // Values
  const state = model.state[stateId];
  const form: HTMLFormElement = state.elements.mask;
  let method = 'POST';
  let apiUrl =
    'https://webflow.com/api/v1/form/' +
    document.querySelector('html')?.getAttribute('data-wf-site');

  // Guard
  if (!helper.isElement(form))
    throw new Error(
      `StudioForm[${state.sdk.i}] -> post.ts -> default: Couldn't find form!`
    );

  // * Find all data and store in object for post request *

  // Define payload
  const fields: { key: string; value: string }[] = [];
  const files: { key: string; value: File }[] = [];
  const payload = {
    name: form.getAttribute('data-name'),
    pageId: document.querySelector('html')?.getAttribute('data-wf-page'),
    elementId: form.getAttribute('data-wf-element-id'),
    source: location.href,
    // test: false,
    // dolphin: false,
  };

  // * Make async call *

  // Find all fields
  state.sdk.slideRecord.forEach((id: number) => {
    // Values
    const slide = state.sdk.slideLogic[id];

    // Elements
    const inputs: HTMLInputElement[] = slide.el.querySelectorAll('input');

    // Loop
    inputs.forEach(input => {
      // Values
      const key =
        input.getAttribute('data-name') ||
        input.getAttribute('name') ||
        input.getAttribute('id') ||
        input.getAttribute('class') ||
        input.getAttribute('type') ||
        input.tagName;

      // Logic
      if (input.type !== 'file')
        fields.push({
          key: key,
          value: input.value,
        });
      else {
        if (input.files) {
          for (let i = 0, n = input.files.length; i < n; i++) {
            console.log('file: ', input.files[i]);
            files.push({ key: `${key}][${i}`, value: input.files[i] });
          }
        }
      }
    });
  });

  // Fields loop
  const isFiles = files.length > 0;
  fields.forEach((field: { key: string; value: any }) => {
    payload[`fields[${field.key}]`] = field.value;
  });
  files.forEach(file => {
    payload[`files[${file.key}]`] = file.value;
  });

  // Iterate through the JSON object and add properties to formData
  const formData = isFiles ? new FormData() : new URLSearchParams();
  for (const key in payload) {
    formData.append(key, payload[key]);
  }

  // * If form has specified action attribute *
  if (form.getAttribute('action') || '' !== '') {
    // Overwrite method & url
    method = (form.getAttribute('method') || '').toUpperCase();
    apiUrl = form.getAttribute('action') || '';
  }

  // Create the options for the fetch request
  const options: any = {
    method: method,
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: isFiles ? formData : formData.toString(),
  };
  if (isFiles) delete options.headers;

  // Await
  let res: any;
  let status = 'done';
  try {
    // Call
    res = await helper.getJson(
      apiUrl,
      options,
      parseInt(
        state.elements.wrapper.getAttribute('data-form-submit-timeout-sec') ||
          config.TIMEOUT_SEC.toString()
      )
    );
  } catch (err) {
    console.error(
      `StudioForm[${state.sdk.i}] -> post.ts -> default -> await fetch(): `,
      err
    );
    status = 'fail';
    res = err;
  }

  // Add to sdk
  state.sdk.data.endpoint = apiUrl;
  state.sdk.data.options = options;
  state.sdk.data.method = method;
  state.sdk.data.payload = payload;
  state.sdk.data.response = res;
  state.sdk.data.status = status;

  // Return
  return res;
}
