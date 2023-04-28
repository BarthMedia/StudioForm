// + Imports +
import * as config from '../config.js';
import defineSwipeType from '../utils/view/logics/defineSwipeType.js';

// + Classes +

// - - Handle mobile swipe gestures - -
class SwipeGestureView {
  init(stateData) {
    // Elements
    const $formBlock = stateData.elements.$formBlock;

    // Handlers
    const goToPrevStep = stateData.handlers.goToPreviousStep,
      findNext = stateData.handlers.findNextStep;

    // Init
    defineSwipeType(stateData);

    // Variables
    let hammer = Hammer($formBlock[0]),
      animationType = $formBlock.attr(config.SWIPE_TYPE_ANIMATION_ATTRIBUTE);

    // - Variations -
    if (animationType == 'false') {
    } else if (animationType == 'to bottom') {
      // Init all swipe directions
      hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

      hammer.on('swipeup', () => {
        goToPrevStep(true);
      });
      hammer.on('swipedown', () => {
        findNext(true);
      });
    } else if (animationType == 'to top' || animationType == 'vertical') {
      // Init all swipe directions
      hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

      hammer.on('swipeup', () => {
        findNext(true);
      });
      hammer.on('swipedown', () => {
        goToPrevStep(true);
      });
    } else if (
      animationType == 'to left' ||
      animationType == 'default' ||
      animationType == 'horizontal'
    ) {
      hammer.on('swipeleft', () => {
        findNext(true);
      });
      hammer.on('swiperight', () => {
        goToPrevStep(true);
      });
    } else if (animationType == 'to right') {
      hammer.on('swipeleft', () => {
        goToPrevStep(true);
      });
      hammer.on('swiperight', () => {
        findNext(true);
      });
    } else if (animationType == '4' || animationType == '270°') {
      // Init all swipe directions
      hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

      hammer.on('swipeup', () => {
        goToPrevStep(true);
      });
      hammer.on('swipeleft', () => {
        findNext(true);
      });
      hammer.on('swiperight', () => {
        findNext(true);
      });
      hammer.on('swipedown', () => {
        goToPrevStep(true);
      });
    } else if (animationType == '3' || animationType == '180°') {
      // Init all swipe directions
      hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

      hammer.on('swipeup', () => {
        goToPrevStep(true);
      });
      hammer.on('swipeleft', () => {
        findNext(true);
      });
      hammer.on('swiperight', () => {
        findNext(true);
      });
      hammer.on('swipedown', () => {
        goToPrevStep(true);
      });
    } else if (animationType == '2' || animationType == '90°') {
      // Init all swipe directions
      hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

      hammer.on('swipeup', () => {
        goToPrevStep(true);
      });
      hammer.on('swipeleft', () => {
        findNext(true);
      });
      hammer.on('swiperight', () => {
        findNext(true);
      });
      hammer.on('swipedown', () => {
        goToPrevStep(true);
      });
    } // == 'none' || 1 || 'standard' || 0°
    else {
      // Init all swipe directions
      hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

      hammer.on('swipeup', () => {
        findNext(true);
      });
      hammer.on('swipeleft', () => {
        findNext(true);
      });
      hammer.on('swiperight', () => {
        goToPrevStep(true);
      });
      hammer.on('swipedown', () => {
        goToPrevStep(true);
      });
    }
  }
}

// + Exports +
export default new SwipeGestureView();
