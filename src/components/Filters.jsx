import {
  Box,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFilters,
  setGenderFilter,
  setMassRangeFilter,
  setMoviesFilter,
  setNameFilter,
} from '../redux/slices/filters';
  
const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

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

  return (
    <FormGroup style={{ gap: '1.5vh', marginTop: '15px' }}>
      <FormControl>
        <InputLabel id="movie-label">Movies</InputLabel>
        <Select labelId="movie-label" id="movie" value={filters.movies} onChange={handleMoviesChange}>
        </Select>
      </FormControl>

      <TextField label="Name" value={filters.name} onChange={handleNameChange} />

      <FormControl>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          value={filters.gender}
          onChange={handleGenderChange}>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="n/a">Other</MenuItem>
        </Select>
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

      <Button variant="contained" color="primary" onClick={handleResetFilters}>
        Clear Filters
      </Button>
    </FormGroup>
  );
};

export default Filters;
