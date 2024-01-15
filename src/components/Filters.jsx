import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
  Typography,
} from '@mui/material';

import {
  resetFilters,
  setGenderFilter,
  setMassRangeFilter,
  setMoviesFilter,
  setNameFilter,
} from '../redux/slices/filters';
import { fetchFilms } from '../redux/slices/films';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const films = useSelector((state) => state.films);

  const isMoviesLoading = films.status === 'loading';

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  const handleMoviesChange = (event) => {
    dispatch(setMoviesFilter(event.target.value));
  };

  const handleNameChange = (event) => {
    dispatch(setNameFilter(event.target.value));
  };

  const handleGenderChange = (event) => {
    dispatch(setGenderFilter(event.target.value));
  };

  const handleMassRangeChange = (event, newValue) => {
    dispatch(setMassRangeFilter(newValue));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const isAnyFilterUsed =
    filters.movies.length > 0 ||
    filters.name !== '' ||
    filters.gender !== '' ||
    filters.massRange[0] !== 0 ||
    filters.massRange[1] !== 150;

  return (
    <FormGroup style={{ gap: '1.5vh', marginTop: '15px' }}>
      <FormControl>
        <InputLabel id="movie-label">Movies</InputLabel>
        <Select
          labelId="movie-label"
          id="movie"
          value={filters.movies}
          onChange={handleMoviesChange}>
          {isMoviesLoading ? (
            <MenuItem>Loading...</MenuItem>
          ) : (
            films?.items?.map((movie, index) => (
              <MenuItem key={index} value={movie}>
                {movie}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <TextField label="Name" value={filters.name} onChange={handleNameChange} />

      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={filters.gender}
          onChange={handleGenderChange}
          row>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="n/a" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <Box>
        <Typography id="mass-range-slider" gutterBottom>
          Mass Range
        </Typography>
        <Slider
          value={filters.massRange}
          onChange={handleMassRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="mass-range-slider"
          min={0}
          max={150}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleResetFilters}
        disabled={!isAnyFilterUsed}>
        Clear Filters
      </Button>
    </FormGroup>
  );
};

export default Filters;
