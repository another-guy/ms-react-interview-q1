import './App.css';

import React from 'react';
import { NameLocationPageLayout } from './components/NameLocationPageLayout';

export function App(): JSX.Element {
  return (
    <div className="App">
      {/*
      Normally, we would have a router here.
      Since there's only one page, we'll just render the page unconditionally.
      */}
      <NameLocationPageLayout />
    </div>
  );
}
