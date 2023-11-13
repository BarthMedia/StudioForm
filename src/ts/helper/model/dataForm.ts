// Imports
import * as viewUtils from '../view/utils';
import * as config from '../../config';
import * as model from '../../model';

// Export
export default function (instance: StudioFormInstance, internal = false) {
  // Elements
  const form = (
    instance.elements.mask.tagName === 'FORM' ? instance.elements.mask : null
  ) as HTMLInputElement | null;
  const modes = instance.config.modes;
  const hidden = model.state.ghostInstances[instance.name].hiddenData;

  // Guard
  if (!form) return false;

  // // + Helper +

  // // Attribute
  // function getAttribute(str: string, bool = true) {
  //   console.log(
  //     'Get most recent model version',
  //     'Reference most recent slide old / slide next!',
  //     'instanceName not needed i believe!'
  //   );

  //   // Values
  //   let val = viewUtils.getAttribute(str, mask, wrapper);

  //   // Fallback
  //   val = !val ? bool.toString() : val;

  //   // Return
  //   return val === 'true';
  // }

  // getAttribute('test');

  // // Object
  // const obj = {};

  /**
   *
   *
   *
   *
   *
   */

  // Define payload
  const fields: { key: string; value: string }[] = [];
  const files: { key: string; value: File }[] = [];
  const xWwwPayload = {
    name: form.getAttribute('data-name'),
    pageId: document.querySelector('html')?.getAttribute('data-wf-page'),
    elementId: form.getAttribute('data-wf-element-id'),
    source: location.href,
  };

  console.log(hidden, '<!--- HIDDEN DATA');

  // Data mode
  const complex =
    (form.getAttribute('action') || '') === '' || !modes.simpleData;

  // * Loop *

  // Find all fields
  instance.logic.forEach(slide => {
    // Guard
    if (modes.partialData && !instance.record.includes(slide.index)) return;

    console.log(slide);
  });

  // Find all fields
  instance.record.forEach(id => {
    // Values
    const slide = instance.logic[id];

    // Elements
    const inputs: NodeListOf<HTMLInputElement> = slide.element.querySelectorAll(
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

  /**
   *
   *
   *
   *
   *
   *
   */

  // Expose to api & handle change requests
  return obj;
}
