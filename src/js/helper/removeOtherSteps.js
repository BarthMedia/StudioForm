// + Imports +
import * as config from '../config.js';

// + Exports +

// - - Remove other steps - -
export default function (stepObject, clickRecord, $element) {
  // Local variables
  let isAllowed = $element.attr(config.REMOVE_OTHER_STEPS_ATTRIBUTE) || 'true';
  // removeArray = [];

  if (isAllowed == 'true') {
    stepObject.forEach(step => {
      let stepInRecord = false,
        stepIndex = step.index;

      clickRecord.forEach(record => {
        if (stepIndex == record.step) {
          stepInRecord = true;
        }
      });

      if (step.isLast) {
        stepInRecord = true;
      }

      if (!stepInRecord) {
        step.$.remove();
      }
    });
  }
}
