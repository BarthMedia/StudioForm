// Imports
import elements from './helper/view/elements';

// Export
export default function init(state: any) {
  // Return elements
  elements(state);

  // Generate step logic
  state.model.generateSlideLogic();

  // Init event listeners
}
