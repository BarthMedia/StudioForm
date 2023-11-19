// Imports
import * as helper from '../helper';
import * as config from '../../config';

// Export active / inactive
export default function init(instance: StudioFormInstance) {
  console.log('Turn sf-in/active into sf-completed & sf-current!');

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

    console.log(
      'Make sure sf-current is removed at the beginning of animate',
      'make sure that there is animate-mid',
      'or just wait for mid for add sf-current to new one!',
      'at mid, apply sf-completed and add next sf-current?'
    );

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
