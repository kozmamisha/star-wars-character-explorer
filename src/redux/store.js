import { configureStore } from '@reduxjs/toolkit';

import { filtersReducer } from './slices/filters';
import { charactersReducer } from './slices/characters';
import { filmsReducer } from './slices/films';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    characters: charactersReducer,
    films: filmsReducer,
  },
});
