import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  name: '',
  gender: '',
  massRange: [0, 150],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMoviesFilter: (state, action) => {
      state.movies = action.payload;
    },
    setNameFilter: (state, action) => {
      state.name = action.payload;
    },
    setGenderFilter: (state, action) => {
      state.gender = action.payload;
    },
    setMassRangeFilter: (state, action) => {
      state.massRange = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { setMoviesFilter, setNameFilter, setGenderFilter, setMassRangeFilter, resetFilters } = filtersSlice.actions;
export const filtersReducer =  filtersSlice.reducer;
