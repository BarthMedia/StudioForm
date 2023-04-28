// + Imports +

// + Exports +

// - Return longest or shortest path -
export default function (mode, clickRecord, stepLogic) {
  // Values
  const latestRecordId = clickRecord[clickRecord.length - 1].step,
    clickRecordLength = clickRecord.length;
  let min = stepLogic.length,
    max = 0,
    count = 0,
    tmpCount = 0,
    treeArray = [];

  // Loop function
  function objectLoop(object) {
    // Values
    let array = returnNextStepIds(object);

    // Math
    count++;
    tmpCount++;

    // Handle multi steps logic
    if (array.length > 1) {
      // a tree split
      treeArray.push(tmpCount);
      tmpCount = 0;
    }

    // Update values
    if (object.isLast) {
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
      return;
    }

    // Action loop
    array.forEach((id, index) => {
      // Iniciate loop
      objectLoop(stepLogic[id]);
    });
  }

  // Return buttons
  function returnNextStepIds(object) {
    // Value
    let arr = [];

    object.buttons.forEach(button => {
      if (arr.indexOf(button.nextStepId) === -1) {
        arr.push(button.nextStepId);
      }
    });

    // Return
    return arr;
  }

  // Intiliaze loop
  objectLoop(stepLogic[latestRecordId]);

  // Finetune math values
  min += clickRecordLength;
  max += clickRecordLength;

  // Logic
  if (mode == 'shortest') {
    let x = clickRecordLength / min;
    return x * 100;
  } else {
    let x = clickRecordLength / max;
    return x * 100;
  }
}
