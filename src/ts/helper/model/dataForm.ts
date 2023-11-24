// Imports
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
  const hidden = model.state.ghostInstances[instance.name].hiddenData;

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
      const key =
        viewUtils.getAttributeOr(
          input,
          'data-name',
          'name',
          'id',
          'class',
          'type'
        ) || input.tagName;
      const value =
        input.type !== 'file'
          ? input.type === 'password' && internal
            ? config.HIDDEN
            : input.value
          : input.files;

      // Radio edgecase
      if (
        input.type === 'radio' &&
        !input.hasAttribute(`${config.PRODUCT_NAME_SHORT}-selected`)
      )
        return;

      // Logic
      if (value) addVals(key, value);
    });
  });

  // Define helper
  function addVals(key: string, value: string | FileList | File) {
    // Logic
    if (typeof key === 'string') {
      fields.push({
        key: key,
        value: value as string,
      });
    } else {
      // Values
      const isFile = value instanceof File;

      // Loop
      for (let i = 0, n = isFile ? 1 : value.length; i < n; i++) {
        // Push
        files.push({
          key: `${key}${complex ? '][' : ''}${complex ? i : ''}`,
          value: (isFile ? value : value[i]) as File,
        });
      }
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
