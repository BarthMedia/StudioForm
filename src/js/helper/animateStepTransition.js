// + Imports +
import * as config from '../config.js';

// + Exports +

// - - Step transit animation - -

// Timeline storage element
let timeLineStorage = false;

// Function
export default function (stateData, $currentStep, $nextStep) {
  // Turn off animations on extreme dev mode
  if (stateData.devMode >= 2) {
    console.log(`Dev mode ${devMode}: Block the transition animation...`);
    return;
  }

  // - Local variables -
  const $form = stateData.elements.$form,
    $otherElements = $form
      .find(`[${config.STEP_INDEX_ATTRIBUTE}]`)
      .not($currentStep)
      .not($nextStep),
    styles = stateData.styles,
    cssShow = styles['cssShow'],
    cssHide = styles['cssHide'],
    cssHideQuick = { ...cssHide, duration: 0 },
    tl = new gsap.timeline(),
    resizeHeight1 = $currentStep.outerHeight(true),
    resizeHeight2 = $nextStep.outerHeight(true),
    isEqualHeight = resizeHeight1 == resizeHeight2,
    speedMultiplier = isEqualHeight
      ? styles['equalHeightTransitionSpeedMultiplier']
      : 1,
    speedMultiplierString = `<+=${speedMultiplier * 100}%`,
    isReverse =
      parseInt($currentStep.attr(config.STEP_INDEX_ATTRIBUTE)) >
      parseInt($nextStep.attr(config.STEP_INDEX_ATTRIBUTE)),
    autoResizeTime1 = cssShow['duration'],
    autoResizeTime2 = cssHide['duration'],
    autoResizeTimeMultiplier1 = styles['autoResizeTimeMultiplier1'],
    autoResizeTimeMultiplier2 = styles['autoResizeTimeMultiplier2'];

  // Not constant
  let slideDirection = (
    $currentStep.attr(config.SLIDE_DIRECTION_ATTRIBUTE) ||
    styles['slideDirection']
  ).toLowerCase();

  // Step specific animation in reverse
  if (isReverse) {
    slideDirection = (
      $nextStep.attr(config.SLIDE_DIRECTION_ATTRIBUTE) || slideDirection
    ).toLowerCase();
  }

  // Log speed multiplier info if dev mode = true
  //   if (stateData.devMode >= 2) {
  //     console.log(
  //       `Dev mode ${devMode}; GSAP transition speed multiplier string: ${speedMultiplierString}`
  //     );
  //   }

  // - Depending on slide Direction animate: -
  if (slideDirection == 'to bottom') {
    // Top to bottom
    // Local variables
    const fromTop = { ...cssShow, y: 0 },
      toTop = { ...cssHide, y: -$form.outerHeight(true) },
      toTopQuick = { ...toTop, duration: 0 },
      fromBottom = { ...cssShow, y: 0 },
      toBottom = { ...cssHide, y: $form.outerHeight(true) },
      toBottomQuick = { ...toBottom, duration: 0 };

    // Local logic
    if (!isReverse) {
      // Local functions
      tl.to($currentStep[0], toBottom);
      tl.fromTo($nextStep[0], toTopQuick, fromTop, speedMultiplierString);
    } else {
      // Local functions
      tl.to($currentStep[0], toTop);
      tl.fromTo($nextStep[0], toBottomQuick, fromBottom, speedMultiplierString);
    }
  } else if (slideDirection == 'to top') {
    // Bottom to top
    // Local variables
    const fromTop = { ...cssShow, y: 0 },
      toTop = { ...cssHide, y: -$form.outerHeight(true) },
      toTopQuick = { ...toTop, duration: 0 },
      fromBottom = { ...cssShow, y: 0 },
      toBottom = { ...cssHide, y: $form.outerHeight(true) },
      toBottomQuick = { ...toBottom, duration: 0 };

    // Local logic
    if (!isReverse) {
      // Local functions
      tl.to($currentStep[0], toTop);
      tl.fromTo($nextStep[0], toBottomQuick, fromBottom, speedMultiplierString);
    } else {
      // Local functions
      tl.to($currentStep[0], toBottom);
      tl.fromTo($nextStep[0], toTopQuick, fromTop, speedMultiplierString);
    }
  } else if (slideDirection == 'to left' || slideDirection == 'default') {
    // Right to left
    // Local variables
    const fromLeft = { ...cssShow, x: 0 },
      toLeft = { ...cssHide, x: -$form.outerWidth(true) },
      toLeftQuick = { ...toLeft, duration: 0 },
      fromRigth = { ...cssShow, x: 0 },
      toRigth = { ...cssHide, x: $form.outerWidth(true) },
      toRigthQuick = { ...toRigth, duration: 0 };

    // Local logic
    if (!isReverse) {
      // Local functions
      tl.to($currentStep[0], toLeft);
      tl.fromTo($nextStep[0], toRigthQuick, fromRigth, speedMultiplierString);
    } else {
      // Local functions
      tl.to($currentStep[0], toRigth);
      tl.fromTo($nextStep[0], toLeftQuick, fromLeft, speedMultiplierString);
    }
  } else if (slideDirection == 'to right') {
    // Left to right
    // Local variables
    const fromLeft = { ...cssShow, x: 0 },
      toLeft = { ...cssHide, x: -$form.outerWidth(true) },
      toLeftQuick = { ...toLeft, duration: 0 },
      fromRigth = { ...cssShow, x: 0 },
      toRigth = { ...cssHide, x: $form.outerWidth(true) },
      toRigthQuick = { ...toRigth, duration: 0 };

    // Local logic
    if (!isReverse) {
      // Local functions
      tl.to($currentStep[0], toRigth);
      tl.fromTo($nextStep[0], toLeftQuick, fromLeft, speedMultiplierString);
    } else {
      // Local functions
      tl.to($currentStep[0], toLeft);
      tl.fromTo($nextStep[0], toRigthQuick, fromRigth, speedMultiplierString);
    }
  } else if (slideDirection == 'none') {
    // None
    // Local functions
    tl.to($currentStep[0], cssHide);
    tl.fromTo($nextStep[0], cssHideQuick, cssShow);
  } // Custom
  else {
    // Local variables
    const customNextSlideIn = styles['customNextSlideIn'],
      customNextSlideOut = styles['customNextSlideOut'],
      customPrevSlideIn = styles['customPrevSlideIn'],
      customPrevSlideOut = styles['customPrevSlideOut'],
      xM = styles['customXMultiplier'],
      yM = styles['customYMultiplier'];

    // Add possible x
    if (customNextSlideIn['x'] == undefined) {
      customNextSlideIn['x'] = 0;
    }
    if (customNextSlideOut['x'] == undefined) {
      customNextSlideOut['x'] = xM * $form.outerWidth(true);
    }
    if (customPrevSlideIn['x'] == undefined) {
      customPrevSlideIn['x'] = 0;
    }
    if (customPrevSlideOut['x'] == undefined) {
      customPrevSlideOut['x'] = -xM * $form.outerWidth(true);
    }

    // Add possible y
    if (customNextSlideIn['y'] == undefined) {
      customNextSlideIn['y'] = 0;
    }
    if (customNextSlideOut['y'] == undefined) {
      customNextSlideOut['y'] = yM * $form.outerHeight(true);
    }
    if (customPrevSlideIn['y'] == undefined) {
      customPrevSlideIn['y'] = 0;
    }
    if (customPrevSlideOut['y'] == undefined) {
      customPrevSlideOut['y'] = -yM * $form.outerHeight(true);
    }

    // Quick version
    const customPrevSlideOutQuick = { ...customPrevSlideOut, duration: 0 },
      customNextSlideOutQuick = { ...customNextSlideOut, duration: 0 };

    // Local logic
    if (!isReverse) {
      // Set resize time value
      autoResizeTime1 = customNextSlideIn['duration'];
      autoResizeTime2 = customNextSlideOut['duration'];

      // Local functions
      tl.to($currentStep[0], customNextSlideOut);
      tl.fromTo(
        $nextStep[0],
        customPrevSlideOutQuick,
        customNextSlideIn,
        speedMultiplierString
      );
    } else {
      // Set resize time value
      autoResizeTime1 = customPrevSlideIn['duration'];
      autoResizeTime2 = customPrevSlideOut['duration'];

      // Local functions
      tl.to($currentStep[0], customPrevSlideOut);
      tl.fromTo(
        $nextStep[0],
        customNextSlideOutQuick,
        customPrevSlideIn,
        speedMultiplierString
      );
    }
  }

  // - Autoresize the form element; Depending on the 2 step sizes -
  if (resizeHeight2 >= resizeHeight1) {
    gsap.to($form[0], {
      height: resizeHeight2,
      duration: autoResizeTime1 * autoResizeTimeMultiplier1,
    });
  } else {
    gsap.set($form[0], { height: resizeHeight1 });
    gsap
      .to($form[0], {
        height: resizeHeight2,
        duration: autoResizeTime2 * autoResizeTimeMultiplier2,
      })
      .delay(autoResizeTime1);
  }

  // - Clear gsap timeline in case the form gets navigated quickly -
  if (timeLineStorage) timeLineStorage.clear();
  timeLineStorage = tl;
  $otherElements.hide();
}
