// Imports
import * as helper from '../helper';
import * as model from '../../model';

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
  const fields: any[] = [];
  const payload = {
    name: form.getAttribute('data-name'),
    pageId: document.querySelector('html')?.getAttribute('data-wf-page'),
    elementId: form.getAttribute('data-wf-element-id'),
    source: location.href,
    // test: false,
    // dolphin: false,
  };

  // Find all fields
  state.sdk.slideRecord.forEach((id: number) => {
    // Values
    const slide = state.sdk.slideLogic[id];

    // Elements
    const inputs: HTMLInputElement[] = slide.el.querySelectorAll('input');

    // Loop
    inputs.forEach(input => {
      fields.push({
        key:
          input.getAttribute('data-name') ||
          input.getAttribute('name') ||
          input.getAttribute('id') ||
          input.getAttribute('class') ||
          input.getAttribute('type') ||
          input.tagName,
        value: input.value,
      });
    });
  });

  // Fields loop
  fields.forEach((field: { key: string; value: any }) => {
    payload[`fields[${field.key}]`] = field.value;
  });

  // * If form has specified action attribute *
  if (form.getAttribute('action') || '' !== '') {
    // Overwrite method & url
    method = (form.getAttribute('method') || '').toUpperCase();
    apiUrl = form.getAttribute('action') || '';
  }

  // * Make async call *

  // Iterate through the JSON object and add properties to formData
  const formData = new URLSearchParams();
  for (const key in payload) {
    formData.append(key, payload[key]);
  }

  // Create the options for the fetch request
  const options = {
    method: method,
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: formData.toString(),
  };

  // Await
  let res: any;
  try {
    // Call
    res = await helper.getJson(apiUrl, options);
  } catch (err) {
    console.error(
      `StudioForm[${state.sdk.i}] -> post.ts -> default -> await fetch(): `,
      err
    );
    res = err;
  }

  // Add to sdk
  state.sdk.data.endpoint = apiUrl;
  state.sdk.data.method = method;
  state.sdk.data.payload = payload;
  state.sdk.data.response = res;

  // Return
  return res;
}
