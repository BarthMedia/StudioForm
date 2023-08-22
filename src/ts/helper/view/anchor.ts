// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (stateId: number, options: Options) {
  // Values
  const state = model.state[stateId];

  // Mode guard
  if (options.scrollToActive !== true && !state.modes.scrollToActive) return;

  // * Values *

  // Selector
  const targetSelector =
    typeof options.target === 'string'
      ? options.target
      : undefined ||
        options.attributeReferenceElement?.getAttribute(
          'data-scroll-to-target'
        ) ||
        state.elements.wrapper?.getAttribute('data-scroll-to-target') ||
        '';
  const offsetSelector =
    typeof options.offset === 'string'
      ? options.offset
      : undefined ||
        options.attributeReferenceElement?.getAttribute(
          'data-scroll-to-offset'
        ) ||
        state.elements.wrapper?.getAttribute('data-scroll-to-offset') ||
        '';

  // Elements
  const target: HTMLElement = helper.isElement(options.target)
    ? options.target
    : targetSelector !== ''
    ? document.querySelector(targetSelector) || state.elements.wrapper
    : state.elements.wrapper;
  let offset: any = helper.isElement(options.offset)
    ? options.target
    : offsetSelector !== ''
    ? document.querySelector(
        typeof options.offset === 'string' ? options.offset : offsetSelector
      )
    : null;
  offset =
    typeof options.offset === 'number'
      ? options.offset
      : offset?.offsetHeight || config.DEFAULT_OFFSET;

  // Math
  let y: number = target.getBoundingClientRect().top + window.scrollY - offset;
  y = Math.max(y, 0);

  // Animate
  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });

  // Update animationData
  state.sdk.animationData.scrollToY = y;
  state.sdk.animationData.scrollToTarget = target;
  state.sdk.animationData.scrollToOffset = offset;
}
