// Imports
import * as helper from '../helper';

// Export
export default function init(state: any) {
  // Define
  function toggle(id: number, mode: string) {
    // Elements
    const inner: NodeListOf<HTMLElement> =
      state.elements.wrapper.querySelectorAll(`[studio-form="active-${id}"]`);
    const outer: NodeListOf<HTMLElement> = document.querySelectorAll(
      `[studio-form-${state.sdk.i}="active-${id}"]`
    );
    const elements: HTMLElement[] = [];

    // Loop
    [inner, outer].forEach(list => {
      // Loop
      list.forEach(parent => {
        // Push
        elements.push(parent);

        // Push loop
        parent.childNodes.forEach(node => elements.push(node as HTMLElement));
      });
    });

    // ClassList loop
    elements.forEach(el => el.classList[mode]('sf-active'));
  }

  // Add
  state.addSfActive = (slideId: number) => {
    toggle(slideId, 'add');
  };

  // Remove
  state.removeSfActive = (slideId: number) => {
    toggle(slideId, 'remove');
  };

  // Initialize
  state.addSfActive(0);
}
