// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as model from '../../model';
import * as config from '../../config';
import dataForm from './dataForm';

// Helper
const errPath = (n: string) => `${controllerUtils.errorName(n)} post.ts:`;

// Export
export default async function (
  instance: StudioFormInstance,
  options: SFOFetch
) {
  // Values
  const formBlock = instance.elements.wrapper;
  const form = instance.elements.mask as HTMLFormElement;
  const formData = dataForm(instance, true);
  const isFiles = formData instanceof FormData;
  const action = form.getAttribute('action') || '';
  const hasAction = action !== '';

  // Guard
  if (formData === false) return false;

  // Variables
  let method = 'POST';
  let apiUrl: string | URL =
    'https://webflow.com/api/v1/form/' +
    document.querySelector('html')?.getAttribute(`data-wf-site`);

  // Custom method & url
  if (hasAction) {
    // Overwrite method & url
    const tmpMethod = (
      viewUtils.getAttribute('method', form, formBlock) ||
      form.getAttribute('method') ||
      ''
    ).toUpperCase();
    apiUrl = form.getAttribute('action') as string;

    // Logic
    if (['GET', 'PUT', 'POST', 'PATCH', 'DELETE'].includes(tmpMethod))
      method = tmpMethod;
  }

  // Morph into url
  try {
    apiUrl = new URL(apiUrl);
  } catch (error) {
    console.error(`${errPath}: Invalid action URL:`, error.message);
    return false;
  }

  console.log('Try / catch everything that can go wrong in here!');

  console.log('continue here! <3');

  console.log('Return all relevant fetch data after making call!');

  console.log(
    method,
    apiUrl,
    formData,
    "Don't forget to obscure and hide form data when presenting in output later!"
  );

  // Custom headers attributes
  const acceptAttr = viewUtils.getAttribute('accept', form, formBlock);
  const contentTypeAttr = viewUtils.getAttribute(
    'content-type',
    form,
    formBlock
  );

  console.log(
    'GO AHEAD AND MAKE SURE THAT YOU CAN MANIPULATE ALL OF THESE KEY VALUES THROUGHT THE FETCH CONFIG!'
  );
  console.log('MAKE LITERALLY EVERYTHING AVAILABLE!');

  // Define headers
  const headers = new Headers({
    Accept: acceptAttr || 'application/json, text/javascript, */*; q=0.01',
    'Content-Type':
      contentTypeAttr || 'application/x-www-form-urlencoded; charset=UTF-8',
  });

  // Custom headers || If accept header or content type specified on form
  const isCustomHeaders = acceptAttr || contentTypeAttr ? true : false;

  // Create the options for the fetch request
  const fetchOptions: {
    method: string;
    headers?: Headers;
    body?: FormData | string;
  } = {
    method: method,
    headers: headers,
    body: isFiles ? formData : formData.toString(),
  };
  if (isFiles && !isCustomHeaders) delete options.headers;

  console.log(
    ' request: { ...fetchOptions, body: (ONLY IF NOT GET REQUEST!) overwrite body with non-private data!, url: your URL , etc.! }'
  );
  console.log(' respone:', 'headers, result = false, status, error');

  console.log(
    'Make sure that Accept, url, content-type & method can be changed via ',
    'config.fetch!',
    'also redirect url!'
  );

  // + GET Request +
  if (method === 'GET') {
    // Update options
    if (!isCustomHeaders) delete options.headers;
    delete fetchOptions.body;

    // + Update url +
    formData.forEach((value: string | File, key: string) => {
      if (typeof value === 'string')
        (apiUrl as URL).searchParams.append(key, value);
    });
  }

  // Auth token
  const authToken = model.state.ghostInstances[instance.name].auth.token || '';
  if (authToken !== '') {
    fetchOptions.headers = fetchOptions.headers
      ? (fetchOptions.headers.append('Authorization', `Bearer ${authToken}`),
        fetchOptions.headers)
      : new Headers({
          Authorization: `Bearer ${authToken}`,
        });
  }

  console.log(
    'Congrats on pulling of the secure auth token!',
    'Now make sure you can customize the config and that the fetch works reliably in every usecase!'
  );

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
