// Imports
import * as helper from '../helper';
import * as config from '../../config';

// Export active / inactive
export default function init(instance: StudioFormInstance) {
  // Define
  function toggle(id: number, mode: string, prefix = '') {
    // Elements
    const elements: NodeListOf<HTMLElement> =
      instance.elements.wrapper.querySelectorAll(
        helper.createSelector(instance.name, `active-${id}`)
      );

    // Loop
    elements.forEach(parent => {
      // Toggle
      helper.classListToggle({
        el: parent,
        class: prefix + 'active',
        mode: mode,
      });
    });

    // Inactive mode
    const arr = state.view.sfInactiveArray;
    if (mode === 'add' && prefix === '') {
      // Remove
      arr.forEach((_id: number) => {
        if (_id >= id) toggle(_id, 'remove', 'in');
      });
    } else if (prefix === '') {
      // Add to array
      if (!arr.includes(id)) {
        arr.push(id);
      }
    }
  }

  // Add
  state.addSfActive = (slideId: number) => {
    toggle(slideId, 'add');
  };

  // Remove
  state.removeSfActive = (slideId: number) => {
    toggle(slideId, 'remove');
    toggle(slideId, 'add', 'in');
  };

  // Initialize
  state.addSfActive(0);
}
