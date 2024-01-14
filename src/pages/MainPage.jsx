import { Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchCharacters } from '../redux/slices/characters';
import CharacterList from '../components/CharacterList';
import Filters from '../components/Filters';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <Grid container spacing="4vw">
      <Grid item xs={12}>
        <Typography variant="h3" fontWeight={700} fontSize="1.7rem" align="center" mt="15px">
          Star Wars Character Explorer
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ boxShadow: 'none' }}>
          <Filters />
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <CharacterList />
      </Grid>
    </Grid>
  );
};

export default MainPage;
