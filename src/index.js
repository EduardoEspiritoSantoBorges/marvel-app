import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import charactersReducer from './components/charactersSlice';
import './index.css';
import App from './App';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
  middleware: [thunk],
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
