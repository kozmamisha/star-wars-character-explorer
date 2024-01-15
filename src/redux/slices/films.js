import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFilms = createAsyncThunk('films/fetchFilms', async () => {
  try {
    const { data } = await axios.get('https://swapi.dev/api/films/');
    return data.results.map((film) => film.title);
  } catch (error) {
    console.error(error);
    alert('Enable to download list of movies');
  }
});

const initialState = {
  items: [],
  status: 'loading',
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchFilms.rejected, (state) => {
        state.items = [];
        state.status = 'failed';
      });
  },
});

export const filmsReducer = filmsSlice.reducer;
