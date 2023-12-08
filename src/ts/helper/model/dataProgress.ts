// + Imports +
import * as model from '../../model';
import * as config from '../../config';
import * as controllerUtils from '../controller/utils';

// + Exports +
const errPath = (n: string) =>
  `${controllerUtils.errorName(n)} calculateProgress.ts:`;
export default function (instance: StudioFormInstance) {
  // Values
  const slideLogic = instance.logic;
  const slideRecord = instance.record;

  // - Return longest or shortest path to the first possible submit -

  // Values
  const latestRecordId = slideRecord[slideRecord.length - 1],
    slideRecordLength = slideRecord.length;
  let min = slideLogic.length,
    max = 0,
    count = 0,
    tmpCount = 0,
    treeArray: number[] = [];

  // Loop function
  function objectLoop(object: StudioFormSlideLogic) {
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
    if (object.buttons !== false) {
      object.buttons.every(button => {
        // Guard
        if (button.next !== false && button.next !== undefined) return true;

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
      if (object.next === false || object.next === undefined) {
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

      // Undefined guard
      if (typeof id !== 'number') {
        controllerUtils.warn(
          `${errPath(
            instance.name
          )} objectLoop -> array.forEach() callback: id === undefined`,
          object
        );
        return;
      }

      // Iniciate loop
      objectLoop(slideLogic[id]);
    });
  }

  // Return buttons
  function returnNextSlideIds(object: StudioFormSlideLogic) {
    // Value
    let arr: (number | boolean | undefined)[] = [];

    if (object.buttons)
      object.buttons.forEach(button => {
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
  const addition =
    instance.config.modes.countDone && !instance.config.modes.slider ? 1 : 0;

  // Logic
  const returnVal: SFProgressData = {
    fast: {
      percentage: (slideRecordLength / (min + addition)) * 100,
      path: min,
    },
    slow: {
      percentage: (slideRecordLength / (max + addition)) * 100,
      path: max,
    },
    traversed: slideRecordLength,
  };

  return returnVal;
}
