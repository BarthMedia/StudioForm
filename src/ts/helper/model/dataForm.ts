// Imports
import * as utils from './utils';
import * as viewUtils from '../view/utils';
import * as config from '../../config';
import * as model from '../../model';

// Export
export default function (
  instance: StudioFormInstance,
  internal = false,
  generateUrlSearchParams = false
) {
  // Elements
  const form = (
    instance.elements.mask.tagName === 'FORM' ? instance.elements.mask : null
  ) as HTMLInputElement | null;
  const modes = instance.config.modes;
  const ghost = utils.returnGhost(instance);
  const hidden = ghost.hiddenData;

  // Guard
  if (!form) return false;

  // Values
  const fields: { key: string; value: string }[] = [];
  let files: { key: string; value: File }[] = [];

  // Data mode
  let complex = (form.getAttribute('action') || '') === '' || !modes.simpleData;
  if (generateUrlSearchParams) complex = false;

  // Define payload
  const payload = (
    complex
      ? [
          { key: 'name', value: form.getAttribute('data-name') || '' },
          {
            key: 'pageId',
            value:
              document.querySelector('html')?.getAttribute('data-wf-page') ||
              '',
          },
          {
            key: 'elementId',
            value: form.getAttribute('data-wf-element-id') || '',
          },
          { key: 'source', value: location.href },
        ]
      : []
  ) as { key: string; value: string | File }[];

  // * Loop *

  // Find all fields
  instance.logic.forEach(slide => {
    // Guard
    if (modes.partialData && !instance.record.includes(slide.index)) return;

    // Elements
    const inputs = slide.element.querySelectorAll(
      viewUtils.INPUTS_SELECTOR
    ) as NodeListOf<HTMLInputElement>;

    // Loop
    inputs.forEach(input => {
      // Values
      const key = viewUtils.getInputKey(input);
      const value =
        input.type !== 'file'
          ? input.type === 'password' && !internal
            ? config.HIDDEN
            : input.value
          : false;

      // Radio edgecase
      if (
        input.type === 'radio' &&
        !input.hasAttribute(`${config.PRODUCT_NAME_SHORT}-checked`)
      )
        return;

      // Logic
      addVals(key, value);
    });
  });

  // Define helper
  function addVals(key: string, value: string | false | File) {
    // Logic
    if (typeof value === 'string') {
      if (value !== '')
        fields.push({
          key: key,
          value: value,
        });
    } else {
      // Values
      const fileValue = value ? value : ghost.files[key];
      const isFile = fileValue instanceof File;

      console.log('Fix File selector edge case with non label files');

      // Guard
      if (!fileValue) return;

      // Define
      function push(index: number | null, _key = key) {
        // Values
        const isNull = index === null;
        const key = !complex ? _key : `${_key}${!isNull ? '][' + index : ''}`;

        // Push
        files.push({
          key: key,
          value: isNull ? fileValue : fileValue[index],
        });
      }

      // Single file
      if (isFile) push(null);
      else fileValue.forEach((_, index) => push(index));
    }
  }

  // Hidden
  if (!generateUrlSearchParams)
    Object.keys(hidden).forEach(key => {
      // Values
      const value = (internal ? hidden[key] : config.HIDDEN) as string | File;

      // Logic
      addVals(key, value);
    });

  // * URL param data *
  if (generateUrlSearchParams) files = [];

  // * Create data *

  // Values
  const isFiles = files.length > 0;
  const formData = isFiles ? new FormData() : new URLSearchParams();

  // Create a Set to keep track of unique keys
  const uniqueKeys = new Set();

  // Check if the key is not already in the Set
  function isUniqueKey(key: string) {
    if (!uniqueKeys.has(key)) {
      uniqueKeys.add(key);
      return true;
    }

    // Return
    return false;
  }

  // Prepare
  [
    { name: 'fields', data: fields },
    { name: 'files', data: files },
  ].forEach(obj => {
    // Loop
    obj.data.forEach((datum: { key: string; value: string | File }) => {
      if (!complex || isUniqueKey(datum.key))
        payload.push(
          complex
            ? { key: `${obj.name}[${datum.key}]`, value: datum.value }
            : datum
        );
    });
  });

  // @ts-ignore
  payload.forEach(item => formData.append(item.key, item.value));

  // Expose to api & handle change requests
  return formData;
}
