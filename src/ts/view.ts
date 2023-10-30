// Imports
import listener from './helper/view/listener';
import animate from './helper/view/animate';
import * as helper from './helper/helper';
import * as config from './config';
import animateProgress from './helper/view/animateProgress';
import anchor from './helper/view/scrollTo';
import required from './helper/view/required';
import sfActive from './helper/view/sfActive';
import elements from './helper/view/elements';

// Ultimate string creator
function createSelector(instanceName: string | null, ...strings: string[]) {
  // Values
  let val = '';

  // Loop
  strings.forEach((str, i) => {
    // Values
    const base = [
      `[${config.PRODUCT_NAME_LONG}="${str}"]`,
      `[${config.PRODUCT_NAME_SHORT}="${str}"]`,
    ];

    // Logic
    if (!instanceName) {
      val += base.join(',') + (i < strings.length - 1 ? ',' : '');
      return;
    }
  });

  // // Create
  // let val = strArr
  //   .map(str => {
  //     const tmpVal = `[${config.PRODUCT_NAME}="${str}"]`;
  //     return isDomWide
  //       ? `[${config.CUSTOM_ATTRIBUTE_PREFIX}${config.PRODUCT_NAME_CLASS_PREFIX}id="${state.sdk.i}"] ` +
  //           tmpVal +
  //           `,[${config.PRODUCT_NAME}-${state.sdk.i}="${str}"]`
  //       : tmpVal;
  //   })
  //   .join(',');

  // Return
  return val;
}

// Export
const errPath = `${config.PRODUCT_NAME_CAMEL_CASE} -> view.ts:`;
export default function init(state: StudioFormState) {
  // Elements loop
  document
    .querySelectorAll(createSelector(null, 'wrapper', 'mask'))
    .forEach(el => {
      // Logical elements
      const wrapper = (
        el.tagName === 'FORM' ? el.parentElement : el
      ) as HTMLElement;
      const mask = (wrapper.querySelector('form') ||
        wrapper.querySelector('*')) as HTMLElement | null;

      // Simple guard
      if (!mask) {
        console.warn(`${errPath} Couldn't find mask!`, wrapper);
        return;
      }

      // Already active guard
      if (mask.hasAttribute(`${config.PRODUCT_NAME_SHORT}-name`)) return;

      // Instance name
      let instanceName =
        mask.getAttribute(`wized`) ||
        mask.getAttribute(`data-name`) ||
        mask.getAttribute('name') ||
        mask.getAttribute('id') ||
        mask.getAttribute('class') ||
        mask.tagName;

      // Unique name loop
      Object.keys(state.api).forEach(str => {
        // Skip
        if (str !== instanceName) return;

        // Split logic
        const split = str.split('-');
        const int = parseInt(split.pop() || '');

        // Skip if NaN
        if (isNaN(int)) {
          instanceName = str + '-2';
          return;
        }

        // Else
        instanceName = split.join('') + '-' + (int + 1);
      });

      // Initiate config
      state.initModes(instanceName, wrapper, mask);

      // Generate elements
      // const els = elements(wrapper, mask, state);

      // Add new instance to state
      state.api[instanceName] = {
        undefined: undefined,
        name: instanceName,
        index: Math.random() * 8,
      };

      // CONTINUE HERE!

      // Elements

      // Log
      console.log(instanceName, el, wrapper);
    });

  // Return elements
  // elements(state);

  console.log(state);

  // // Generate step logic
  // state.model.generateSlideLogic();

  // // Init sf active functionality
  // sfActive(state);

  // // Calculate initial progress
  // state.view.progress = function (options: Options = {}) {
  //   animateProgress(state.sdk.i, options);
  // };
  // state.view.progress();

  // // Animate anchor
  // state.sdk.scrollTo = function (options: Options = {}) {
  //   anchor(state.sdk.i, options);
  // };

  // // * Set animate available *

  // // Add events infrastrucutre
  // const eventFunctionArrays = state.view.eventsFunctionArrays;
  // helper.addEventsInfrastrucutre(state, 'Animate');

  // // State view
  // state.view.animate = function (options: Options = {}) {
  //   helper.triggerAllFunctions(eventFunctionArrays.onAnimate);
  //   animate(state.sdk.i, options);
  // };

  // // Render error endpoint
  // helper.addEventsInfrastrucutre(state, 'RenderRequirements');
  // state.view.renderRequirements = function (data = []) {
  //   helper.triggerAllFunctions(eventFunctionArrays.onRenderRequirements);
  //   required(state.sdk.i, data);
  // };

  // // * Init initial style *

  // // Steps
  // state.sdk.slideLogic.forEach((slide: any) => {
  //   slide.el.style.display = 'none';
  // });
  // state.sdk.slideLogic[0].el.style.display = '';

  // // * Init event listeners *
  // listener(state);
}
