// + Imports +
import * as config from '../../../config.js';

import { state } from '../../../model.js';

// + Exports +

// - - Visual appealing submit - -
export default function (stateData) {
  // Values
  const { elements } = stateData,
    { devMode } = stateData,
    { styles } = stateData,
    $formBlock = elements.$formBlock,
    $form = elements.$form;

  // Local variables
  const $success = $formBlock.find(config.W_SUCCESS_SELECTOR),
    time1 = styles['submitMsTime1'] / 1000,
    time2 = styles['submitMsTime2'] / 1000,
    submitHide = styles['submitHide'],
    submitHideQuick = { ...submitHide, duration: 0 },
    submitShow = styles['submitShow'],
    resizeHeight1 = $form.outerHeight(true),
    resizeHeight2 = $success.outerHeight(true),
    multiplier1 = styles['autoResizeSuccessTimeMultiplier1'],
    multiplier2 = styles['autoResizeSuccessTimeMultiplier2'],
    submitTimeout = (submitHide.duration + submitShow.duration) * 1000,
    tl = new gsap.timeline(),
    resizeTl = new gsap.timeline();

  // Dev mode logic
  if (devMode < 0.5) {
    // If dev mode is half or higher, do not:
    setTimeout(function () {
      $form.submit();
    }, submitTimeout);
  } else {
    console.log(`Dev mode ${devMode}: Perform fake submit...`);
  }

  // - GSAP animations -

  // Animate submission transition
  tl.set($success[0], submitHideQuick);
  tl.to($form[0], submitHide);
  tl.to($success[0], submitShow);

  // Change frame height smoothly
  if (resizeHeight2 >= resizeHeight1) {
    resizeTl.to($formBlock[0], {
      height: resizeHeight2,
      duration: time1 * multiplier1,
    });
  } else {
    resizeTl.set($formBlock[0], { height: resizeHeight1 });
    resizeTl
      .to($formBlock[0], {
        height: resizeHeight2,
        duration: time2 * multiplier2,
      })
      .delay(time1);
  }
  resizeTl.set($formBlock[0], { height: 'auto' });
}
