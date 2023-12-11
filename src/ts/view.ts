// + Imports +

// General
import * as utils from './helper/view/utils';
import * as controllerUtils from './helper/controller/utils';
import * as config from './config';
import * as model from './model';

// View
import listener from './helper/view/listeners';
import animateProgress from './helper/view/animateProgress';
import animateCurrent from './helper/view/animateCurrent';
import observerAttachments from './helper/view/observeAttachments';
import observeChecked from './helper/view/observeChecked';
import { wrap } from 'gsap';

// Error path
const errPath = `${config.PRODUCT_NAME_CAMEL_CASE} -> view.ts:`;

// + Export +
export default function init(state: StudioFormState) {
  // Elements loop
  document
    .querySelectorAll(utils.createSelector(null, 'wrapper', 'mask'))
    .forEach(async el => {
      // Logical elements
      const wrapper = (
        el.tagName === 'FORM'
          ? el.parentElement
          : utils.getAttribute(null, el as HTMLElement) === 'mask' &&
            !el.classList.contains('w-form')
          ? el.parentElement
          : el
      ) as HTMLElement;
      const mask = (wrapper.querySelector('form') ||
        wrapper.querySelector('*')) as HTMLElement | null;

      // Guard - Simple
      if (!mask) {
        controllerUtils.warn(`${errPath} Couldn't find mask!`, wrapper);
        return;
      }

      // Guard - Already active
      const sfNameAttr = `${config.PRODUCT_NAME_SHORT}-id`;
      if (wrapper.hasAttribute(sfNameAttr)) return;

      // Instance name
      let instanceName = (
        utils.getAttributeOr(mask, 'data-name', 'name', 'id', 'class') ||
        mask.tagName
      ).replace(/[^a-zA-Z0-9-_.]/g, '_'); // Replace invalid characters with hyphens

      // Unique name loop
      ['id', 'name', 'cloak', ...Object.keys(state.api)].forEach(str => {
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

      // * Initiate *

      // Guard
      if (!instance) return;

      // Initial sf active call
      animateCurrent(instance, 0);

      // Calculate initial progress
      setTimeout(() => {
        animateProgress(instance);
      }, config.INITIAL_PROGRESS_BAR_ANIMATION_DELAY * 1000);

      // * Init initial style *

      // Values
      const modes = instance.config.modes;
      const initDefaultStyles = modes.initDefaultStyles;
      const areaHidden = 'aria-hidden';

      // Set attribute on wrapper
      utils.setAccessibility(
        wrapper,
        modes.slider ? 'carousel' : 'progressive form',
        'region'
      );

      // Loop
      instance.logic.forEach((slide, index, array) => {
        // Values
        const el = slide.element;

        // Show/ hide steps
        if (initDefaultStyles) el.style.display = 'none';

        // Set attributes
        utils.setAccessibility(el, `${index + 1} of ${array.length}`, 'group');
        el.setAttribute(areaHidden, 'true');
      });

      // Instance 0
      const element0 = instance.logic[0].element;
      if (initDefaultStyles) element0.style.display = '';
      element0.removeAttribute(areaHidden);

      // * Observe *
      const observer = new MutationObserver(observe);
      observer.observe(mask, { childList: true, subtree: true });
      model.state.ghostInstances[instanceName].observer = observer;

      // Initiate
      let initiated = false;
      setTimeout(() => {
        observe(null);
      }, 1);

      // Define observer function
      function observe(mutationsList: MutationRecord[] | null) {
        // Guard
        if (!initiated && mutationsList !== null) return;
        if (!initiated) initiated = true;

        // Values
        const newFileInputs: HTMLInputElement[] = [];
        const newCheckboxInputs: HTMLInputElement[] = [];
        const newRadioInputs: HTMLInputElement[] = [];

        // Define
        function nodeLoop(nodes: NodeList) {
          nodes.forEach(node => {
            // Overwrite
            let nodes = [node];
            if (node instanceof Element)
              node
                .querySelectorAll('input')
                .forEach(input => nodes.push(input));

            // Loop
            nodes.forEach(node => {
              // Guard
              if (!(node instanceof HTMLInputElement)) return;

              // Logic
              if (node.type === 'file') newFileInputs.push(node);
              if (node.type === 'checkbox') newCheckboxInputs.push(node);
              if (node.type === 'radio') newRadioInputs.push(node);
            });
          });
        }

        // Loop
        if (mutationsList)
          mutationsList.forEach(mutation => {
            // Guard
            if (mutation.type !== 'childList') return;

            // Loops
            nodeLoop(mutation.addedNodes);
          });
        else nodeLoop(mask!.childNodes);

        // Fire
        observerAttachments(instance!, newFileInputs);
        observeChecked(instance!, newRadioInputs, newCheckboxInputs);
      }

      // * Init main event listeners *
      listener(instance);
    });
}
