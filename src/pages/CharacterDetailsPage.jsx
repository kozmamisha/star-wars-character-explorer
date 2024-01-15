import { Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { fetchMovies, fetchSpecies, fetchStarships } from '../redux/slices/characters';

const CharacterDetailsPage = () => {
  const [character, setCharacter] = useState();
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.characters.movies);
  const species = useSelector((state) => state.characters.species);
  const starships = useSelector((state) => state.characters.starships);

  const isMoviesLoading = movies.status === 'loading';
  const isSpeciesLoading = species.status === 'loading';
  const isStarshipsLoading = starships.status === 'loading';

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
        setCharacter(res.data);

        dispatch(fetchMovies(res.data.films));
        dispatch(fetchSpecies(res.data.species));
        dispatch(fetchStarships(res.data.starships));
      } catch (error) {
        setIsError(true);
        console.error(error);
        alert('Error fetching character details!');
      }
    };

    fetchCharacterDetails();
  }, [dispatch, id]);

  if (isError) {
    return <Navigate to="/" />;
  }

  if (!character) {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              marginTop="15px"
              marginBottom="15px"
              fontWeight={700}>
              <Skeleton variant="h3" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Skeleton variant="body1" width={210} />
              <Skeleton variant="body1" width={210} />
              <Skeleton variant="body1" width={210} />
              <Skeleton variant="body1" width={210} />
              <Skeleton variant="body1" width={210} />
              <Skeleton variant="body1" width={210} />
            </div>
          </Grid>
          <Grid item xs={12} marginTop="15px">
            <Skeleton variant="rectangular" width={210} height={40} />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" marginTop="15px" fontWeight={700}>
          Character Details - {character.name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Typography variant="h5">
            <b>Name:</b> {character.name}
          </Typography>
          <Typography variant="h5">
            <b>Gender:</b> {character.gender}
          </Typography>
          <Typography variant="h5">
            <b>Mass:</b> {character.mass} kg
          </Typography>
          <Typography variant="h5">
            <b>Height:</b> {character.height} sm
          </Typography>
          <Typography variant="h5">
            <b>Birth year:</b> {character.birth_year}
          </Typography>
          <Typography variant="h5">
            <b>Movies: </b>
            {isMoviesLoading
              ? 'Loading...'
              : movies.items.length > 0
              ? movies.items.map((movie) => movie).join(', ')
              : 'There are no movies'}
          </Typography>
          <Typography variant="h5">
            <b>Species: </b>
            {isSpeciesLoading
              ? 'Loading...'
              : species.items.length > 0
              ? species.items.map((item) => item).join(', ')
              : 'There are no species'}
          </Typography>
          <Typography variant="h5">
            <b>Starships:</b>
            {isStarshipsLoading
              ? 'Loading...'
              : starships.items.length > 0
              ? starships.items.map((item) => item).join(', ')
              : 'There are no starships'}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} marginTop="15px">
        <Link to="/">
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon style={{ paddingBottom: '2px' }} />}>
            Back to Main Page
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default CharacterDetailsPage;
