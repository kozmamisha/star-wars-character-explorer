import { configureStore } from '@reduxjs/toolkit';

import { filtersReducer } from './slices/filters';
import { charactersReducer } from './slices/characters';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    characters: charactersReducer,
  },
});
