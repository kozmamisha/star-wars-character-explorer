import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import CharacterDetailsPage from './pages/CharacterDetailsPage';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth='xl'>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/characters/:id" element={<CharacterDetailsPage />} />
      </Routes>
    </Container>
  );
}

export default App;
