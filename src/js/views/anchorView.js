// + Imports +
import * as config from '../config.js';

// + Classes +

// - Anchor funcitonality -
class AnchorView {
  // Function
  functionality(stateData) {
    if (stateData.elements.$anchor.length == 1) {
      // Values
      let width = $(window).outerWidth(true),
        height = stateData.elements.$anchorYOffset.outerHeight(true) || 0;

      // If within specified scren size
      if (
        width <= stateData.anchorData.anchorMaxScreenSize &&
        width >= stateData.anchorData.anchorMinScreenSize
      ) {
        gsap.to(stateData.elements.anchorScrollTarget, {
          scrollTo: {
            y: `#anchor-element-${formBlockIndex}`,
            offsetY: height,
          },
          duration: stateData.anchorData.anchorAnimationTime,
        });
      }
    }
  }

  init(stateData) {
    // Values
    let anchorMinScreenSize = parseInt(
        stateData.elements.$anchor.attr(
          config.ANCHOR_MIN_SCREEN_SIZE_ATTRIBUTE
        ) || config.ANCHOR_MIN_SCREEN_SIZE_DEFAULT
      ),
      anchorMaxScreenSize = parseInt(
        stateData.elements.$anchor.attr(
          config.ANCHOR_MAX_SCREEN_SIZE_ATTRIBUTE
        ) || config.ANCHOR_MAX_SCREEN_SIZE_DEFAULT
      ),
      anchorAnimationTime = stateData.styles['anchorAnimationSTime'],
      anchorYOffsetSelector = stateData.elements.$anchor.attr(
        config.ANCHOR_Y_OFF_SETSELECTOR_ATTRIBUTE
      );

    // Elements
    const $anchorYOffset = $(anchorYOffsetSelector);
    let anchorScrollTarget = document.querySelectorAll(
      stateData.elements.$anchor.attr(
        config.ANCHOR_RELATED_ELEMENT_TO_SCROLL_SELECTOR_ATTRIBUTE
      )
    );

    anchorScrollTarget =
      anchorScrollTarget.length > 0 ? anchorScrollTarget : window; // Give webflower full customizability

    // Dom preperation
    stateData.elements.$anchor.attr(
      'id',
      `anchor-element-${stateData.formBlockIndex}`
    );

    // Enrich stateData
    stateData.anchorData = {
      anchorMinScreenSize: anchorMinScreenSize,
      anchorMaxScreenSize: anchorMaxScreenSize,
      anchorAnimationTime: anchorAnimationTime,
    };

    stateData.elements.$anchorYOffset = $anchorYOffset;
    stateData.elements.anchorScrollTarget = anchorScrollTarget;

    // Function
    this.functionality(stateData);
  }
}

// + Exports +
export default new AnchorView();
