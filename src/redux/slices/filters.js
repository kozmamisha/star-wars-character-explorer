import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: '',
  name: '',
  gender: '',
  minMass: 0,
  maxMass: 150,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
    clearFilters: () => initialState,
  },
});

export const { setFilter, clearFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;