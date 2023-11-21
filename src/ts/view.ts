// + Imports +

// General
import * as utils from './helper/view/utils';
import * as config from './config';

// View
import listener from './helper/view/listeners';
import animate from './helper/view/animateTransition';
import animateProgress from './helper/view/animateProgress';
import anchor from './helper/view/scrollTo';
import required from './helper/view/reportValidity';
import animateCurrent from './helper/view/animateCurrent';
import elements from './helper/view/elements';

// Error path
const errPath = `${config.PRODUCT_NAME_CAMEL_CASE} -> view.ts:`;

// + Export +
export default function init(state: StudioFormState) {
  // Elements loop
  document
    .querySelectorAll(utils.createSelector(null, 'wrapper', 'mask'))
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
      const sfNameAttr = `${config.PRODUCT_NAME_SHORT}-id`;
      if (wrapper.hasAttribute(sfNameAttr)) return;

      // Instance name
      let instanceName = (
        mask.getAttribute(`data-name`) ||
        mask.getAttribute('name') ||
        mask.getAttribute('id') ||
        mask.getAttribute('class') ||
        mask.tagName
      ).replace(/[^a-zA-Z0-9-_.]/g, '_'); // Replace invalid characters with hyphens

      // Unique name loop
      ['id', 'name', ...Object.keys(state.api)].forEach(str => {
        // Skip
        if (str.toLowerCase() !== instanceName.toLowerCase()) return;

        // Split logic
        const split = str.split('_');
        const int = parseInt(split.pop() || '');

        // Skip if NaN
        if (isNaN(int)) {
          instanceName = str + '_2';
          return;
        }

        // Else
        instanceName = split.join('_') + '_' + (int + 1);
      });

      // Set attribute
      wrapper.setAttribute(sfNameAttr, instanceName);

      // Initiate config
      state.initInstance(instanceName, wrapper, mask);

      // Values
      const instance = state.api[instanceName] as StudioFormInstance | null;

      // Guard
      if (!instance) return;

      // Initial sf active call
      animateCurrent(instance, 0);

      // Calculate initial progress
      animateProgress(instance);

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
    });
}
