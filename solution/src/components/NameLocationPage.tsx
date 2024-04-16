import React from 'react';
import { NameLocationForm } from './NameLocationForm';

export function NameLocationPageLayout(): JSX.Element {
  return (
    <div>
      <NameLocationForm
        onValidSubmit={(data) => {
          alert(JSON.stringify(data));
        }}
      />
    </div>
  )
}
