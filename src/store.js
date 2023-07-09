import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { getCharacters } from './api';

const initialState = {
  characters: [],
  loading: false,
  error: null,
};

const marvelSlice = createSlice({
  name: 'marvel',
  initialState,
  reducers: {
    fetchCharactersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCharactersSuccess(state, action) {
      state.loading = false;
      state.characters = action.payload;
    },
    fetchCharactersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCharactersStart,
  fetchCharactersSuccess,
  fetchCharactersFailure,
} = marvelSlice.actions;

export const fetchCharacters = () => async (dispatch) => {
  try {
    dispatch(fetchCharactersStart());
    const characters = await getCharacters();
    dispatch(fetchCharactersSuccess(characters));
  } catch (error) {
    dispatch(fetchCharactersFailure(error.message));
  }
};

export const store = configureStore({
  reducer: marvelSlice.reducer,
  middleware: [thunk],
});
