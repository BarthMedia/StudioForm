// Imports
import * as utils from './utils';
import * as modelUtils from '../model/utils';
import * as config from '../../config';
import * as model from '../../model';

// Export active / inactive
export default function (instance: StudioFormInstance, timeCurrent: number) {
  // Toggle main
  function toggle(index: number, mode: string, _class: string) {
    // Values
    const slide = instance.logic[index];
    const names = [`current-${index}`];
    if (slide.name) names.unshift(`current-${slide.name}`);
    const selector = utils.createSelector(instance.name, ...names);

    // Elements
    const parents: NodeListOf<HTMLElement> =
      document.querySelectorAll(selector);

    // Loop
    parents.forEach(el => {
      utils.classListToggle({ element: el, mode: mode, class: _class });
    });
  }

  // Quick toggle
  function quickToggle(index: number, completed: boolean, current: boolean) {
    // Toggle
    toggle(index, completed ? 'add' : 'remove', 'completed');
    toggle(index, current ? 'add' : 'remove', 'current');
  }

  // Update completed / current state
  const ghost = modelUtils.returnGhost(instance);

  // To delete
  ghost.asyncRecord.forEach(index => {
    if (!instance.record.includes(index)) {
      // Delete
      quickToggle(index, false, false);
    }
  });

  // Values
  ghost.asyncRecord = [...instance.record];
  const tmpRecord = [...instance.record];
  const currentIndex = instance.isDone ? null : tmpRecord.pop();

  // Add completed
  tmpRecord.forEach(index => {
    // Add / delete
    quickToggle(index, true, false);
  });

  // Current
  if (typeof currentIndex == 'number') {
    // Values
    const tl = gsap.timeline();
    const gsapTl = ghost.gsapTl;

    // Clear existing timeline
    if (ghost.root.isTransitioning) {
      gsapTl.current?.progress(1);
      gsapTl.current?.clear();
    }

    // Values
    gsapTl.current = tl;

    // Write current timeline
    tl.to({}, { duration: timeCurrent });
    tl.call(() => {
      quickToggle(currentIndex, false, true);
    });
  }
}
