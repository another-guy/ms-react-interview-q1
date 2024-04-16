import React, { useState } from 'react';
import { NameLocationForm } from './NameLocationForm';
import { NameLocationList } from './NameLocationList';
import { NameLocationEntry } from './types';

export function NameLocationPageLayout(): JSX.Element {
  const [nameLocationList, setNameLocationList] = useState<NameLocationEntry[]>([]);

  const handleNameLocationFormSubmit = (newLocationEntry: NameLocationEntry) => {
    setNameLocationList((current) => [...current, newLocationEntry]);
  };

  return (
    <div>
      <NameLocationForm onValidSubmit={handleNameLocationFormSubmit} />
      <NameLocationList value={nameLocationList} />
    </div>
  )
}
