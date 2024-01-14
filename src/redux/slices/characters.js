import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
  const { data } = await axios.get('https://swapi.dev/api/people/');
  return data;
});

export const fetchMovies = createAsyncThunk('characters/fetchMovies', async (filmUrls) => {
  const moviesTitles = await Promise.all(
    filmUrls.map(async (movieUrl) => {
      const movieRes = await axios.get(movieUrl);
      return movieRes.data.title;
    }),
  );
  return moviesTitles;
});

export const fetchSpecies = createAsyncThunk('characters/fetchSpecies', async (speciesUrls) => {
  const speciesTitles = await Promise.all(
    speciesUrls.map(async (specieUrl) => {
      const speciesRes = await axios.get(specieUrl);
      return speciesRes.data.name;
    }),
  );
  return speciesTitles;
});

export const fetchStarships = createAsyncThunk('characters/fetchStarships', async (starshipsUrls) => {
  const starshipsTitles = await Promise.all(
    starshipsUrls.map(async (starshipUrl) => {
      const starshipsRes = await axios.get(starshipUrl);
      return starshipsRes.data.name;
    }),
  );
  return starshipsTitles;
});

const initialState = {
  characters: {
    data: null,
    status: 'loading',
  },
  movies: {
    items: [],
    status: 'loading',
  },
  species: {
    items: [],
    status: 'loading',
  },
  starships: {
    items: [],
    status: 'loading',
  },
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.characters.status = 'loading';
        state.characters.data = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters.status = 'succeeded';
        state.characters.data = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state) => {
        state.characters.status = 'failed';
        state.characters.data = null;
      })

      .addCase(fetchMovies.pending, (state) => {
        state.movies.status = 'loading';
        state.movies.items = [];
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies.items = action.payload;
        state.movies.status = 'succeeded';
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.movies.items = [];
        state.movies.status = 'failed';
      })

      .addCase(fetchSpecies.pending, (state) => {
        state.species.status = 'loading';
        state.species.items = [];
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.species.items = action.payload;
        state.species.status = 'succeeded';
      })
      .addCase(fetchSpecies.rejected, (state) => {
        state.species.items = [];
        state.species.status = 'failed';
      })

      .addCase(fetchStarships.pending, (state) => {
        state.starships.status = 'loading';
        state.starships.items = [];
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.starships.items = action.payload;
        state.starships.status = 'succeeded';
      })
      .addCase(fetchStarships.rejected, (state) => {
        state.starships.items = [];
        state.starships.status = 'failed';
      });
  },
});

export const charactersReducer = charactersSlice.reducer;
