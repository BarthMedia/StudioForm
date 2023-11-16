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
  externalOptions: SFOFetch,
  internal = false
) {
  console.log('BUILD OUT FETCH CONFIG PROPERLY!', 'REALLY IMPORTANT TO-DO!');
  console.log('Also fully respect external options', externalOptions);

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

  // Custom headers attributes
  const acceptAttr = viewUtils.getAttribute('accept', form, formBlock);
  const contentTypeAttr = viewUtils.getAttribute(
    'content-type',
    form,
    formBlock
  );

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
  const authToken = model.state.ghostInstances[instance.name].auth.token || '';
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
    const response = await Promise.race([
      fetch(url, fetchOptions),
      utils.timeout(
        parseInt(
          viewUtils.getAttribute('timeout', form, formBlock) ||
            config.TIMEOUT_SEC.toString()
        )
      ),
    ]);

    if (response instanceof Response) {
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
    } else throw new Error('Invalid response');
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
  const sfApi = model.state.ghostInstances[instance.name].fetchData;
  sfApi.redirect = output.redirect;
  sfApi.request = output.request;
  sfApi.response = output.response;

  // External / internal
  if (!internal)
    console.log(
      'Fire fetched-external event!',
      'make it easy for first registered event listener to delete response out of api'
    );

  // Return
  return true;
}
