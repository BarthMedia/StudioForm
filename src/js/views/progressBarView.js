// + Imports +
import returnPathFloat from '../helper/returnPathFloat';

// + Classes +
class ProgressBarView {
  // Function
  update(stateData, isSubmit = false) {
    // Security return check
    if (stateData.elements.$progressBar.length < 1) return;

    // Values
    const pbAnimationtime = stateData.styles['progressBarAnimationSTime'],
      pbAxis = stateData.styles['progressBarAxis'].toLowerCase();

    // Values
    const percentageFloat = isSubmit
      ? 100
      : returnPathFloat('longest', stateData.clickRecord, stateData.stepLogic); // Return longest path

    // Axis logic
    if (['x', 'x, y', 'y, x'].includes(pbAxis)) {
      // X axis animation
      gsap.to(stateData.elements.progressBars, {
        width: percentageFloat + '%',
        duration: pbAnimationtime,
      });
    }

    if (['y', 'x, y', 'y, x'].includes(pbAxis)) {
      // Y axis animation
      gsap.to(stateData.elements.progressBars, {
        height: percentageFloat + '%',
        duration: pbAnimationtime,
      });
    }
  }
}

// + Exports +
export default new ProgressBarView();
