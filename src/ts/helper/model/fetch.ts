// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as eventUtils from '../view/utilsEvents';
import * as model from '../../model';
import * as config from '../../config';
import dataForm from './dataForm';

// Helper
const errPath = (n: string) => `${controllerUtils.errorName(n)} fetch.ts:`;

// Export
export default async function (
  instance: StudioFormInstance,
  externalOptions: SFOFetch,
  internal = false
) {
  // Recaptcha
  const grecaptchaToken = await instance.recaptcha();
  if (grecaptchaToken) instance.hidden.recaptcha = grecaptchaToken;

  // @ts-ignore
  if (window.turnstile) {
    // @ts-ignore
    instance.hidden['cf-turnstile-response'] = turnstile.getResponse();
  }

  // Values
  // const formBlock = instance.elements.wrapper;
  // const form = instance.elements.mask as HTMLFormElement;
  const formData = externalOptions.formData || dataForm(instance, true);
  const isFiles = formData instanceof FormData;
  const fetchConfig = instance.config.fetch;
  const action = fetchConfig.action;
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
    const tmpMethod = fetchConfig.method.toUpperCase();
    apiUrl = action;

    // Logic
    if (['GET', 'PUT', 'POST', 'PATCH', 'DELETE'].includes(tmpMethod))
      method = tmpMethod;
  }

  // External options
  if (externalOptions.url) apiUrl = externalOptions.url;
  if (externalOptions.method) method = externalOptions.method;

  // Morph into url
  try {
    apiUrl = new URL(apiUrl);
  } catch (error) {
    console.error(
      `${errPath(instance.name)}: Action URL invalid:`,
      error.message
    );
    return false;
  }

  // Custom headers attributes
  const acceptStr = externalOptions.accept || fetchConfig.accept;
  const contentTypeStr = externalOptions.contentType || fetchConfig.contentType;

  // Define headers
  const headers =
    externalOptions.headers ||
    new Headers({
      Accept:
        acceptStr === ''
          ? 'application/json, text/javascript, */*; q=0.01'
          : acceptStr,
      'Content-Type':
        contentTypeStr === ''
          ? 'application/x-www-form-urlencoded; charset=UTF-8'
          : contentTypeStr,
    });

  // Custom headers || If accept header or content type specified on form
  const isCustomHeaders =
    externalOptions.headers !== undefined ||
    acceptStr !== '' ||
    contentTypeStr !== '';

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
  if (isFiles && !isCustomHeaders) delete fetchOptions.headers;

  // + GET Request +
  if (method === 'GET') {
    // Update options
    if (!isCustomHeaders) delete fetchOptions.headers;
    delete fetchOptions.body;

    // + Update url +
    formData.forEach((value: string | File, key: string) => {
      if (typeof value === 'string')
        (apiUrl as URL).searchParams.append(key, value);
    });
  }

  // Auth token
  const authToken =
    externalOptions.authorization ||
    utils.returnGhost(instance).auth.token ||
    '';
  fetchOptions.headers = fetchOptions.headers || new Headers();

  // Set if
  if (authToken !== '') {
    fetchOptions.headers.append('Authorization', `Bearer ${authToken}`);
  }

  // Await
  const publicFormData = instance.data.form;
  const publicFormParams = instance.data.params as URLSearchParams;
  const url = apiUrl.toString();

  // + Redirect url +
  let redirect: undefined | string = undefined;
  if (fetchConfig.redirect !== '') {
    try {
      // Format attribute value
      const attrVal = fetchConfig.redirect;
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
      let redirectUrl = new URL(attrPrefix + attrVal);

      // * Add params to redirectUrl if wanted *
      if (instance.config.modes.fieldParamsRedirect) {
        // Step 2: Create a new redirectUrlSearchParams object from the existing redirectUrl's search parameters
        const existingSearchParams = redirectUrl.searchParams;

        // Step 3: Append the new key-value pairs from the JSON to the URLSearchParams object
        publicFormParams.forEach((value, key) => {
          existingSearchParams.append(key, value);
        });

        // Step 4: Update the URL's search with the modified URLSearchParams object
        redirectUrl.search = existingSearchParams.toString();
      }

      // Overwrite redirect
      redirect = redirectUrl.toString();
    } catch (err) {
      console.error(`${errPath(instance.name)} Create redirect url: `, err);
    }
  }

  // Output preperation
  const output: SFFetchData = {
    redirect: redirect,
    request: {
      url: url.split('?')[0],
      method: method,
      headers: new Headers(fetchOptions.headers),
      body:
        method === 'GET'
          ? undefined
          : isFiles
          ? (publicFormData as FormData)
          : publicFormData.toString(),
      params: method !== 'GET' ? undefined : publicFormParams,
    },
  };

  // Check if 'Authorization' header exists in the headers
  if (output?.request?.headers?.has('Authorization')) {
    output.request.headers.set('Authorization', config.HIDDEN);
  }

  // Try / catch
  try {
    // Fetch operation
    const response = (await Promise.race([
      fetch(url, fetchOptions),
      utils.timeout(fetchConfig.timeout),
    ])) as Response;

    // Values
    const headers = new Headers(response.headers);
    const contentType = response.headers.get('Content-Type');
    const contentTypeSwitch = contentType?.toLowerCase();
    let result: unknown;

    // Guard
    if (!contentTypeSwitch) throw new Error(`Couldn't find "Content-Type"`);

    // Logic
    switch (true) {
      case contentTypeSwitch.indexOf('json') > -1:
        result = await response.json();
        break;
      case contentTypeSwitch.indexOf('text') > -1:
        result = await response.text();
        break;
      case contentTypeSwitch.indexOf('form') > -1:
        result = await response.formData();
        break;
      default:
        result = await response.blob();
    }

    // Successful fetch
    output.response = {
      ok: response.ok,
      headers: headers,
      contentType: contentType as string,
      result: result,
      status: response.status,
    };

    // If error
    if (!response.ok)
      output.response.error = {
        message: result?.['message'] ?? 'An error occurred during the fetch.',
        code: result?.['code'] ?? response.status,
        details: result?.['payload'] ?? null,
      };
  } catch (error) {
    // Handle fetch or parsing errors
    output.response = {
      ok: false,
      headers: new Headers(),
      result: false,
      status: 0,
      error: {
        message: 'An error occurred during fetch or parsing',
        code: 'FETCH_ERROR',
        details: error,
      },
    };
  }

  // Add to api
  const sfApi = utils.returnGhost(instance).fetchData;
  sfApi.redirect = redirect;
  sfApi.request = output.request;
  sfApi.response = output.response;

  // External api event
  if (!internal) eventUtils.dispatchEvent(instance, 'fetched-api');

  // Return
  return true;
}
