import React, { useReducer } from 'react';
import { NameLocationForm } from './NameLocationForm';
import { NameLocationList } from './NameLocationList';
import { addEntryReducer, initialNameLocationState } from './NameLocationState';
import { NameLocationEntry } from './types';

export function NameLocationPageLayout(): JSX.Element {
  const [state, dispatch] = useReducer(addEntryReducer, initialNameLocationState);

  const handleNameLocationFormSubmit =
    (newLocationEntry: NameLocationEntry) =>
      dispatch({ type: 'addEntry', newEntry: newLocationEntry });

  return (
    <div>
      <NameLocationForm onValidSubmit={handleNameLocationFormSubmit} />
      <NameLocationList value={state.entries} />
    </div>
  )
}
