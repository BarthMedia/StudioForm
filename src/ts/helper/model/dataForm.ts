// Imports
import * as utils from './utils';
import * as viewUtils from '../view/utils';
import * as config from '../../config';
import * as model from '../../model';

// Export
export default function (
  instance: StudioFormInstance,
  internal = false,
  generateUrlSearchParams = false,
  instanceDataMainInvocation = false,
  instanceDataMainInvocationSlideIndex: null | number = null
) {
  // Elements
  const form = (
    instance.elements.mask.tagName === 'FORM' ? instance.elements.mask : null
  ) as HTMLInputElement | null;
  const modes = instance.config.modes;
  const fetchConfig = instance.config.fetch;
  const ghost = utils.returnGhost(instance);
  const hidden = ghost.hiddenData;

  // Guard
  if (!form) return false;

  // Values
  const fields: { key: string; value: string }[] = [];
  let files: { key: string; value: File | string }[] = [];

  // Data mode
  let complex = fetchConfig.action == '' || !modes.simpleData;
  if (generateUrlSearchParams || instanceDataMainInvocation) complex = false;
  let isWfFileUpload = false;

  // Define payload
  const wfFlow = form.getAttribute('data-wf-flow');
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
          { key: 'wfFlow', value: wfFlow },
        ]
      : []
  ) as { key: string; value: string | File }[];

  // Wf flow edge case
  if (!wfFlow) payload.pop();

  // * Loop *

  // Find all fields
  instance.logic.forEach(slide => {
    // instanceDataMainInvocationSlideIndex Guard
    if (
      instanceDataMainInvocationSlideIndex !== null &&
      slide.index !== instanceDataMainInvocationSlideIndex
    )
      return;

    // Guard
    if (
      !instanceDataMainInvocation &&
      modes.partialData &&
      !instance.record.includes(slide.index)
    )
      return;

    // Elements
    const inputs = slide.element.querySelectorAll(
      viewUtils.INPUTS_SELECTOR
    ) as NodeListOf<HTMLInputElement>;

    // Loop
    inputs.forEach(input => {
      // Values
      const key = viewUtils.getInputKey(input);
      let value =
        input.type !== 'file'
          ? input.type === 'password' && !internal
            ? config.HIDDEN
            : input.value
          : input;

      // Radio edgecase
      if (input.type === 'radio' && !input.checked) return;

      // Checkbox edgecase
      if (
        (instanceDataMainInvocation || modes.booleanCheckboxValues) &&
        input.type === 'checkbox'
      ) {
        if (value == 'on') value = 'true';
        if (value == 'off') value = 'false';
      }

      // Logic
      addVals(key, value);
    });
  });

  // Define helper
  function addVals(key: string, value: string | HTMLInputElement | File) {
    // Logic
    if (typeof value == 'string') {
      if (value !== '')
        fields.push({
          key: key,
          value: value,
        });
    } else {
      // HTML Values
      const valueIsFile = value instanceof File;
      let htmlValue: FileList | File | String | null = valueIsFile
        ? value
        : null;
      if (!valueIsFile) {
        // Standard input element
        const filesValue = value.files;
        htmlValue = !value.multiple && filesValue ? filesValue[0] : filesValue;

        // WF input element
        if (value.classList.contains(config.WF_CLASS_FILE_UPLOAD_INPUT)) {
          isWfFileUpload = true;
          htmlValue = value.getAttribute('data-value');
        }
      }

      // Values
      const ghostFile = ghost.files[key];
      const fileValue = ghostFile && !isWfFileUpload ? ghostFile : htmlValue;
      const isFileList = fileValue instanceof FileList;

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
          value: isNull ? fileValue : fileValue![index],
        });
      }

      // Single file
      if (!isFileList) push(null);
      else {
        for (let index = 0; index < fileValue.length; index++) {
          push(index);
        }
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
  const formData =
    isFiles && !isWfFileUpload ? new FormData() : new URLSearchParams();

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
    { name: 'fileUploads', data: files },
  ].forEach(obj => {
    // Loop
    obj.data.forEach((datum: { key: string; value: string | File }) => {
      // Values
      const complexKey = `${obj.name}[${datum.key}]`;

      // Logic
      if (!complex || isUniqueKey(datum.key))
        payload.push(complex ? { key: complexKey, value: datum.value } : datum);
      // Complex = true & key not unquite case
      else if (obj.name == 'fields') {
        // Values
        const index = payload.findIndex(obj => obj.key == complexKey);
        const object = payload[index];

        // Set
        object.value = object.value + fetchConfig.valueSeparator + datum.value;
      }
    });
  });

  // @ts-ignore
  payload.forEach(item => formData.append(item.key, item.value));

  // Expose to api & handle change requests
  return formData;
}
