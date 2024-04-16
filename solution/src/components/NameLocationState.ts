import { NameLocationEntry } from './types';

// Igor's comment:
//
// In real life application, we would have more complex state and actions.
// We would use a library like Redux, MobX, XState, Zustand, or other.
// The exact choice would depend on the specific requirements and constraints
// of the project.
//
// Even though the assignment could be solved with component level state,
// it's good to separate the state management logic from the component rendering.

export interface NameLocationState {
  entries: NameLocationEntry[];
}

export const initialNameLocationState: NameLocationState = {
  entries: [],
};

export interface AddEntryAction {
  type: 'addEntry';
  newEntry: NameLocationEntry;
}

export type Actions = AddEntryAction;

export function addEntryReducer(
  previousState: NameLocationState,
  action: Actions,
): NameLocationState {
  if (action.type === 'addEntry') {
    return {
      ...previousState,
      entries: [...previousState.entries, action.newEntry],
    };
  }

  return previousState;
}
