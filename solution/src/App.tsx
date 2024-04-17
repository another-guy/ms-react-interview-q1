import './App.css';

import Container from '@mui/material/Container';
import React from 'react';
import { NameLocationPageLayout } from './components/NameLocationPage';

export function App(): JSX.Element {
  return (
    <Container className="App">

      {/*
      Igor's comment:

      Normally, we would have a router here (like react-router-dom or
      @tanstack/react-router). Since there's only one page in this assignment,
      we'll just render the page unconditionally.
      */}
      <NameLocationPageLayout />

    </Container>
  );
}
