import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const Filters = () => {
  return (
    <FormGroup style={{ gap: '1.5vh', marginTop: '15px' }}>
      <FormControl>
        <InputLabel id="movie-label">Movies</InputLabel>
        <Select
          labelId="movie-label"
          id="movie"
          value="Star wars"
          // onChange={(e) => handleFilterChange('movie', e.target.value)}
        >
          {/* Options for movies */}
        </Select>
      </FormControl>

      <TextField
        label="Name"
        value="Star wars"
        // onChange={(e) => handleFilterChange('name', e.target.value)}
      />

      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender"
          value="male"
          // onChange={(e) => handleFilterChange('gender', e.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <Box>
        <Typography id="mass-range-slider" gutterBottom>
          Mass Range
        </Typography>
        <Slider
          value={[10, 100]}
          // onChange={(e, newValue) => handleFilterChange('massRange', newValue)}
          valueLabelDisplay="auto"
          aria-labelledby="mass-range-slider"
          min={0}
          max={1000}
        />
      </Box>

      <Button variant="contained" color="primary" onClick={''}>
        Clear Filters
      </Button>
    </FormGroup>
  );
};

export default Filters;
