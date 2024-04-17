import Grid from '@mui/material/Grid';
import React, { useReducer } from 'react';
import { NameLocationForm } from './NameLocationForm';
import { NameLocationList } from './NameLocationList';
import { addEntryReducer, initialNameLocationState } from './NameLocationState';
import { NameLocationEntry } from './types';

export function NameLocationPageLayout(): JSX.Element {
  const [state, dispatch] = useReducer(addEntryReducer, initialNameLocationState);

  const handleNameLocationFormSubmit =
    (newLocationEntry: NameLocationEntry) =>
      // Igor's comment:
      //
      // The handler of this event would also be responsible for POSTing
      // the new entry to the server. In this case, we just add it to the state.
      dispatch({ type: 'addEntry', newEntry: newLocationEntry });

  return (
    <Grid container direction='column' spacing={8}>
      <Grid item>
        <NameLocationForm onValidSubmit={handleNameLocationFormSubmit} />
      </Grid>
      <Grid item>
        <NameLocationList value={state.entries} />
      </Grid>
    </Grid>
  )
}
