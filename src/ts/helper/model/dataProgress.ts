// + Imports +
import * as model from '../../model';
import * as config from '../../config';
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';

// Error
const errPath = (n: string) =>
  `${controllerUtils.errorName(n)} calculateProgress.ts:`;

// + Exports +
export default function (instance: StudioFormInstance) {
  // Values
  const slideLogic = instance.logic;
  const slideRecord = instance.record;

  // - Return longest or shortest path to the first possible submit -

  // Values
  const latestRecordId = utils.currentSlideId(instance),
    slideRecordLength = slideRecord.length;
  let min = slideLogic.length,
    max = 0,
    count = 0,
    tmpCount = 0,
    treeArray: number[] = [];

  // Loop function
  function objectLoop(object: StudioFormSlideLogic) {
    // Values
    const array = returnNextSlideIds(object);

    // Math
    count++;
    tmpCount++;

    // Handle multi slides logic
    if ([...array].filter(item => item !== 'done').length > 1) {
      // a tree split
      treeArray.push(tmpCount);
      tmpCount = 0;

      console.log(
        'CURRENTLY OUT OF SERVICE!',
        'new sf-to logic has to be built!'
      );
    }

    // Action loop
    array.forEach(id => {
      // False guard
      if (id === 'done') {
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

        // Return
        return;
      }

      // Iniciate loop
      objectLoop(slideLogic[id]);
    });
  }

  // Return buttons
  function returnNextSlideIds(object: StudioFormSlideLogic) {
    // Value
    let arr: (number | 'done')[] = [];

    if (object.buttons)
      object.buttons.forEach(button => {
        // Values
        const nextId = button.next;
        const noDoneArray = [...arr].filter(
          item => item !== 'done'
        ) as number[];
        const allowPush =
          nextId === 'done' ||
          (noDoneArray[noDoneArray.length - 1] || 0) < nextId;

        // Push logic
        if (arr.indexOf(nextId) === -1 && allowPush) {
          arr.push(nextId);
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
