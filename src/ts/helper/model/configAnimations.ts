// Imports
import * as attributeUtils from '../view/utilsAttributes';
import * as controllerUtils from '../controller/utils';
import * as config from '../../config';
import * as model from '../../model';

// Error path
const errPath = (n: string) =>
  `${controllerUtils.errorName(n)} configAnimations.ts:`;

// Export
export default function (
  instanceName: string,
  wrapper: HTMLElement,
  mask: HTMLElement
) {
  // + Helper +

  // Slide
  function returnSlideEl(
    instance: StudioFormInstance,
    ghost: StudioFormGhostInstance,
    mode = 'Current'
  ) {
    // Values
    const val = ghost['slide' + mode] as number | string;

    return typeof val === 'string'
      ? instance.elements.done
      : instance.logic[val]?.element;
  }

  // Attribute
  function getAttribute(str: string, current = true) {
    // Values
    const instance = model.state.instances[instanceName];
    const ghost = model.state.ghostInstances[instanceName];
    const slideNext = returnSlideEl(instance, ghost);
    const slideCurrent = returnSlideEl(instance, ghost, 'Next');

    // Guard
    if (!slideNext || !slideCurrent)
      throw new Error(
        `${errPath(instanceName)} Couldn't find instance.elements.done!`
      );

    // Values
    let val = attributeUtils.getAttribute(
      str,
      current ? slideCurrent : slideNext,
      mask,
      wrapper
    );

    // Return
    return val;
  }

  // Float
  function getFloat(str: string, _default: number, current = true) {
    // Values
    let val = parseFloat(getAttribute(str, current) || _default + '');

    // Return
    return isNaN(val) ? _default : val;
  }

  // Object
  const obj = {
    // General
    get direction() {
      // Values
      const val = getAttribute('direction')?.toLowerCase();

      // Logic
      if (val === 'off') return 'off';

      // Default return
      return getFloat('direction', config.DEFAULT_SLIDE_DIRECTION);
    },
    get ease() {
      return getAttribute('ease') || 'power1.out';
    },
    get equalDimensionsMultiplier() {
      return getFloat(
        'equal-dimensions-multiplier',
        config.DEFAULT_SLIDE_EQUAL_DIMENSIONS_MULTIPLIER
      );
    },

    // Scroll to
    get offset() {
      // Values
      const val = getAttribute('offset') || config.DEFAULT_OFFSET + '';

      // Return
      return /^\d+(\.\d+)?$/.test(val) ? parseFloat(val) : val;
    },

    // Progress bar
    get progressBarAxis() {
      return getAttribute('progress-bar-axis') || 'x';
    },

    // current / current
    get currentMoveMultiplier() {
      return getFloat(
        'current-move-multiplier',
        config.DEFAULT_SLIDE_CURRENT_MOVE_MULTIPLIER
      );
    },
    get currentTime() {
      return getFloat('current-time', config.DEFAULT_SLIDE_CURRENT_TIME);
    },
    get currentOpacity() {
      return getFloat('current-opacity', config.DEFAULT_SLIDE_OPACITY);
    },

    // Next / next
    get nextMoveMultiplier() {
      return getFloat(
        'next-move-multiplier',
        config.DEFAULT_SLIDE_NEXT_MOVE_MULTIPLIER,
        false
      );
    },
    get nextTime() {
      return getFloat('next-time', config.DEFAULT_SLIDE_NEXT_TIME, false);
    },
    get nextOpacity() {
      return getFloat('next-opacity', config.DEFAULT_SLIDE_OPACITY, false);
    },
    get zIndex() {
      return getFloat('z-index', 1);
    },

    // Redirect
    get redirectDelay() {
      // Values
      const totalTime =
        model.state.instances[instanceName].data.animation.totalTime;

      // Return
      return getFloat('redirect-delay', totalTime);
    },
  };

  // Expose to api & handle change requests
  return obj;
}
