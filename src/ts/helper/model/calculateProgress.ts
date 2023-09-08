// + Imports +
import * as model from '../../model';

// + Exports +
export default function (i: number) {
  // Values
  const state = model.state[i];

  // Test
  // state.modes.calculateProgress = true;
  // state.sdk.slideRecord = [0];

  // Guard
  if (state.sdk.slideLogic.length < 1 || state.sdk.slideRecord.length < 1)
    throw new Error(
      `StudioForm[${state.sdk.i}] -> calculateProgress.ts -> default: state.sdk.slideLogic.length and/or state.sdk.slideRecord.length can't equal 0`
    );

  // Values
  const slideLogic: any[] = state.sdk.slideLogic;
  const slideRecord: number[] = state.sdk.slideRecord;

  // - Return longest or shortest path to the first possible submit -

  // Values
  const latestRecordId = slideRecord[slideRecord.length - 1],
    slideRecordLength = slideRecord.length;
  let min = slideLogic.length,
    max = 0,
    count = 0,
    tmpCount = 0,
    treeArray: any[] = [];

  // Loop function
  function objectLoop(object) {
    // Values
    let array = returnNextSlideIds(object);

    // Math
    count++;
    tmpCount++;

    // Handle multi slides logic
    if ([...array].filter(item => item !== false).length > 1) {
      // a tree split
      treeArray.push(tmpCount);
      tmpCount = 0;
    }

    // Update values
    let securityConditional = false;
    if (object.btns !== false) {
      object.btns.every(btn => {
        // Guard
        if (btn.next !== false) return true;

        // Update values
        max = Math.max(max, count);
        min = Math.min(min, count);
        count = 0;

        // Add base value to tree
        treeArray.forEach(n => {
          count += n;
        });

        // Trim back a leaf
        treeArray.pop();

        // Security conditional
        securityConditional = true;
        return false;
      });
    } else {
      // Guard
      if (object.next === false) {
        // Update values
        max = Math.max(max, count);
        min = Math.min(min, count);
        count = 0;

        // Add base value to tree
        treeArray.forEach(n => {
          count += n;
        });

        // Trim back a leaf
        treeArray.pop();

        // Security conditional
        securityConditional = true;
      }
    }

    // Security conditional
    if (securityConditional) return;

    // Action loop
    array.forEach(id => {
      // False guard
      if (id === false) return;

      // Iniciate loop
      objectLoop(slideLogic[id]);
    });
  }

  // Return buttons
  function returnNextSlideIds(object) {
    // Value
    let arr: any[] = [];

    if (object.btns)
      object.btns.forEach(button => {
        if (arr.indexOf(button.next) === -1 && !button.conditionalPrev) {
          arr.push(button.next);
        }
      });
    else {
      arr.push(object.next);
    }

    // Return
    return arr;
  }

  // Intiliaze loop
  objectLoop(slideLogic[latestRecordId]);

  // Finetune math values
  min += slideRecordLength - 1;
  max += slideRecordLength - 1;

  // Logic
  const returnVal = {
    shortest: {
      percentage: (slideRecordLength / min) * 100,
      path: min,
      walked: slideRecordLength,
    },
    longest: {
      percentage: (slideRecordLength / max) * 100,
      path: max,
      walked: slideRecordLength,
    },
  };

  return returnVal;
}
