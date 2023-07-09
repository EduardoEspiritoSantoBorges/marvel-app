import { createSlice } from '@reduxjs/toolkit';
import { getCharacters } from '../api';

export const setSelectedCharacter = (character) => ({
  type: 'characters/setSelectedCharacter',
  payload: character,
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    data: [],
    loading: false,
    error: null,
    searchQuery: '',
  },
  reducers: {
    getCharactersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCharactersSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    getCharactersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  getCharactersStart,
  getCharactersSuccess,
  getCharactersFailure,
  setSearchQuery,
} = charactersSlice.actions;

export const fetchCharacters = () => async (dispatch, getState) => {
  try {
    dispatch(getCharactersStart());
    const { searchQuery } = getState().characters;
    const response = await getCharacters(searchQuery);
    dispatch(getCharactersSuccess(response.data.results));
  } catch (error) {
    dispatch(getCharactersFailure(error.message));
  }
};

export default charactersSlice.reducer;
